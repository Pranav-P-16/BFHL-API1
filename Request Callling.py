import requests

url = "https://bfhl-api-1-git-main-pranav-ps-projects-edf35bd4.vercel.app/bfhl"
payload = {"data": ["a","1","334","4","R","$"]}

r = requests.post(url, json=payload)

print("Status code:", r.status_code)
print("Content-Type:", r.headers.get("Content-Type"))
print("Response text (first 2000 chars):")
print(r.text[:2000])

try:
    data = r.json()
    print("\nParsed JSON:")
    print(data)
except Exception as e:
    print("\nFailed to parse JSON:", type(e).__name__, e)
    if r.status_code == 401:
        print("401")
