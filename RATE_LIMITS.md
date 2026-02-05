# RATE LIMITS & BUDGET

## API Call Throttling

- **5 seconds minimum** between API calls
- **10 seconds** between web searches
- **Max 5 searches per batch**, then **2-minute break**
- **Batch similar work** (one request for 10 leads, not 10 requests)
- **429 Error:** STOP → wait 5 minutes → retry

## Budget Tracking

- **Daily Budget:** $5 (⚠️ warning at 75% = $3.75)
- **Monthly Budget:** $200 (⚠️ warning at 75% = $150)

## Implementation

Apply these limits to all external API calls:
- Web search (Brave, Perplexity)
- Image analysis
- Model calls to external providers
- Web fetch requests
- Any 3rd-party API interaction

Monitor spend and alert when approaching thresholds.
