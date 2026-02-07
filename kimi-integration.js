#!/usr/bin/env node
/**
 * Kimi 2.5 API Integration
 * NVIDIA Inference Endpoints for Kimi model
 */

import axios from 'axios';

const KIMI_CONFIG = {
  invokeUrl: "https://integrate.api.nvidia.com/v1/chat/completions",
  apiKey: "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",
  model: "moonshotai/kimi-k2.5",
  maxTokens: 16384,
  temperature: 0.7, // Balanced for consistency
  topP: 1.0,
  stream: false
};

/**
 * Call Kimi 2.5 for analysis/generation tasks
 */
async function callKimi(messages, options = {}) {
  const headers = {
    "Authorization": `Bearer ${KIMI_CONFIG.apiKey}`,
    "Accept": KIMI_CONFIG.stream ? "text/event-stream" : "application/json"
  };

  const payload = {
    "model": KIMI_CONFIG.model,
    "messages": messages,
    "max_tokens": options.maxTokens || KIMI_CONFIG.maxTokens,
    "temperature": options.temperature || KIMI_CONFIG.temperature,
    "top_p": KIMI_CONFIG.topP,
    "stream": KIMI_CONFIG.stream,
    "chat_template_kwargs": { "thinking": options.thinking || false }
  };

  try {
    const response = await axios.post(KIMI_CONFIG.invokeUrl, payload, {
      headers: headers,
      responseType: KIMI_CONFIG.stream ? 'stream' : 'json',
      timeout: 60000
    });

    if (KIMI_CONFIG.stream) {
      return new Promise((resolve, reject) => {
        let fullResponse = '';
        response.data.on('data', (chunk) => {
          fullResponse += chunk.toString();
        });
        response.data.on('end', () => resolve(fullResponse));
        response.data.on('error', reject);
      });
    } else {
      return response.data.choices[0].message.content;
    }
  } catch (error) {
    console.error('Kimi API Error:', error.message);
    throw error;
  }
}

/**
 * Investment/Crypto Analysis via Kimi
 */
async function analyzeInvestment(ticker, analysisType = 'technical') {
  const prompt = `Analyze ${ticker} for swing trading. Provide:
1. Current trend (uptrend/downtrend/consolidation)
2. Key support/resistance levels
3. Momentum indicators (RSI, MACD status)
4. Risk/reward setup
5. Entry/exit recommendations
Analysis type: ${analysisType}`;

  const messages = [{ role: "user", content: prompt }];
  return await callKimi(messages, { thinking: true });
}

/**
 * YouTube Script Generation
 */
async function generateYoutubeScript(topic, trend) {
  const prompt = `Generate an engaging YouTube script for: "${topic}"
Context: ${trend}
Requirements:
- Hook (first 15 seconds)
- Main value (5 key points)
- Call-to-action
- Length: ~5 minute video (2500 words)
- Tone: Informative, engaging, educational`;

  const messages = [{ role: "user", content: prompt }];
  return await callKimi(messages, { thinking: true });
}

/**
 * Blog Post Generation
 */
async function generateBlogPost(topic, keywords = []) {
  const prompt = `Write an SEO-optimized blog post for investing/crypto niche.
Topic: ${topic}
Target keywords: ${keywords.join(', ')}
Requirements:
- 1500+ words
- Include affiliate hooks
- Heading structure (H1, H2, H3)
- Include data/statistics
- Call-to-action for email signup
- Monetization-friendly`;

  const messages = [{ role: "user", content: prompt }];
  return await callKimi(messages, { thinking: false });
}

export { callKimi, analyzeInvestment, generateYoutubeScript, generateBlogPost, KIMI_CONFIG };
