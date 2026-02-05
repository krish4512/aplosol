#!/usr/bin/env node

/**
 * Notion ↔ TASKS.md Sync
 * Syncs task status between Notion database and TASKS.md
 */

const fs = require('fs');
const https = require('https');

const NOTION_TOKEN = require('./.notion-config').api_token;
const NOTION_API = 'https://api.notion.com/v1';

class NotionSync {
  constructor() {
    this.token = NOTION_TOKEN;
    this.databaseId = null;
  }

  async request(method, path, body = null) {
    return new Promise((resolve, reject) => {
      const options = {
        hostname: 'api.notion.com',
        path: `/v1${path}`,
        method,
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Notion-Version': '2022-06-28',
          'Content-Type': 'application/json',
        },
      };

      const req = https.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => { data += chunk; });
        res.on('end', () => {
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            resolve(data);
          }
        });
      });

      req.on('error', reject);
      if (body) req.write(JSON.stringify(body));
      req.end();
    });
  }

  async createDatabase(parentPageId) {
    const payload = {
      parent: { page_id: parentPageId },
      title: [{ type: 'text', text: { content: 'Aplosol Mission Control' } }],
      properties: {
        'Task': { title: {} },
        'Status': {
          select: {
            options: [
              { name: '[ ] Pending', color: 'blue' },
              { name: '[✅] Done', color: 'green' },
              { name: '[📋] Review', color: 'yellow' },
              { name: '[🔄] In Progress', color: 'orange' },
            ],
          },
        },
        'Priority': {
          select: {
            options: [
              { name: 'High', color: 'red' },
              { name: 'Medium', color: 'yellow' },
              { name: 'Low', color: 'green' },
            ],
          },
        },
        'Week': { select: { options: [
          { name: 'Week 1', color: 'blue' },
          { name: 'Week 2', color: 'purple' },
          { name: 'Week 3', color: 'pink' },
          { name: 'Week 4', color: 'gray' },
        ]}},
        'Due Date': { date: {} },
        'Assigned': { select: { options: [
          { name: 'Optimus', color: 'blue' },
          { name: 'Krish', color: 'green' },
        ]}},
      },
    };

    const result = await this.request('POST', '/databases', payload);
    if (result.id) {
      this.databaseId = result.id;
      console.log('✅ Database created:', result.id);
      return result.id;
    }
    throw new Error(JSON.stringify(result));
  }

  async addTask(title, status = 'Pending', priority = 'Medium', week = 'Week 1') {
    if (!this.databaseId) throw new Error('Database ID not set');

    const payload = {
      parent: { database_id: this.databaseId },
      properties: {
        'Task': {
          title: [{ type: 'text', text: { content: title } }],
        },
        'Status': {
          select: { name: status },
        },
        'Priority': {
          select: { name: priority },
        },
        'Week': {
          select: { name: week },
        },
      },
    };

    const result = await this.request('POST', '/pages', payload);
    return result;
  }

  async queryDatabase() {
    if (!this.databaseId) throw new Error('Database ID not set');

    const result = await this.request('POST', `/databases/${this.databaseId}/query`);
    return result.results || [];
  }
}

// Export
module.exports = NotionSync;

// CLI Usage
if (require.main === module) {
  const command = process.argv[2];

  if (command === 'create-db') {
    const pageId = process.argv[3];
    if (!pageId) {
      console.error('Usage: node sync-notion.js create-db <notion-page-id>');
      process.exit(1);
    }

    const sync = new NotionSync();
    sync.createDatabase(pageId).then((dbId) => {
      console.log('Database ID:', dbId);
      console.log('Save this for future syncs!');
    }).catch((err) => {
      console.error('Error:', err.message);
      process.exit(1);
    });
  }
}
