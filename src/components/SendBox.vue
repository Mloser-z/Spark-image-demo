<template>
    <div class="send-box">
        <div class="chat-area">
            <textarea ref="textarea" v-model="prompt" class="chat-area-input" @input="adjustHeight"></textarea>
            <img src="send_btn.png" class="send-btn" @click="sendBtnClick" />
        </div>
        <div class="chat-copyright">Powered by Spark v2.1</div>
    </div>
</template>

<script>
export default {
    name: "SendBox"
}
</script>

<script setup>
import { ref, defineEmits } from 'vue';

const textarea = ref()
const prompt = ref();
const emits = defineEmits(['postChatPrompt']);

const sendBtnClick = () => {
    emits('postChatPrompt', prompt.value);
    prompt.value = "";
}

// 自动调整textarea高度
const adjustHeight = () => {
    const lines = textarea.value.value.split('');
    const maxLines = 25;
    if (lines.length <= maxLines) {
        textarea.value.style.height = 'auto';
        textarea.value.style.height = `${textarea.value.scrollHeight}px`;

    }
}

</script>

<style>
.send-box {
    background: #E5F1F5;
    display: flex;
    flex-direction: column;
}

.chat-area {
    margin: 0px 10px;
    margin-bottom: 10px;
    display: flex;
    padding: 6px 5px;
    align-items: flex-end;
    flex: 1;
    box-shadow: 0 5px 30px rgb(50 50 93 / 8%), 0 1px 3px rgb(0 0 0 / 5%);
    border-radius: 10px;
    background: #fff;
}

.chat-area .send-btn {
    color: #383838;
    font-size: 18px;
    margin: 0px 5px;
    cursor: pointer;
}

.chat-area .send-btn:hover {
    background-color: #005366;
    ;
}

.chat-area-input {
    border-radius: 10px;
    border: none;
    flex: 1;
    outline: none;
    resize: none;
    box-sizing: border-box;
    color: #505050;
    min-height: 35px;
    font-size: 16px;
}

.chat-copyright {
    color: #999a9b;
    font-size: 12px;
    text-align: center;
    margin-bottom: 10px;
    filter: grayscale(1);
    opacity: .9;
    font-family: Inter, -apple-system, system-ui, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Tahoma, Arial, sans-serif;
}
</style>