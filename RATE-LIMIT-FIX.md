# Rate Limit Fix - Claude 50k tokens/min org limit

## The Problem
**Error:** HTTP 429 - Rate limit exceeded (50,000 input tokens/minute org limit)

**Cause:** Multiple concurrent jobs using Claude Haiku simultaneously hitting the org-level rate limit.

---

## The Solution

### **What Changed**

**BEFORE (Problematic):**
- Daily Brief → Claude Haiku (uses tokens)
- Hourly Status Check → Claude Haiku (uses tokens)
- Every 2h Website Work → Claude Haiku (uses tokens)
- = Multiple jobs competing for 50k tokens/min quota

**AFTER (Fixed):**
- Daily Brief (8 AM) → **Ollama** (FREE, no limit)
- Hourly Status Check → **Ollama** (FREE, no limit)
- Every 2h Website Work → **Claude Haiku** (batched, no overlap)
- = Only real work uses Claude, everything else is free

---

## Current Job Schedule

| Job | Frequency | Model | Cost |
|-----|-----------|-------|------|
| Daily Brief | 8 AM daily | Ollama | FREE |
| Status Check | Every 1 hour | Ollama | FREE |
| Website Optimization | Every 2 hours | Haiku | ~$0.01/cycle |

**Total:** ~$0.24/day (vs. $5 budget limit)

---

## Why This Works

1. **Ollama (Local):**
   - No API calls = No rate limits
   - No tokens consumed
   - Perfect for status checks & reports

2. **Claude Haiku (API):**
   - Used ONLY for real work (website improvements)
   - Batched, so no overlap with other jobs
   - Token efficient ($0.80/M input tokens)

3. **No More Collisions:**
   - Status checks don't eat into work quota
   - Daily briefs don't consume tokens
   - Real work gets full 50k tokens/min when it runs

---

## If You Need More Capacity

**Contact Anthropic:**
- Go to: https://www.anthropic.com/contact-sales
- Organization ID: `a5ee820e-5d4d-482a-90d9-6cf2fa498394`
- Request: Higher org-level rate limit
- Response time: Usually 24-48 hours

They can increase your limit to 100k, 200k, or higher depending on your needs.

---

## Key Takeaway

**Use free tools for free tasks. Use paid API only when necessary.**

- Status checks? Ollama
- Reports? Ollama
- Real work (coding, content, optimization)? Haiku

This is how you never hit rate limits. 🚀
