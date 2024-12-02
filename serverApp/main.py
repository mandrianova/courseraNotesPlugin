
import logging
from pathlib import Path
from typing import Union

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from pydantic import BaseModel

from openai import OpenAI

from .db_controller import get_messages_by_topic, add_new_message
client = OpenAI()
model = "gpt-4o"

cur_dir = Path(__file__).parent
sys_prompt_path = cur_dir / "system_prompt.txt"

logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)
logger.addHandler(logging.StreamHandler())


def get_file_contents(file_path: Path) -> str:
    with file_path.open("r") as f:
        return f.read()

system_prompt = get_file_contents(sys_prompt_path)

system_message = {
    "role": "system",
    "content": system_prompt
}

class NotesFile(BaseModel):
    filepath: str
    notes: str

class NotesOutput(BaseModel):
    short_description: str
    notes_files: list[NotesFile]


app = FastAPI(debug=True)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Разрешить запросы с любых доменов
    allow_credentials=True,
    allow_methods=["*"],  # Разрешить все методы (GET, POST, OPTIONS и т.д.)
    allow_headers=["*"],  # Разрешить любые заголовки
)


def save_file(filepath: str, notes: str) -> None:
    if filepath.startswith("./"):
        filepath = filepath[2:]
    new_filepath = cur_dir / "output" / filepath
    if not new_filepath.parent.exists():
        new_filepath.parent.mkdir(parents=True)
    i = 1
    while new_filepath.exists():
        # add suffix to filename
        new_filepath = new_filepath.with_name(
            f"{new_filepath.stem}_{i}{new_filepath.suffix}"
        )
    with new_filepath.open("w+") as f:
        f.write(notes)


def get_ai_response(messages: list) -> NotesOutput:
    all_messages = [system_message, *messages]
    response = client.beta.chat.completions.parse(
        model=model,
        messages=all_messages,
        response_format=NotesOutput
    )
    output: NotesOutput = response.choices[0].message.parsed
    logger.info(response.choices[0].message.parsed.model_dump_json(indent=2))
    for notes in output.notes_files or []:
        save_file(notes.filepath, notes.notes)
    return output

class UserRequest(BaseModel):
    navigation: list[str]
    user_message: str
    topic: str
    subtitle: Union[str, None] = None

@app.post("/notes")
def create_notes(data: UserRequest) -> NotesOutput:
    history = get_messages_by_topic(data.topic, data.navigation[0])
    if len(history) > 0:
        data.subtitle = None
    content = data.model_dump_json(exclude_none=True)
    history = add_new_message(data.navigation[0], data.topic, "user", content)
    output = get_ai_response(history)
    add_new_message(data.navigation[0], data.topic, "assistant", output.model_dump_json())
    return output
