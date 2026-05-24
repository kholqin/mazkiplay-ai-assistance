<template>
 <div class="chat-container">
 <div v-for="(message, index) in messages" :key="index" class="message">
 <div v-if="message.sender === 'user'" class="user-message">{{ message.text }}</div>
 <div v-else class="ai-message">{{ message.text }}</div>
 </div>
 <div class="input-area">
 <input v-model="userInput" @keyup.enter="sendMessage" placeholder="Type a message..." />
 <button @click="sendMessage">Send</button>
 </div>
 </div>
</template>

<script>
export default {
 data() {
 return {
 messages: [],
 userInput: ''
 };
 },
 methods: {
 async sendMessage() {
 if (this.userInput.trim() !== '') {
 this.messages.push({ sender: 'user', text: this.userInput });
 this.userInput = '';
 const response = await this.fetchAIResponse(this.userInput);
 this.messages.push({ sender: 'ai', text: response });
 }
 },
 async fetchAIResponse(message) {
 const response = await fetch('/api/chat', {
 method: 'POST',
 headers: {
 'Content-Type': 'application/json'
 },
 body: JSON.stringify({ message })
 });
 const data = await response.json();
 return data.response;
 }
 }
};
</script>

<style scoped>
.chat-container {
 padding: 20px;
 border: 1px solid #ddd;
 border-radius: 8px;
 max-width: 600px;
 margin: 0 auto;
 background-color: #f9f9f9;
}

.message {
 margin-bottom: 10px;
}

.user-message, .ai-message {
 padding: 10px;
 border-radius: 8px;
 max-width: 80%;
 word-wrap: break-word;
}

.user-message {
 background-color: #007bff;
 color: #fff;
 margin-left: auto;
}

.ai-message {
 background-color: #e9ecef;
 color: #333;
 margin-right: auto;
}

.input-area {
 display: flex;
 margin-top: 20px;
}

.input-area input {
 flex: 1;
 padding: 10px;
 border: 1px solid #ddd;
 border-radius: 8px;
 margin-right: 10px;
}

.input-area button {
 padding: 10px 20px;
 background-color: #007bff;
 color: #fff;
 border: none;
 border-radius: 8px;
 cursor: pointer;
}

.input-area button:hover {
 background-color: #0056b3;
}
</style>
  
