import requests
import json
from requests.sessions import Session

BASE_URL = 'http://localhost:8000'

def test_api():
    # Create a session to handle cookies
    session = Session()
    
    # Get CSRF token first
    session.get(f'{BASE_URL}/api/accounts/login/')
    csrf_token = session.cookies.get('csrftoken')
    
    # Login
    login_data = {
        'username': 'admin',
        'password': 'admin123'
    }
    headers = {
        'X-CSRFToken': csrf_token,
        'Content-Type': 'application/json'
    }
    response = session.post(
        f'{BASE_URL}/api/accounts/login/',
        json=login_data,
        headers=headers
    )
    
    if response.status_code == 200:
        print("Login successful!")
        
        # Update headers with new CSRF token
        csrf_token = session.cookies.get('csrftoken')
        headers = {
            'X-CSRFToken': csrf_token,
            'Content-Type': 'application/json'
        }
        
        # Test class periods endpoint
        print("\nTesting class periods endpoint:")
        response = session.get(f'{BASE_URL}/api/class-periods/', headers=headers)
        if response.status_code == 200:
            data = response.json()
            print(json.dumps(data, indent=2))
        else:
            print(f"Error: {response.status_code}")
            print(response.text)
            
        # Test students endpoint
        print("\nTesting students endpoint:")
        response = session.get(f'{BASE_URL}/api/students/', headers=headers)
        if response.status_code == 200:
            data = response.json()
            print(json.dumps(data, indent=2))
        else:
            print(f"Error: {response.status_code}")
            print(response.text)
            
        # Test announcements endpoint
        print("\nTesting announcements endpoint:")
        response = session.get(f'{BASE_URL}/api/announcements/', headers=headers)
        if response.status_code == 200:
            data = response.json()
            print(json.dumps(data, indent=2))
        else:
            print(f"Error: {response.status_code}")
            print(response.text)
    else:
        print("Login failed:", response.status_code)
        print(response.text)

if __name__ == '__main__':
    test_api()
