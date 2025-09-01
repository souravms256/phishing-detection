import os
import requests
import json
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import google.generativeai as genai

# Configure Gemini API
API_KEY = "AIzaSyA1ehn5SAD2l3McMTRiMP6BBEZK6b9NWrc"
genai.configure(api_key=API_KEY)

model = genai.GenerativeModel(
    "gemini-2.5-flash-preview-05-20",
    system_instruction="You are a world-class cybersecurity analyst. "
                       "Your task is to analyze webpages for signs of phishing "
                       "and provide a clear verdict and reasoning. "
                       "Be concise and professional."
)

class WebPageData(BaseModel):
    url: str
    content: str

class AnalysisResult(BaseModel):
    verdict: str
    reasoning: str

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # adjust later for security
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/analyze", response_model=AnalysisResult)
async def analyze_url(data: WebPageData):
    try:
        user_prompt = f"""
        Analyze the following webpage data for signs of phishing or scams.
        
        **URL:** {data.url}
        **Truncated Content:**
        {data.content}
        
        Based on your analysis, provide a verdict.
        - The verdict must be either 'Phishing' or 'Legitimate'.
        - Provide a single, concise sentence of reasoning for your verdict.
        """

        response = await model.generate_content_async(
            user_prompt,
            generation_config=genai.types.GenerationConfig(
                response_mime_type="application/json",
                response_schema={
                    "type": "OBJECT",
                    "properties": {
                        "verdict": {"type": "STRING", "enum": ["Phishing", "Legitimate"]},
                        "reasoning": {"type": "STRING"}
                    },
                    "required": ["verdict", "reasoning"]
                }
            )
        )

        gemini_output = json.loads(response.text)

        return AnalysisResult(
            verdict=gemini_output.get("verdict", "Legitimate"),
            reasoning=gemini_output.get("reasoning", "Analysis inconclusive.")
        )

    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Failed to parse JSON response from Gemini API.")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Gemini API request failed: {str(e)}")
