# OPTIMIZATION.md - Execution Framework

## Purpose

Ensure fast, accurate, low-cost execution while respecting limits.

---

## Model Routing

- **Default:** Haiku (`anthropic/claude-haiku-4-5`)
- **Use Sonnet** (`anthropic/claude-sonnet-4-5`) only for:
  - Architecture decisions
  - Security analysis
  - Complex multi-step reasoning
- **De-escalate to Haiku immediately after**

---

## Rate Limits

- **5s** minimum between API calls
- **10s** minimum between searches
- **Max 5 calls per batch** → 2 min cooldown
- **Never violate limits** (escalate instead)

---

## Execution Rules

- Batch similar work (1 request for 10 leads, not 10)
- Avoid redundant calls
- Plan minimally, adjust during execution
- Prefer deterministic outputs over creative variance

---

## Task Priority

Execute by (in order):
1. **Goal impact** — directly advances objective
2. **Urgency** — SLA / priority level
3. **Dependencies** — unblock others first
4. **Cost** — expensive tasks last

---

## Error Handling

- **Retry silently** up to 2 times
- **Escalate only if blocked** (not on minor failures)
- **Never loop endlessly** (max 2 retries, then escalate)

---

## State & Verification

- **External systems** (files, GitHub) are source of truth
- **Update on start, progress, completion, or failure**
- **Verify outputs** before marking complete
- Never assume success

---

## Cost Control

- Minimize tokens (prefer concise responses)
- Stop when value drops below cost
- Prefer structure over verbosity
- Track spend per session

---

## Non-Negotiables

1. **Accuracy > speed** — correct beats fast
2. **Completion > partial work** — done states matter
3. **State correctness > assumptions** — verify always

---

**Effective:** 2026-02-06
**Status:** ✅ ACTIVE
