PhishGuard: A Full-Stack Phishing Detector
PhishGuard is a full-stack application designed to protect users from malicious websites in real-time. It operates as a Chrome extension with a Python-based FastAPI backend, leveraging the power of the Gemini API and Google Search Grounding to analyze URLs and webpage content for potential threats.

Features
Real-time Analysis: Instantly checks the safety of any webpage with a single click.

AI-Powered Verdicts: Uses a large language model (LLM) to provide a clear "Phishing" or "Legitimate" verdict.

Grounded Responses: The LLM's analysis is enhanced with real-time information from Google Search for improved accuracy.

Secure Architecture: Separates the frontend (Chrome extension) from the backend (FastAPI server) to protect the API key and handle complex processing.

Requirements
To run the FastAPI backend, you need Python 3.9 or newer and the following packages, which can be installed using the provided requirements.txt file:

fastapi

uvicorn

google-generativeai

python-dotenv

How to Run
1. Set up the FastAPI Backend
Install Dependencies: Make sure you have Python installed, then run the following command in your terminal to install the necessary packages.

pip install -r requirements.txt


Add your API Key: Create a file named .env in the same directory as main.py and add your Gemini API key.

API_KEY="your_api_key_here"


Run the Server: Start the FastAPI server using Uvicorn. The server will run locally on http://127.0.0.1:8000.

uvicorn main:app --reload


2. Install the Chrome Extension
Load the Extension: In Chrome, go to chrome://extensions, enable "Developer mode" in the top-right corner, and click "Load unpacked."

Select Files: Select the folder containing your popup.html, popup.js, and manifest.json files.

Use the Detector: A new "PhishGuard" icon will appear in your toolbar. Click it on any page to begin the analysis.
