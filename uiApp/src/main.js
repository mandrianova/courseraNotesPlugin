import Agent from "./agent.js";
import Panel from "./panel.js"

let CURRENT_LOCATION_PATH = "";
const panel = new Panel();
document.body.appendChild(panel.render());
panel.hide();
const agent = new Agent();
panel.content.appendChild(agent.render())

function run() {
  if (CURRENT_LOCATION_PATH === window.location.pathname) {
    return;
  }
  CURRENT_LOCATION_PATH = window.location.pathname;
  console.log('Run App');
  panel.show();
}

setInterval(run, 1000);