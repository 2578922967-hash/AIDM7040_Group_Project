import os
import json
import requests
from dotenv import load_dotenv
from prompts import get_sandbox_simulation_prompt, get_instant_reply_prompt

load_dotenv()

def submit_to_hkbu_api(user_message, system_message, api_key, model_name="gpt-4.1", temperature=0.7):
    """
    此函数提取自 web_demo.py，用于在命令行直接测试学校的 GenAI API。
    """
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
        "api-key": api_key,
    }
    
    messages = [
        {"role": "system", "content": system_message},
        {"role": "user", "content": user_message},
    ]
    
    payload = {
        "messages": messages,
        "temperature": temperature,
        "max_tokens": 1500,
        "top_p": 0.95
    }
    
    try:
        response = requests.post(url, json=payload, headers=headers)
        if response.status_code == 200:
            data = response.json()
            return data['choices'][0]['message']['content']
        else:
            return f"Error {response.status_code}: {response.text}"
    except Exception as e:
        return f"Request failed: {str(e)}"


def test_sandbox():
    # 优先读取系统变量，通常存在 .env 中（假设你的学校API Key存在 OPENAI_API_KEY 或 HKBU_API_KEY）
    api_key = os.environ.get("OPENAI_API_KEY") 
    if not api_key:
        print("警告：未找到 API_KEY，请确保在 .env 文件中设置了 OPENAI_API_KEY。")
        return

    # 构造一个高难度的真实测试场景
    scenario = "组员在DDL前一天突然发消息说自己负责的部分没做完，要求延期交项目。"
    my_role = "组长，非常焦虑且愤怒，但大局为重，必须保证项目能按时交上。"
    target_role = "拖延的组员，平时态度很诚恳但总是掉链子拖进度。"
    my_plan = "你这是什么意思？明晚11点就要交了！今晚你不睡也得把你的部分肝出来，不然我就直接和老师说剔除你的名字！"
    
    # 1. 获取 System Prompt
    system_prompt = get_sandbox_simulation_prompt(scenario, my_role, target_role, my_plan)
    user_message = "请根据我提交的信息，开始执行沙盘推演。"
    
    model_to_test = "gpt-4.1" # 可以随时改换 deepseek-v3 / gemini-2.5-pro 进行多模型交叉测试
    print(f"=== 🚀 正在调用学校 API 测试沙盘推演 (Model: {model_to_test}) ===")
    print("场景:", scenario)
    print("我的回复:", my_plan)
    print("-" * 50)
    
    # 2. 发起 API 请求
    response_text = submit_to_hkbu_api(user_message, system_prompt, api_key, model_to_test, 0.7)
    
    print("\n=== ✨ 模型原始返回 ===")
    print(response_text)
    print("-" * 50)
    
    # 3. 测试 JSON 格式化拦截与解析
    try:
        # 大模型常常会带上 markdown 代码块包裹，这里做一个粗略清理
        cleaned_text = response_text.strip()
        if cleaned_text.startswith("```json"):
            cleaned_text = cleaned_text[7:]
        if cleaned_text.startswith("```"):
            cleaned_text = cleaned_text[3:]
        if cleaned_text.endswith("```"):
            cleaned_text = cleaned_text[:-3]
            
        parsed_json = json.loads(cleaned_text.strip())
        print("\n✅ JSON 解析成功！提取出的【深层】推演结果如下：")
        print("\n▶️ [1. 话语漏洞剖析]:", parsed_json.get("step_1_hidden_subtext"))
        print("\n▶️ [2. 对方真实心理]:", parsed_json.get("step_2_target_psychology"))
        print("\n▶️ [3. 多回合交锋模拟]:")
        for line in parsed_json.get("step_3_dialogue_simulation", []):
            print("  ", line)
        print(f"\n▶️ [4. 预测结果]: {parsed_json.get('step_4_outcome', {}).get('category')}")
        print("   ->", parsed_json.get("step_4_outcome", {}).get("brief_reason"))
        print("\n▶️ [5. 高情商破局策略]:", parsed_json.get("step_5_eq_strategy"))
        print("\n▶️ [6. 大师级替换话术 (3种风格)]:")
        better_scripts = parsed_json.get("step_6_better_scripts", {})
        print("  - 【专业坚定理性】:", better_scripts.get("professional_firm"))
        print("  - 【幽默化解带嘲】:", better_scripts.get("witty_defuse"))
        print("  - 【共情引导解决】:", better_scripts.get("empathetic_guidance"))
        
    except json.JSONDecodeError as e:
        print(f"\n❌ JSON 解析失败，模型未按纯 JSON 严格格式输出。错误信息：{e}")

if __name__ == "__main__":
    test_sandbox()