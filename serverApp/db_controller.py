import sqlite3
from pathlib import Path

cur_dir = Path(__file__).parent
db_path = cur_dir / "db.sqlite"

def initialize():
    with sqlite3.connect(db_path) as connection:
        cursor = connection.cursor()
        cursor.execute('CREATE TABLE IF NOT EXISTS courses (id INTEGER PRIMARY KEY, name TEXT UNIQUE)')
        cursor.execute('CREATE TABLE IF NOT EXISTS topics (id INTEGER PRIMARY KEY, name TEXT, course_id INTEGER)')
        cursor.execute('CREATE TABLE IF NOT EXISTS messages (id INTEGER PRIMARY KEY, topic_id INTEGER, role TEXT, content TEXT)')
        connection.commit()

initialize()

def get_course_and_topic_ids(course: str, topic: str) -> tuple:
    with sqlite3.connect(db_path) as connection:
        cursor = connection.cursor()
        cursor.execute('SELECT id FROM courses WHERE name = ?', (course,))
        course_id = cursor.fetchone()
        if not course_id:
            cursor.execute('INSERT INTO courses (name) VALUES (?)', (course,))
            course_id = cursor.lastrowid
        else:
            course_id = course_id[0]
        cursor.execute('SELECT id FROM topics WHERE name = ? AND course_id = ?', (topic, course_id))
        topic_id = cursor.fetchone()
        if not topic_id:
            cursor.execute('INSERT INTO topics (name, course_id) VALUES (?, ?)', (topic, course_id))
            topic_id = cursor.lastrowid
        else:
            topic_id = topic_id[0]
        return topic_id, course_id


def get_messages_by_topic_id(topic_id: int) -> list:
    with sqlite3.connect(db_path) as connection:
        cursor = connection.cursor()
        cursor.execute('SELECT role, content FROM messages WHERE topic_id = ? order by id', (topic_id,))
        return [{'role': role, 'content': content} for role, content in cursor.fetchall()]

def get_messages_by_topic(name: str, course: str) -> list:
    topic_id, _ = get_course_and_topic_ids(course, name)
    return get_messages_by_topic_id(topic_id)

def add_new_message(course: str, topic: str, role: str, content: str) -> list:
    topic_id, _ = get_course_and_topic_ids(course, topic)
    with sqlite3.connect(db_path) as connection:
        cursor = connection.cursor()
        cursor.execute('INSERT INTO messages (topic_id, role, content) VALUES (?, ?, ?)', (topic_id, role, content))
        connection.commit()
    return get_messages_by_topic_id(topic_id)