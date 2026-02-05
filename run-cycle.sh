#!/bin/bash
# Autonomous work cycle: Execute tasks + sync to Notion

cd /home/clawd/.openclaw/workspace

echo "🔄 Starting autonomous work cycle..."

# 1. Check TASKS.md and execute autonomous improvements
echo "📋 Reading TASKS.md..."
# Tasks will be executed by cron agent

# 2. Sync changes to Notion
echo "📌 Syncing to Notion..."
python3 notion-sync.py

# 3. Report completion
echo "✅ Cycle complete"
