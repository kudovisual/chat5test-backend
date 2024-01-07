$(document).ready(function() {
    const socket = new WebSocket('ws://localhost:8000'); // Thay đổi URL socket server nếu cần
    
    const chatMessages = document.getElementById('chat-messages');
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-btn');
    
    // Hàm hiển thị tin nhắn trên giao diện
    function displayMessage(message) {
      const messageElement = document.createElement('div');
      messageElement.innerText = message;
      chatMessages.appendChild(messageElement);
      chatMessages.scrollTop = chatMessages.scrollHeight; // Cuộn xuống dưới cùng
    }
    
    // Gửi tin nhắn khi nhấn nút Send
    sendButton.addEventListener('click', function() {
      const message = messageInput.value.trim();
      if (message !== '') {
        socket.send(message);
        messageInput.value = '';
      }
    });
    
    // Nhận tin nhắn từ server và hiển thị
    socket.addEventListener('message', function(event) {
      const message = event.data;
      displayMessage(message);
    });
  });
  