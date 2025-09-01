# 🛡️ PhishGuard: A Full-Stack Phishing Detector

Yo, check out **PhishGuard**. It's this super cool app that's built to keep you safe from sketchy websites in real-time.  
It's a **Chrome extension**, but it's got a **Python-based FastAPI backend** working behind the scenes.  
It uses **Google's Gemini API** and **Google Search Grounding** to check out URLs and webpage content to find any hidden dangers.

---

## 🚀 What it Does
- **Real-time Checks**: Scans any webpage in a flash with just one click.  
- **AI-Powered Answers**: An awesome AI gives you a straight-up **"Phishing"** or **"Legitimate"** verdict. No confusing stuff, lol.  
- **Smart Info**: The AI's analysis gets a boost with real-time info from Google Search. It's way more accurate because of it.  
- **Super Secure**: It keeps the frontend (the extension) separate from the backend (the FastAPI server) so your API key stays safe and sound.  

---

## 🛠️ Stuff You'll Need
To get the **FastAPI backend** running, you'll need **Python 3.9 or newer**, plus these packages you can install with the `requirements.txt` file we've got:

- fastapi  
- uvicorn  
- google-generativeai  
- python-dotenv  

---

## ⚡ How to Get It Running

### 1️⃣ Fire up the FastAPI Backend
**Get the Dependencies:**  
Make sure you've got Python, then run this command in your terminal to grab all the needed packages:

```bash
pip install -r requirements.txt
```

**Add Your API Key:**  
Create a file called `.env` in the same folder as `main.py` and drop your Gemini API key in there:

```env
API_KEY="your_api_key_here"
```

**Run the Server:**  
Start the FastAPI server with Uvicorn. It's gonna be running locally at [http://127.0.0.1:8000](http://127.0.0.1:8000).

```bash
uvicorn main:app --reload
```

---

### 2️⃣ Install the Chrome Extension
**Load it Up:**  
In Chrome, go to `chrome://extensions`, flip on **"Developer mode"** in the top-right corner, and click **"Load unpacked."**

**Pick the Files:**  
Just pick the folder with your `popup.html`, `popup.js`, and `manifest.json` files. Easy peasy.

**Start Using It:**  
You'll see a cool new **PhishGuard** icon on your toolbar. Click it on any page, and it'll start scanning for you!  

---

✨ Stay safe from scams with **PhishGuard**!  
