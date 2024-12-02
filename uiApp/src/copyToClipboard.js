import showToast from './toast.js';

export default async function copyToClipboard(text) {
  try {
    // Используем Clipboard API для копирования текста
    await navigator.clipboard.writeText(text)
    console.log('Text copied to clipboard:', text);
    showToast('Text copied to clipboard');
  } catch (err) {
    console.error('Error copying text to clipboard:', err);
    showToast('Failed to copy text to clipboard', true);
    throw err; // Пробрасываем ошибку для обработки в вызывающем коде
  }
}