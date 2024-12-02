

export default class Panel {
    constructor() {
        this.content = document.createElement('div');
        this.content.id = 'floating-panel';
        this.content.style = `
            position: fixed;
            top: 10px;
            right: 200px;
            width: 40vw;
            max-height: 70vh;
            background: #f8f9fa;
            border: 2px solid #ccc;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            z-index: 9999;
            font-family: Arial, sans-serif;
            transition: max-height 0.3s ease;
        `;
        const header = document.createElement('div');
        header.style = `
            background: #007bff;
            color: white;
            padding: 10px;
            font-size: 1.2em;
            font-weight: bold;
            text-align: center;
            cursor: pointer;
        `;
        header.textContent = 'Notes Panel';
        header.addEventListener('click', this.togglePanel);
        this.content.appendChild(header);
    }


    togglePanel() {
      const panelContent = document.getElementById('agent-content');
      const panel = document.getElementById('floating-panel');
      if (panelContent.style.display === 'none') {
        if (panelContent) {panelContent.style.display = 'block';}
        panel.style.maxHeight = '70vh';
      } else {
        if (panelContent) {panelContent.style.display = 'none';}
        panel.style.maxHeight = '40px';
      }
    }

    render() {
        return this.content;
    }
    hide() {
      const el = document.getElementById('floating-panel');
      el.style.display = 'none';
    }
    show() {
      const el = document.getElementById('floating-panel');
      el.style.display = 'block';
    }
    remove (){
        this.content.remove();
    }
}