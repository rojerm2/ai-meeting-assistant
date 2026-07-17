# Orcific Minutes

> An AI-powered meeting assistant that transforms messy meeting transcripts into structured meeting notes using a locally running Large Language Model (LLM).

![Java](https://img.shields.io/badge/Java-21-orange)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.x-green)
![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![Tailwind CSS](https://shields.io)
![SQLite](https://img.shields.io/badge/SQLite-3-lightgrey)
![Ollama](https://img.shields.io/badge/Ollama-Local_AI-black)

---

## Overview

Orcific Minutes is a portfolio project demonstrating how to build an AI-powered application completely **offline** using open-source models.

The application accepts a meeting transcript and automatically generates:

- Meeting Summary
- Key Decisions
- Action Items
- Open Questions

Unlike many AI demos, Orcific Minutes also supports:

- Local LLM inference with Ollama
- Multiple AI models
- Prompt versioning
- Meeting history
- PDF and Markdown export
- Response metrics
- Embedding generation
- Semantic search
- Retrieval-Augmented Generation (RAG)

No cloud AI APIs are required.

---

## Features

### AI Features

- Local LLM inference
- Structured JSON extraction
- Prompt engineering
- Multiple model selection
- Response metrics

### Meeting Management

- Upload transcript
- Generate meeting notes
- Save meetings
- Meeting history
- SQLite persistence

### Export

- Copy to clipboard
- Markdown export
- PDF export

### Retrieval-Augmented Generation (RAG)

- Transcript chunking
- Embedding generation
- Semantic search
- Context injection
- AI-powered question answering

---

## Tech Stack

### Frontend

- React
- TypeScript
- Tailwind CSS
- Vite

### Backend

- Java 21
- Spring Boot
- Maven
- SQLite

### AI

- Ollama
- Qwen2.5
- Gemma 3 4B
- Phi-3 Mini
- Nomic Embed Text

---

## Screenshots

- Dashboard
- Meeting Generation
- Meeting History
- RAG Search
- PDF Export

---

## Architecture

See the architecture diagrams below.
Backend Architecture

[Tree](https://tree.nathanfriend.com/?s=(%27op6s!(%27fancyX~fullPath!false~trailLSlashX~rootDotX)~source!(%27source!%27backend3javaTcJWCJ*RagCJTcY*CorsCY*RUtClientCYTdto*ai*9795*08Op6s*087085*0RagAnswz5*0RagQuU670SearchRUult*Ai5*ApiError*Genza6MetadataWHistory5WNotUW7Save27Save25TeZW_EZWEZTeF*GlobalEFHandlz*InvalidAi5EFWProcUsLEF*8Communica6EFTmappzWMappzTrKW_RKWRKTsV*ai*0_L4940840PB40Rag40Retrieval40Similarity424PdfSVTApplica6.java33rUourcUTpBs*meetL-notU.pB*rag-pB.pBTtUt-data*meetL-1.txt%27)~vzsion!%271%27)*T00%20%202MeetL3%5Cn04SV*5RUponse6tion7RequUt*8Ollama90EmbeddLBromptFxcep6JontrollzKepositoryLingT30UesVzviceW*2X!trueYonfigZntity_Chunkzer%01z_ZYXWVUTLKJFB987654320*)
---

## Running Locally

### 1. Install Ollama

```bash
ollama pull qwen2.5:3b
ollama pull nomic-embed-text
```

### 2. Start Ollama

```bash
ollama serve
```

### 3. Run Backend

```bash
mvn spring-boot:run
```

### 4. Run Frontend

```bash
npm install
npm run dev
```

---

## Future Improvements

- Hybrid Search (Keyword + Vector)
- pgvector
- ChromaDB
- Authentication
- Docker Compose
- Multi-user workspaces
- Cloud deployment
- Streaming
- Audio and Video upload

---

## License

MIT
