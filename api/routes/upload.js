<template>
 <div class="file-upload">
 <input type="file" @change="handleFileUpload" />
 <button @click="uploadFile">Upload</button>
 </div>
</template>

<script>
export default {
 methods: {
 handleFileUpload(event) {
 this.file = event.target.files[0];
 },
 async uploadFile() {
 if (this.file) {
 const formData = new FormData();
 formData.append('file', this.file);
 const response = await fetch('/api/upload', {
 method: 'POST',
 body: formData
 });
 const data = await response.json();
 alert(data.message);
 }
 }
 }
};
</script>

<style scoped>
.file-upload {
 margin: 20px 0;
 display: flex;
 align-items: center;
}

.file-upload input {
 margin-right: 10px;
}

.file-upload button {
 padding: 10px 20px;
 background-color: #007bff;
 color: #fff;
 border: none;
 border-radius: 8px;
 cursor: pointer;
}

.file-upload button:hover {
 background-color: #0056b3;
}
</style>
