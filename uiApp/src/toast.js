export default function showToast(message, isError = false) {
  const toast = document.createElement('div');
  toast.style = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: ${isError ? '#ff4d4f' : '#4caf50'}; /* Цвет: зеленый для успеха, красный для ошибки */
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    font-size: 14px;
    z-index: 10000;
    opacity: 0;
    transition: opacity 0.3s ease, transform 0.3s ease;
    transform: translateY(20px);
  `;
  toast.innerText = message;

  // Добавляем уведомление в документ
  document.body.appendChild(toast);

  // Плавное появление
  setTimeout(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';
  }, 100);

  // Удаляем уведомление через 3 секунды
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(20px)';
    setTimeout(() => {
      toast.remove();
    }, 300); // Ждём завершения анимации
  }, 3000);
}