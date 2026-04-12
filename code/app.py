import streamlit as st
import os
import json
import requests
from dotenv import load_dotenv

from prompts import get_instant_reply_prompt, get_sandbox_simulation_prompt

# 加载环境变量
load_dotenv(override=True)
st.set_page_config(page_title="High-EQ Reply Assistant", page_icon="💬", layout="wide")

# ================================
# 核心通信模块：直接内嵌原本后端的逻辑
# ================================
def call_hkbu_api(system_prompt: str, user_message: str, api_key: str = None, model_name: str = "gpt-4.1", temperature: float = 0.7):
    final_api_key = api_key or os.environ.get("OPENAI_API_KEY")
    if not final_api_key:
        raise Exception("API key is missing. Please provide it in the sidebar.")
    
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
        "max_tokens": 6000,
        "top_p": 0.95
    }
    
    resp = requests.post(url, json=payload, headers=headers)
    if resp.status_code == 200:
        return resp.json()['choices'][0]['message']['content']
    else:
        raise Exception(f"API Error {resp.status_code}: {resp.text}")

def parse_json_response(raw_text: str):
    import json
    import re
    
    md_match = re.search(r'```(?:json)?\s*(\{.*?\})\s*```', raw_text, re.DOTALL | re.IGNORECASE)
    if md_match:
        try:
            return json.loads(md_match.group(1), strict=False)
        except:
            pass

    cleaned = re.sub(r'<think>.*?</think>', '', raw_text, flags=re.DOTALL)
    
    start_idx = cleaned.find('{')
    end_idx = cleaned.rfind('}')
    
    if start_idx != -1 and end_idx != -1 and end_idx >= start_idx:
        json_str = cleaned[start_idx:end_idx+1]
        try:
            return json.loads(json_str, strict=False)
        except json.JSONDecodeError as e:
            raise ValueError(f"JSON Parse Error: {str(e)} | Extracted Text: {json_str[:150]}")
            
    raise ValueError("未能在大模型回复中获取有效的 JSON({...}) 结构")

# ================================
# UI 界面部分 (原 web_demo.py)
# ================================
with st.sidebar:
    st.title("配置面板 ⚙️")
    st.subheader("HKBU GenAI")
    default_key = os.environ.get("OPENAI_API_KEY", "")
    api_key = st.text_input("API Key (可随时更新新Key)", value=default_key, type="password")
    
    model_name = st.selectbox(
        "选择大模型", 
        ["gpt-4.1", "gpt-4.1-mini", "gpt-5", "o1", "deepseek-v3", "deepseek-r1", "gemini-2.5-pro", "qwen3-max"],
        index=0
    )
    st.sidebar.markdown("---")
    st.sidebar.success("✅ 单文件部署版本，直接向 API 发起请求，无需单独启动本地后端。")

st.title("💬 High-EQ Reply Assistant")
st.caption(f"Powered by HKBU API 直连 & {model_name}")

tab1, tab2 = st.tabs(["⚡ 即时高情商回复", "🎭 深度场景沙盘推演"])

# --- TAB 1: 即时回复 ---
with tab1:
    st.header("⚡ 即时高情商回复")
    message = st.text_area("对方发来的消息内容：", height=100)
    context = st.text_input("对话场景补充（选填）：", placeholder="例如：这是公司群聊 / 她是我相亲对象")
    tone = st.selectbox("期望回复的语气风格：", ["专业且坚定", "幽默风趣带点自嘲", "委婉但彻底的拒绝", "高情商阴阳怪气", "温柔亲切全包容"])
    
    if st.button("✨ 一键生成高情商回复"):
        if not message:
            st.warning("请填入对方发来的消息！")
        else:
            with st.spinner("AI 正在斟酌遣词造句..."):
                try:
                    prompt = get_instant_reply_prompt(message, tone, context)
                    raw_response = call_hkbu_api(prompt, "请直接输出符合我要求的JSON格式的回复方案。", api_key, model_name)
                    data = parse_json_response(raw_response)
                    
                    st.success("✅ 回复生成成功！")
                    st.info(f"**💡 破局思路**：\n{data.get('explanation', '')}")
                    
                    c1, c2, c3 = st.columns(3)
                    with c1:
                        st.markdown("### 方案 A")
                        st.write(data.get("reply_1", ""))
                    with c2:
                        st.markdown("### 方案 B")
                        st.write(data.get("reply_2", ""))
                    with c3:
                        st.markdown("### 方案 C")
                        st.write(data.get("reply_3", ""))
                except Exception as e:
                    st.error(f"❌ 生成失败: {str(e)}")

# --- TAB 2: 沙盘推演 ---
with tab2:
    st.header("🎭 深度场景沙盘推演")
    st.markdown("在**面对高压冲突/纠纷**时，输入你的初步想法，AI 将无情戳破漏洞并推演结局。")
    
    scenario = st.text_area("场景事件描述：", placeholder="例如：项目DDL前一天组员突然称做不完要延期...")
    colA, colB = st.columns(2)
    with colA:
        my_role = st.text_input("我的角色：", placeholder="例如：暴怒且要兜底的组长")
    with colB:
        target_role = st.text_input("对方角色：", placeholder="例如：爱拖延的组员")
        
    my_plan = st.text_area("我的拟定应对方案（直觉下的脾气原话）：", placeholder="例如：你是不是有病？今晚你不睡也得给我肝出来不然别挂名！")

    if st.button("🔮 启动大师沙盘推演"):
        if not scenario or not my_plan:
            st.warning("请确保场景描述和应对方案不为空。")
        else:
            with st.spinner("沙盘推演中，这可能需要稍作等待..."):
                try:
                    prompt = get_sandbox_simulation_prompt(scenario, my_role, target_role, my_plan)
                    raw_response = call_hkbu_api(prompt, "请不要客气，直接开始锐利的沙盘推演，并仅返回严格的JSON。", api_key, model_name)
                    data = parse_json_response(raw_response)
                    
                    st.subheader("🔍 第一部分：破除虚妄 (问题解剖)")
                    st.error(f"**💥 话语漏洞剖析**：\n{data.get('step_1_hidden_subtext', '')}")
                    st.warning(f"**🧠 对方真实心理**：\n{data.get('step_2_target_psychology', '')}")
                    
                    st.subheader("⚔️ 第二部分：多回合交锋模拟")
                    for idx, line in enumerate(data.get("step_3_dialogue_simulation", [])):
                        st.markdown(f"> *Round {idx+1}* 💬: {line}")
                        
                    outcome = data.get("step_4_outcome", {})
                    st.error(f"**🎲 结局预判**：【{outcome.get('category', '')}】 - {outcome.get('brief_reason', '')}")
                    
                    st.subheader("💡 第三部分：大师级破局建议")
                    st.success(f"**🎯 破局基本法**：\n{data.get('step_5_eq_strategy', '')}")
                    
                    st.markdown("#### 🌟 救场话术包（可直接复制）")
                    scripts = data.get('step_6_better_scripts', {})
                    st.markdown(f"- **🛡️ 专业与坚定**: {scripts.get('professional_firm', '')}")
                    st.markdown(f"- **🎭 幽默与化解**: {scripts.get('witty_defuse', '')}")
                    st.markdown(f"- **🤝 共情与引导**: {scripts.get('empathetic_guidance', '')}")
                    
                except Exception as e:
                    st.error(f"❌ 推演失败: {str(e)}")