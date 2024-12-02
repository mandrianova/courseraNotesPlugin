# Description

**Coursera Video Note Plugin** for personal local use.

Chrome extension for coursera video to create notes from video transcript by openAI API and save to local files as MD or TEX format.

## Plugin

- manifest.json: Chrome extension manifest file
- plugin: the directory for static files

## Backend

- serverApp: the directory for backend server based on FastAPI. History of messages with openAI API is saved in SQLite database.
- Makefile: the file to run the backend server
- .env: the environment file for the openAI API environment variables:
```
OPENAI_API_KEY=sk-...
OPENAI_ORG_ID=org-...
OPENAI_PROJECT_ID=proj-...
```
- system_prompt.txt: the file for the openAI API system prompt
- output: the directory for the output files. Notes are saved in this directory by course name and topic name.

## Frontend

- uiApp: the directory for frontend based on vite and VanillaJS.
- need to run `npm install` in the uiApp directory to install the dependencies.
- need to run `npm run dev` in the uiApp directory to start the frontend server.
- need to run `npm run build` in the uiApp directory to build the plugin script.
- index.html: the basic example of the video page with the plugin script.

## Chrome settings

- Go to `chrome://extensions/` and enable the developer mode.
- Click the `Load unpacked` button and select the plugin directory.
- Go to the coursera video page and click the plugin icon to open the plugin.