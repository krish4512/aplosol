# RATE LIMITS & BUDGET CONSTRAINTS

**Effective:** 2026-02-06

## API CALL DISCIPLINE

### Minimum Spacing
- **5 seconds** minimum between API calls
- **10 seconds** minimum between web searches
- **2-minute break** after 5 web searches per batch

### Batching Strategy
- Batch similar work (1 request for 10 leads, NOT 10 requests)
- Combine related tasks in single API call when possible
- Reduce redundant calls by caching intermediate results

### 429 Error Protocol
- **STOP** immediately on rate limit error
- **Wait 5 minutes** before retry
- **Alert user** when error occurs

## BUDGET CONSTRAINTS

### Daily Budget
- **Limit:** $5/day
- **Warning Level:** 75% = $3.75
- **Action:** Pause non-critical work at warning level

### Monthly Budget
- **Limit:** $200/month
- **Warning Level:** 75% = $150
- **Action:** Escalate to user for approval if approaching

## Cost Tracking

- Track all API spend per session
- Log model used + estimated tokens
- Report running total before each batch of work
- Flag overage immediately

## Model Routing

- **Default:** `anthropic/claude-haiku-4-5` (Haiku) — $0.80/M tokens
- **Upgrade to:** `anthropic/claude-sonnet-4-5` (Sonnet) — only for architecture/security/complex reasoning
- **Periodic Tasks:** `ollama/llama3.2:3b` (local, free) — heartbeat, status checks, cron jobs

## Compliance Checklist

- [ ] Never make consecutive API calls without 5s spacing
- [ ] Batch web searches (max 5 per batch)
- [ ] Wait 10s between searches
- [ ] Wait 2 min after 5-search batch
- [ ] Track spend per session
- [ ] Alert at 75% daily ($3.75)
- [ ] Alert at 75% monthly ($150)
- [ ] Stop on 429, wait 5 min, retry
- [ ] Use Haiku by default
- [ ] Only upgrade to Sonnet when necessary

---

**Last Updated:** 2026-02-06 14:43 UTC
**Status:** ✅ ACTIVE
