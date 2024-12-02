include serverApp/.env
export $(shell sed 's/=.*//' serverApp/.env)

dev:
	poetry run fastapi run serverApp/main.py --port 8181 --reload


run:
	poetry run uvicorn serverApp.main:app --port 8181
