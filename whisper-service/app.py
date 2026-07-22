from fastapi import FastAPI, UploadFile, File

from whisper_service import transcribe_audio
from models import TranscriptResponse

app = FastAPI()


@app.get("/")
def health():
    return {"status": "running"}

@app.post("/transcribe", response_model=TranscriptResponse)
async def transcribe(file: UploadFile = File(...)):

    transcript = transcribe_audio(file)

    return TranscriptResponse(
        text=transcript
    )