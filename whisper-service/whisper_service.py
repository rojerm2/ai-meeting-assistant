import os
import shutil
import tempfile
from pathlib import Path

from faster_whisper import WhisperModel

model = WhisperModel(
    "base",
    device="cpu",
    compute_type="int8"
)

COMMON_AUDIO_EXTENSIONS = {
    ".wav",
    ".mp3",
    ".m4a",
    ".mp4",
    ".aac",
    ".ogg",
    ".oga",
    ".flac",
    ".opus",
    ".webm",
    ".wma",
}


def _get_temp_suffix(upload_file):
    filename = getattr(upload_file, "filename", "") or ""
    suffix = Path(filename).suffix.lower()
    return suffix if suffix in COMMON_AUDIO_EXTENSIONS else ".wav"


def transcribe_audio(upload_file):

    suffix = _get_temp_suffix(upload_file)

    with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as temp_file:

        shutil.copyfileobj(upload_file.file, temp_file)

        temp_path = temp_file.name

    try:

        segments, info = model.transcribe(temp_path)

        transcript = " ".join(
            segment.text.strip()
            for segment in segments
        )

        return transcript

    finally:

        os.remove(temp_path)