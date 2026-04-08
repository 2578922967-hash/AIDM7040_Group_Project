import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

def test_prompt(scenario, tone="professional"):
    """
    Test a single prompt with a specific scenario and tone.
    """
    client = OpenAI() # Assumes OPENAI_API_KEY is set in environment/env file
    
    print(f"Testing Scenario: '{scenario}'")
    print(f"Applying Tone: '{tone}'")
    print("-" * 20)
    
    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful assistant specialized in emotional intelligence."},
                {"role": "user", "content": f"Provide a {tone} reply to the following situation: {scenario}"}
            ]
        )
        print("Generated Reply:")
        print(response.choices[0].message.content)
    except Exception as e:
        print(f"Error: {e}")
    print("=" * 40)

if __name__ == "__main__":
    # Scenarios from 'Phase1/高情商.docx' (Example placeholders)
    # Replace these with actual content from your document
    scenarios = [
        "My colleague keeps interrupting me in meetings.",
        "A friend asked to borrow money again but hasn't paid back the last loan.",
        "My partner is upset because I forgot our anniversary."
    ]
    
    for s in scenarios:
        test_prompt(s, tone="firm but polite")
