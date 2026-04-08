from fastapi import FastAPI, HTTPException
import os
import json
import requests
from dotenv import load_dotenv
from pydantic import BaseModel
from typing import Optional, Dict

from prompts import get_instant_reply_prompt, get_sandbox_simulation_prompt

# 加载 .env 中的环境变量并强制覆盖终端缓存
load_dotenv(override=True)

app = FastAPI(title="High-EQ Reply Assistant API", description="AI沟通助手项目核心后端接口")

# ================================
# 核心通信模块：统一封装对 HKBU API 的请求
# ================================
def call_hkbu_api(system_prompt: str, user_message: str, api_key: str = None, model_name: str = "gpt-4.1", temperature: float = 0.7):
    # 优先使用请求传进来的 api_key，如果没传，再去找 .env 文件兜底
    final_api_key = api_key or os.environ.get("OPENAI_API_KEY")
    if not final_api_key:
        raise Exception("API key is missing. Please provide it in request or .env file.")
    
    base_url = "https://genai.hkbu.edu.hk/api/v0/rest"
    model_api_versions = {
        "gpt-5": "2024-12-01-preview",
        "gpt-5-mini": "2024-12-01-preview",
        "gpt-4.1": "2024-12-01-preview",
        "gpt-4.1-mini": "2024-12-01-preview",
        "o1": "2024-12-01-preview",
        "o3-mini": "2024-12-01-preview",
        "deepseek-r1": "2024-05-01-preview",
        "deepseek-v3": "2024-05-01-preview",
        "qwen3-max": "v1",
        "qwen-plus": "v1",
        "gemini-2.5-pro": "v1",
        "gemini-2.5-flash": "v1"
    }

    api_version = model_api_versions.get(model_name, "2024-12-01-preview")
    url = f"{base_url}/deployments/{model_name}/chat/completions?api-version={api_version}"
    
    headers = {
        "accept": "application/json",
        "Content-Type": "application/json",
        "api-key": final_api_key,
    }
    
    payload = {
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_message}
        ],
        "temperature": temperature,
        "max_tokens": 2000,
        "top_p": 0.95
    }
    
    resp = requests.post(url, json=payload, headers=headers)
    if resp.status_code == 200:
        return resp.json()['choices'][0]['message']['content']
    else:
        raise Exception(f"API Error {resp.status_code}: {resp.text}")

def parse_json_response(raw_text: str):
    """鲁棒性：清洗并解析大模型返回的 JSON"""
    cleaned = raw_text.strip()
    if cleaned.startswith("```json"):
        cleaned = cleaned[7:]
    if cleaned.startswith("```"):
        cleaned = cleaned[3:]
    if cleaned.endswith("```"):
        cleaned = cleaned[:-3]
    # strict=False 允许处理大模型在 JSON 字符串里强行换行（\n）引发的控制字符报错
    return json.loads(cleaned.strip(), strict=False)


# ================================
# 数据模型定义 (Request / Response validation)
# ================================
class InstantReplyRequest(BaseModel):
    message: str
    tone: str
    context: Optional[str] = ""
    model: Optional[str] = "gpt-4.1"
    api_key: Optional[str] = None  # 允许由前端随意透传新的临时API Key过来

class SandboxRequest(BaseModel):
    scenario: str
    my_role: str
    target_role: str
    my_plan: str
    model: Optional[str] = "gpt-4.1"
    api_key: Optional[str] = None  # 允许由前端随意透传新的临时API Key过来


# ================================
# 路由接口定义 
# ================================
@app.get("/")
def read_root():
    return {"status": "ok", "message": "High-EQ Assistant FastAPI is running!"}

@app.post("/api/instant-reply")
async def instant_reply(req: InstantReplyRequest):
    """即时高情商回复生成接口"""
    prompt = get_instant_reply_prompt(req.message, req.tone, req.context)
    try:
        raw_response = call_hkbu_api(prompt, "请直接输出符合我要求的JSON格式的回复方案。", req.api_key, req.model)
        parsed = parse_json_response(raw_response)
        return {"status": "success", "data": parsed}
    except json.JSONDecodeError as je:
        raise HTTPException(status_code=500, detail=f"LLM JSON Error: {str(je)}\nRaw: {raw_response}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/sandbox-simulation")
async def sandbox_simulation(req: SandboxRequest):
    """场景模拟推演接口"""
    prompt = get_sandbox_simulation_prompt(req.scenario, req.my_role, req.target_role, req.my_plan)
    try:
        raw_response = call_hkbu_api(prompt, "请不要客气，直接开始锐利的沙盘推演，并仅返回严格的JSON。", req.api_key, req.model)
        parsed = parse_json_response(raw_response)
        return {"status": "success", "data": parsed}
    except json.JSONDecodeError as je:
        raise HTTPException(status_code=500, detail=f"LLM JSON Error: {str(je)}\nRaw: {raw_response}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    # 为了方便热重载调试，终端启动建议使用：uvicorn backend_api:app --reload
    uvicorn.run("backend_api:app", host="0.0.0.0", port=8000, reload=True)
