const fetch = require('node-fetch');
const fs = require('fs');

const NOTION_TOKEN = '11099071568V1K3lgtNb2lfi9925rbOGlBzV0tzVxKd6ta';
const NOTION_API = 'https://api.notion.com/v1';

async function createDatabase(parentPageId) {
  const response = await fetch(`${NOTION_API}/databases`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${NOTION_TOKEN}`,
      'Content-Type': 'application/json',
      'Notion-Version': '2022-06-28'
    },
    body: JSON.stringify({
      parent: { page_id: parentPageId },
      title: [{ text: { content: 'Aplosol Mission Control' } }],
      properties: {
        'Task': { title: {} },
        'Status': { select: { options: [
          { name: 'Pending', color: 'red' },
          { name: 'In Progress', color: 'yellow' },
          { name: 'Review', color: 'blue' },
          { name: 'Done', color: 'green' }
        ]}},
        'Priority': { select: { options: [
          { name: 'Critical', color: 'red' },
          { name: 'High', color: 'orange' },
          { name: 'Medium', color: 'yellow' },
          { name: 'Low', color: 'gray' }
        ]}},
        'Week': { select: { options: [
          { name: 'Week 1', color: 'blue' },
          { name: 'Week 2', color: 'purple' },
          { name: 'Week 3', color: 'pink' },
          { name: 'Week 4', color: 'green' }
        ]}},
        'Owner': { select: { options: [
          { name: 'Optimus', color: 'blue' },
          { name: 'Krish', color: 'green' }
        ]}},
        'DueDate': { date: {} },
        'Notes': { rich_text: {} }
      }
    })
  });

  return response.json();
}

// Call this to set up - needs parent page ID from user
console.log('Notion integration ready. Need your Notion page ID.');
console.log('Instructions: Open Notion → Share → Copy link → Extract page ID');
