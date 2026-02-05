#!/usr/bin/env python3
"""
Notion sync script - syncs TASKS.md updates to Notion database
Run this every heartbeat/cron cycle to keep Notion in sync
"""

import requests
import json
import os

# Config - load from .notion-config.json (not committed to git)
import sys
CONFIG_FILE = "/home/clawd/.openclaw/workspace/.notion-config.json"

try:
    with open(CONFIG_FILE, 'r') as f:
        config = json.load(f)
    TOKEN = config['token']
    DB_ID = config['database_id']
except FileNotFoundError:
    print(f"Error: {CONFIG_FILE} not found. Setup Notion first.")
    sys.exit(1)

TASKS_FILE = "/home/clawd/.openclaw/workspace/TASKS.md"

HEADERS = {
    "Authorization": f"Bearer {TOKEN}",
    "Content-Type": "application/json",
    "Notion-Version": "2022-06-28"
}

def parse_tasks():
    """Parse TASKS.md and extract all tasks"""
    tasks = {}
    current_week = None
    
    if not os.path.exists(TASKS_FILE):
        return tasks
    
    with open(TASKS_FILE, 'r') as f:
        lines = f.readlines()
    
    for line in lines:
        line = line.strip()
        
        # Check for week headers
        if line.startswith('## WEEK'):
            current_week = line.split('(')[0].strip().replace('## ', '')
            continue
        
        # Parse tasks
        if line.startswith('- [ ]'):
            status = "Pending"
            name = line.replace('- [ ]', '').strip()
        elif line.startswith('- [✅]'):
            status = "Done"
            name = line.replace('- [✅]', '').strip()
        elif line.startswith('- [🔄]'):
            status = "In Progress"
            name = line.replace('- [🔄]', '').strip()
        elif line.startswith('- [📋 REVIEW]'):
            status = "Review"
            name = line.replace('- [📋 REVIEW]', '').strip()
        else:
            continue
        
        if name:
            task_id = name[:50]  # Use name prefix as ID
            tasks[task_id] = {
                "name": name,
                "status": status,
                "week": current_week,
                "priority": "Medium"  # Default
            }
    
    return tasks

def get_notion_tasks():
    """Get all tasks from Notion database"""
    response = requests.post(
        f"https://api.notion.com/v1/databases/{DB_ID}/query",
        headers=HEADERS,
        json={}
    )
    
    if response.status_code != 200:
        print(f"Error querying database: {response.status_code}")
        return {}
    
    tasks = {}
    for result in response.json().get('results', []):
        props = result['properties']
        task_id = props['Task']['title'][0]['text']['content'][:50]
        tasks[task_id] = {
            "notion_id": result['id'],
            "status": props['Status']['select']['name'] if props['Status']['select'] else "Pending"
        }
    
    return tasks

def sync_tasks():
    """Sync TASKS.md to Notion"""
    local_tasks = parse_tasks()
    notion_tasks = get_notion_tasks()
    
    added = 0
    updated = 0
    
    for task_id, task in local_tasks.items():
        if task_id in notion_tasks:
            # Update existing task
            task_notion_id = notion_tasks[task_id]['notion_id']
            if notion_tasks[task_id]['status'] != task['status']:
                payload = {
                    "properties": {
                        "Status": {"select": {"name": task['status']}}
                    }
                }
                response = requests.patch(
                    f"https://api.notion.com/v1/pages/{task_notion_id}",
                    headers=HEADERS,
                    json=payload
                )
                if response.status_code == 200:
                    updated += 1
        else:
            # Add new task
            payload = {
                "parent": {"database_id": DB_ID},
                "properties": {
                    "Task": {"title": [{"text": {"content": task["name"]}}]},
                    "Status": {"select": {"name": task["status"]}},
                    "Priority": {"select": {"name": task.get("priority", "Medium")}},
                    "Owner": {"select": {"name": "Optimus"}}
                }
            }
            if task["week"]:
                payload["properties"]["Week"] = {"select": {"name": task["week"]}}
            
            response = requests.post(
                "https://api.notion.com/v1/pages",
                headers=HEADERS,
                json=payload
            )
            if response.status_code == 200:
                added += 1
    
    print(f"✅ Notion sync: {added} added, {updated} updated")
    return added + updated

if __name__ == "__main__":
    sync_tasks()
