# Agentic University website prototype

Source imported from the owner-provided OKComputer_S_Agentic_University archive. This is the React/Vite front end corresponding to the public Kimi preview at https://hdbmlg6savxqe.kimi.page. The Kimi publication remains separately hosted; this folder is not connected to an automatic deployment.

## Local development

Requires Node.js 20 or newer. Run `npm ci`, `npm run dev`, and `npm run build` from this directory.

## Current limits

The interest form posts to the `public.university_interest` table in the Agency Supabase project for the proposed Spring 2027 cohort. The public key is publishable, and database row security permits anonymous inserts but does not allow anonymous reads. The form collects only name, email, optional phone, area of interest, and contact consent. A successful registration is an expression of interest, not an admission, enrollment, or confirmed semester date. There is no confirmation email or staff notification yet; staff must review registrations securely in Supabase. Public forms need active spam monitoring.

The separately hosted Kimi preview is not updated by commits to this repository. Do not advertise its old browser-only Apply form as active registration. The browser-only admin page and embedded password in the supplied archive were excluded. Website claims about faculty, research, degrees, cohorts, tuition, scholarships, and outcomes require owner review before public use.
