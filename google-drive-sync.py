#!/usr/bin/env python3
"""
Google Drive sync - Auto-upload generated files to Google Drive
Runs after cron job completes work
"""

import json
import os
import sys
from pathlib import Path
from datetime import datetime

# Try to import google libraries (will install if needed)
try:
    from google.auth.transport.requests import Request
    from google.oauth2.service_account import Credentials
    from googleapiclient.discovery import build
    from googleapiclient.http import MediaFileUpload
except ImportError:
    print("⚠️  Google API libraries not found. Installing...")
    os.system("pip install google-auth-oauthlib google-auth-httplib2 google-api-python-client -q")
    from google.auth.transport.requests import Request
    from google.oauth2.service_account import Credentials
    from googleapiclient.discovery import build
    from googleapiclient.http import MediaFileUpload

CONFIG_FILE = "/home/clawd/.openclaw/workspace/.google-drive-config.json"
WORKSPACE = "/home/clawd/.openclaw/workspace"

def get_drive_service():
    """Authenticate and return Google Drive service"""
    try:
        with open(CONFIG_FILE, 'r') as f:
            config = json.load(f)
        
        credentials = Credentials.from_service_account_info(
            config,
            scopes=['https://www.googleapis.com/auth/drive']
        )
        
        service = build('drive', 'v3', credentials=credentials)
        return service, config.get('folder_id')
    except FileNotFoundError:
        print(f"❌ Config file not found: {CONFIG_FILE}")
        return None, None
    except Exception as e:
        print(f"❌ Auth error: {e}")
        return None, None

def upload_file(service, folder_id, file_path):
    """Upload a file to Google Drive folder"""
    try:
        file_name = os.path.basename(file_path)
        
        file_metadata = {
            'name': file_name,
            'parents': [folder_id]
        }
        
        media = MediaFileUpload(file_path, resumable=True)
        
        file = service.files().create(
            body=file_metadata,
            media_body=media,
            fields='id, name, webViewLink'
        ).execute()
        
        return file
    except Exception as e:
        print(f"❌ Upload error for {file_name}: {e}")
        return None

def sync_files():
    """Upload recently modified files to Google Drive"""
    service, folder_id = get_drive_service()
    
    if not service or not folder_id:
        print("❌ Google Drive sync failed: Auth error")
        return 0
    
    # Files to watch for changes
    watch_files = [
        f"{WORKSPACE}/index.html",
        f"{WORKSPACE}/TASKS.md",
    ]
    
    uploaded = 0
    for file_path in watch_files:
        if os.path.exists(file_path):
            # Check if file was modified in last 2 hours
            mod_time = os.path.getmtime(file_path)
            now = datetime.now().timestamp()
            
            if (now - mod_time) < 7200:  # 2 hours in seconds
                result = upload_file(service, folder_id, file_path)
                if result:
                    uploaded += 1
                    print(f"✅ Uploaded: {result['name']}")
                    print(f"   Link: {result['webViewLink']}")
    
    return uploaded

if __name__ == "__main__":
    print("📤 Starting Google Drive sync...")
    count = sync_files()
    print(f"✅ Sync complete: {count} files uploaded")
