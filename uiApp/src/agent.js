import getAIResponse from './api.js'
import createState from "./createState.js";
import showToast from "./toast.js";


export default class Agent {
  constructor() {
    this.loading = createState(false)
    this.loading.onChange = this.onChangeLoadingState.bind(this)
    this.content = document.createElement('div');
    this.content.id = 'agent-content';
    this.content.style = `
          padding: 10px;
          overflow-y: auto;
          height: calc(70vh - 40px);
          display: block;
        `;

    const inputContainer = document.createElement('div');
    inputContainer.style = 'margin-bottom: 10px;';
    const inputField = document.createElement('textarea');
    inputField.id = 'subtitle-input';
    inputField.placeholder = 'Enter your message...';
    inputField.style = `
      width: 90%;
      height: 50px;
      margin-bottom: 10px;
      font-size: 14px;
      padding: 5px;
      border: 1px solid #ccc;
      border-radius: 4px;
    `;
    inputField.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        this.onClickSend();
      }
    });
    const submitButton = document.createElement('button');
    submitButton.innerText = 'Get Subtitles';
    submitButton.id = 'send-button';
    submitButton.style = `
    width: 100%;
    padding: 10px;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
  `;
    submitButton.addEventListener('click', this.onClickSend.bind(this));

    inputContainer.appendChild(inputField);
    inputContainer.appendChild(submitButton);
    this.content.appendChild(inputContainer);

    // Создаем область для заметок
    const notesContainer = document.createElement('div');
    notesContainer.id = 'notes-container';
    this.content.appendChild(notesContainer);
  }

  render() {
    return this.content;
  }
  remove() {
    this.content.remove();
  }

  onChangeLoadingState() {
    const button = document.getElementById('send-button');
    if (this.loading.getValue()) {
      button.innerText = 'Loading...';
      button.disabled = true;
      button.style.cursor = 'not-allowed';
      button.style.background = '#ccc';
    } else {
      button.innerText = 'Get Subtitles';
      button.disabled = false;
      button.style.cursor = 'pointer';
      button.style.background = '#007bff';
    }
  }
  addNote(content) {
    const notesContainer = document.getElementById('notes-container');
    const note = document.createElement('div');
    note.style = `
      background: #f8f9fa;
      border: 1px solid #ccc;
      border-radius: 4px;
      padding: 10px;
      margin: 10px 0;
    `;
    note.innerHTML = content;
    if (notesContainer.firstChild) {
      notesContainer.insertBefore(note, notesContainer.firstChild);
    } else {
      notesContainer.appendChild(note); // Если контейнер пустой, просто добавляем
    }
  }

  onClickSend() {
    if (this.loading.getValue()) return
    this.loading.setValue(true)
    const inputField = document.getElementById('subtitle-input');
    const inputValue = inputField.value.trim();

    getAIResponse(inputValue).then(response => {
      const { short_description, notes_files } = response;
      let text = `<p><strong>Short description:</strong> ${short_description}</p>`;
      text += '<p><strong>Notes files were created:</strong></p>';
      notes_files.forEach(note => {
        text += `<p>${note.filepath}</p>`;
      });
      this.addNote(text);
      inputField.value = '';
    }).catch(error => {
      console.error(error)
      showToast('An error occurred. Please try again.', true)
    }).finally(() => {
      this.loading.setValue(false)
    })
  }
}