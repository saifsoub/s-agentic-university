import { Agent, callable, routeAgentRequest } from "agents";

type Passport = {
  passport_id: string;
  agent_name: string;
  agent_type: string;
  status: "active" | "revoked" | "expired";
  capabilities?: string[];
  permissions?: Record<string, boolean>;
  checksum?: string;
  signature?: string | null;
};

type WorkerRecord = {
  id: string;
  name: string;
  endpoint: string;
  enabled: boolean;
};

type DispatchRecord = {
  worker_id: string;
  ok: boolean;
  status: number;
  at: string;
};

type UniversityState = {
  passport: Passport | null;
  workers: WorkerRecord[];
  last_dispatch: DispatchRecord | null;
};

export interface Env {}

export class UniversityAgent extends Agent<Env, UniversityState> {
  initialState: UniversityState = {
    passport: null,
    workers: [],
    last_dispatch: null,
  };

  @callable()
  status() {
    return {
      ready: Boolean(this.state.passport && this.state.passport.status === "active"),
      passport_id: this.state.passport?.passport_id ?? null,
      worker_count: this.state.workers.filter((worker) => worker.enabled).length,
      last_dispatch: this.state.last_dispatch,
    };
  }

  @callable()
  attachPassport(passport: Passport) {
    if (!passport?.passport_id?.startsWith("S-PASS-")) {
      throw new Error("Invalid S/ Agent Passport id");
    }
    if (passport.status !== "active") {
      throw new Error("Passport must be active");
    }
    this.setState({ ...this.state, passport });
    return { attached: true, passport_id: passport.passport_id };
  }

  @callable()
  registerWorker(worker: WorkerRecord) {
    if (!worker?.id || !worker?.name || !worker?.endpoint) {
      throw new Error("Worker id, name, and endpoint are required");
    }
    const workers = [
      ...this.state.workers.filter((existing) => existing.id !== worker.id),
      { ...worker, enabled: worker.enabled !== false },
    ];
    this.setState({ ...this.state, workers });
    return { registered: true, worker_id: worker.id };
  }

  @callable()
  async dispatch(workerId: string, payload: unknown) {
    if (!this.state.passport || this.state.passport.status !== "active") {
      throw new Error("Active Agent Passport required before dispatch");
    }

    const worker = this.state.workers.find(
      (candidate) => candidate.id === workerId && candidate.enabled,
    );
    if (!worker) throw new Error(`Worker not registered or disabled: ${workerId}`);

    const response = await fetch(worker.endpoint, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-s-agent-passport": this.state.passport.passport_id,
      },
      body: JSON.stringify({
        passport: this.state.passport,
        payload,
        dispatched_at: new Date().toISOString(),
      }),
    });

    const last_dispatch: DispatchRecord = {
      worker_id: workerId,
      ok: response.ok,
      status: response.status,
      at: new Date().toISOString(),
    };
    this.setState({ ...this.state, last_dispatch });

    const contentType = response.headers.get("content-type") ?? "";
    const result = contentType.includes("application/json")
      ? await response.json()
      : await response.text();

    return { ...last_dispatch, result };
  }
}

export default {
  fetch(request: Request, env: Env) {
    const url = new URL(request.url);
    if (url.pathname === "/health") {
      return Response.json({
        ok: true,
        service: "S/Agentic University Agent",
        runtime: "Cloudflare Agents SDK",
      });
    }

    return (
      routeAgentRequest(request, env) ??
      new Response("S/Agentic University Agent", { status: 200 })
    );
  },
};
