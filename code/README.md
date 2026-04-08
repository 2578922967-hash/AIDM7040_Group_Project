# AIDM7040 Group Project - Phase 1 Technical Setup

This folder contains the initial Proof of Concept (POC) code for the "High-EQ Reply Assistant".

## 📂 Phase 1 Deliverables
1.  **Web Prototype (Plan A)**: `web_demo.py` - A Streamlit-based web app for quick testing.
2.  **Backend API (Plan B)**: `backend_api.py` - A FastAPI skeleton for future WeChat Mini-Program integration.
3.  **Prompt Testing Script**: `test_prompt.py` - Script to debug prompts using your scenarios.

## 🚀 How to Run

### 1. Install Dependencies
Ensure you possess Python installed. Run:
```bash
pip install -r requirements.txt
```

### 2. Set Up API Key
Create a `.env` file in this directory and add your OpenAI API key:
```bash
OPENAI_API_KEY=sk-your-api-key-here
```

### 3. Run the Web App (Plan A MVP)
This is the primary deliverable for Phase 1 tech verification.
```bash
streamlit run web_demo.py
```
Open your browser at `http://localhost:8501`.

### 4. Run the Backend API (Plan B Skeleton)
This demonstrates readiness for a future Mini-Program backend.
```bash
uvicorn backend_api:app --reload
```
Test endpoints at `http://localhost:8000/docs`.

### 5. Test Prompts Manually
Run the prompt tester script with scenarios from `Phase1/高情商.docx`:
```bash
python test_prompt.py
```
*Note: Edit `test_prompt.py` to insert actual scenarios from your document.*
