import requests

def measure_response_time(url):
    try:
        response = requests.get(url)
        response_time_ms = response.elapsed.total_seconds() * 1000
        print("Response time:", response_time_ms, "milliseconds")
    except requests.exceptions.RequestException as e:
        print("Error:", e)

# Example usage
url = "https://15min.lt"
measure_response_time(url)