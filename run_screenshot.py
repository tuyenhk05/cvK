import subprocess
import time

chrome = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
proc = subprocess.Popen([
    chrome,
    "--remote-debugging-port=9222",
    "--headless=new",
    "--no-sandbox",
    "http://localhost:5173/"
])

time.sleep(2)

try:
    subprocess.run(["node", "capture_scroll_steps.js"], check=True)
finally:
    proc.terminate()
