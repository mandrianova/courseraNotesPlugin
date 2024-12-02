import {getBreadcrumb, getTopic, getSubtitles } from "./collect.js";

const url = 'http://localhost:8181/notes';


async function getAIResponse(message) {
  const data = {
    navigation: getBreadcrumb(),
    user_message: message,
    topic: getTopic(),
    subtitle: getSubtitles()
  }
  console.log(data);
  return await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(response_data => {
      console.log(response_data);
      return response_data;
    })
}

export default getAIResponse;