#!/usr/bin/env python3
"""
Moncton Schools Contact Scraper
Scrapes school websites for: principal name, email, phone, district
Output: CSV file
"""

import requests
from bs4 import BeautifulSoup
import csv
from datetime import datetime

# Moncton schools list (will expand via web search)
MONCTON_SCHOOLS = [
    {"name": "Moncton High School", "url": "https://www.monctonschools.ca/schools/moncton-high-school"},
    {"name": "Bernice MacNaughton Elementary", "url": "https://www.monctonschools.ca/schools/bernice-macnaughton-elementary"},
    {"name": "Polaris Middle School", "url": "https://www.monctonschools.ca/schools/polaris-middle"},
    # Add more as discovered
]

def scrape_school(school):
    """Scrape individual school website for contact info"""
    try:
        headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}
        response = requests.get(school['url'], headers=headers, timeout=10)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.content, 'html.parser')
        
        # Extract data (will improve parsing as we test)
        principal = extract_principal(soup)
        email = extract_email(soup)
        phone = extract_phone(soup)
        district = "Anglophone School District"  # Default for Moncton
        
        return {
            'School Name': school['name'],
            'Principal': principal,
            'Email': email,
            'Phone': phone,
            'District': district,
            'URL': school['url'],
            'Scraped': datetime.now().isoformat()
        }
    except Exception as e:
        print(f"Error scraping {school['name']}: {e}")
        return None

def extract_principal(soup):
    """Extract principal name from page"""
    # Look for common patterns
    patterns = ['principal:', 'Principal:', 'head:', 'Head:']
    for text in soup.get_text().split('\n'):
        for pattern in patterns:
            if pattern in text:
                return text.replace(pattern, '').strip()
    return "N/A"

def extract_email(soup):
    """Extract email address"""
    for link in soup.find_all('a', href=True):
        if 'mailto:' in link['href']:
            return link['href'].replace('mailto:', '')
    return "N/A"

def extract_phone(soup):
    """Extract phone number"""
    text = soup.get_text()
    import re
    phone_pattern = r'\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}'
    match = re.search(phone_pattern, text)
    if match:
        return match.group()
    return "N/A"

def main():
    results = []
    print(f"Scraping {len(MONCTON_SCHOOLS)} Moncton schools...")
    
    for school in MONCTON_SCHOOLS:
        print(f"  → {school['name']}")
        data = scrape_school(school)
        if data:
            results.append(data)
    
    # Save to CSV
    if results:
        filename = f"/home/clawd/.openclaw/workspace/moncton_schools_{datetime.now().strftime('%Y%m%d')}.csv"
        with open(filename, 'w', newline='', encoding='utf-8') as f:
            writer = csv.DictWriter(f, fieldnames=['School Name', 'Principal', 'Email', 'Phone', 'District', 'URL', 'Scraped'])
            writer.writeheader()
            writer.writerows(results)
        
        print(f"\n✅ Scraped {len(results)} schools → {filename}")
        return filename
    else:
        print("❌ No data scraped")
        return None

if __name__ == "__main__":
    main()
