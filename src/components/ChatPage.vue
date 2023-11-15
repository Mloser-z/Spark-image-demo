<template>
    <div class="chat-page">
        <ContentBox :recordContent="recordContent" />
        <SendBox @postChatPrompt="send" />
    </div>
</template>

<script>
export default {
    name: "ChatPage"
}
</script>

<script setup>
import { ref, defineProps } from 'vue';
import ContentBox from './ContentBox.vue';
import SendBox from './SendBox.vue';

const recordContent = ref();

const props = defineProps({
    image_base64: String
});

//TODO: 点击按钮后的发送与接收，以及如何进一步封装api
const send = (prompt) => {
    console.log(prompt.value);
}

console.log(props.image_base64);

recordContent.value = [
    [{ "role": "user", "content": "这是用户" }, 0],
    [{ "role": "ai", "content": "这是AI" }, 1],
    [{ "role": "user", "content": "这是用户" }, 2],
    [{ "role": "ai", "content": "这是AI" }, 3],
    [{ "role": "user", "content": "这是用户" }, 4],
    [{ "role": "ai", "content": "这是AI" }, 5]
];



</script>

<style>
.chat-page {
    display: flex;
    flex-direction: column;
    flex: 1;
}
</style>