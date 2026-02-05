# Long-Term Memory - Aplosol & OpenClaw Setup

## Aplosol Project Status
**Phase:** MVP Launch (4-week sprint)

**Live Assets:**
- Landing page deployed to GitHub Pages (krish4512.github.io/aplosol)
- Design: Dark Neurix theme (navy #0f172a, white text, blue #4b7fff accents)
- Membership tiers locked: Core $29/mo, Turbo $79/3mo, Infinity $289/yr
- Business plan captured in APLOSOL.md

**Immediate Priorities (MVP):**
1. Responsive design (mobile/tablet/desktop) — **Critical for launch**
2. Stripe payment integration — Courses $15-35, memberships above
3. Email capture system — Mailchimp/ConvertKit for lead funnel
4. First course recording — K-2 level "What is AI?" (2-3 modules)
5. School outreach list — 20 Moncton schools + email sequences
6. Analytics & tracking — Google Analytics 4 + lead tracker

**Revenue Model (Proven):**
- 3 courses (age-tiered) @ $15-35 each
- 3 membership tiers ($29-$289)
- B2B schools: $500/yr per school
- **6-month target:** $2,050/month | **12-month:** $5,000+/month

## Critical Decision: Haiku as Default Model
**Why:** Cost efficiency + speed. Sonnet reserved for architecture/security/complex reasoning only.
**Lesson learned:** This discipline saves money and hits rate limits less.

## Critical Decision: Ollama Heartbeat
**Setup:** Local ollama/llama3.2:3b for heartbeats (1h interval to Slack)
**Benefit:** Zero API cost, avoids Claude rate limits entirely, reliable local execution.
**Status:** Verified working (pgrep -f "ollama serve" confirms running).

## OpenClaw Configuration
**Path:** `/home/clawd/.openclaw/openclaw.json`
**Workspace:** `/home/clawd/.openclaw/workspace`
**Primary model:** anthropic/claude-haiku-4-5
**Heartbeat model:** ollama/llama3.2:3b
**Gateway:** localhost:18789

## Rate Limit Discipline
**Budget:** $5/day, $200/month (Claude)
**Lessons learned:**
- Hit Claude 429 (org limit: 50k tokens/min) early on
- Batch related tasks to reduce API calls
- Use Ollama for periodic checks (heartbeat, cron jobs)
- Monitor usage obsessively; set low limits to force lean execution

## Krish's Schedule (For Daily Brief Optimization)
- **Work:** 10 AM start (insurance advisor at Co-operators)
- **Gym:** Every other day (last confirmed 2026-01-31) — **Reminder priority on gym days**
- **Daily brief:** 8 AM (gym, weather, calendar, commute via Apple Maps, Canada/NB immigration news)
- **Timezone:** AST (UTC-4)
- **Commute:** 411 Gauvin Rd → 10 Record St (Moncton)

## Known Issues & Workarounds
1. **Claude 429 rate limit:** Use Haiku + batching + Ollama for non-critical tasks
2. **GitHub Pages deployment lag:** 1-2 min between push and live update
3. **Ollama dependency:** Heartbeat fails silently if ollama process dies (should add monitoring)

## GitHub Integration
**Repo:** krish4512/aplosol
**Pages:** https://krish4512.github.io/aplosol/ (auto-deployed on main branch)
**Workflow:** Push to main → GitHub Actions → deploy to gh-pages → live in 1-2 min

## Next Checkpoints
- **Week 1:** Responsive design + Stripe integration
- **Week 2:** Email automation + first course outline
- **Week 3:** Course recording (K-2 module)
- **Week 4:** School list + outreach sequences ready for launch

## Key Files to Watch
- `APLOSOL.md` — Business plan & metrics
- `SOUL.md` — Operating principles (core to all decisions)
- `USER.md` — Krish's profile (gym schedule, work hours critical)
- `RATE_LIMITS.md` — Budget tracking (update daily)
- `index.html` — Landing page (keep in sync with repo)
