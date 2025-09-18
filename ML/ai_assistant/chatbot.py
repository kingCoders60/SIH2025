# chatbot.py
import os
import sys
import time
from dotenv import load_dotenv
from google import genai
import google.genai.errors as genai_errors

# Load secrets from .env
load_dotenv()
API_KEY = os.getenv("GEMINI_API_KEY")
PASSWORD = os.getenv("CHATBOT_PASSWORD")

# Initialize Gemini client
client = genai.Client(api_key=API_KEY)

# Safe wrapper to handle 503 overload errors
def safe_generate(model: str, user_input: str, retries: int = 5):
    wait = 3
    for attempt in range(1, retries + 1):
        try:
            return client.models.generate_content(
                model=model,
                contents=user_input
            )
        except genai_errors.ServerError as e:
            if e.status_code == 503:
                print(f"Model overloaded (attempt {attempt}/{retries}). Retrying in {wait}s...")
                time.sleep(wait)
                wait *= 2
            else:
                raise e
    # If retries fail, return fallback
    class Dummy:
        text = "Sorry, the AI is currently overloaded. Please try again later."
    return Dummy()

# Safe wrapper for chat.send_message
def safe_chat_send(chat, user_input: str, retries: int = 5):
    wait = 3
    for attempt in range(1, retries + 1):
        try:
            return chat.send_message(user_input)
        except genai_errors.ServerError as e:
            if e.status_code == 503:
                print(f"Chat model overloaded (attempt {attempt}/{retries}). Retrying in {wait}s...")
                time.sleep(wait)
                wait *= 2
            else:
                raise e
    class Dummy:
        text = "Sorry, the AI is currently overloaded. Please try again later."
    return Dummy()

# Disaster-topic filter
def is_disaster_related(user_input: str) -> bool:
    moderation = safe_generate(
        "gemini-2.5-flash",
        f"Question: {user_input}\n\nAnswer only YES or NO.\n"
        f"Is this question related to natural disasters, disaster preparedness, or disaster management?"
    )
    decision = moderation.text.strip().lower()
    return decision.startswith("yes")

def chatbot():
    if len(sys.argv) < 3:
        print("Usage: python chatbot.py <password> <message>")
        return

    user_pass = sys.argv[1]
    user_input = sys.argv[2]

    if user_pass != PASSWORD:
        print("Sorry, wrong password.")
        return

    # Filter non-disaster queries
    if not is_disaster_related(user_input):
        message = (
            "Sorry, I can only answer questions about natural disasters, "
            "disaster preparedness, or disaster management.\n\n"
            "Try asking about:\n"
            "- How to stay safe during an earthquake?\n"
            "- What emergency kit should I prepare for floods?\n"
            "- How is disaster management planned in cities?\n"
            "- Best practices for cyclone preparedness?"
        )
        print(message)
        return

    # Session memory (lives only while Node.js keeps process alive)
    global chat
    if "chat" not in globals():
        chat = client.chats.create(model="gemini-2.5-flash")

    # Get response safely with retries
    response = safe_chat_send(chat, user_input)
    print(response.text)


if __name__ == "__main__":
    chatbot()







