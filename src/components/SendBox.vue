<template>
    <div class="chat-content">
        <!-- recordContent 聊天记录数组-->
        <div v-for="record in recordContent" :key="record[1]">
            <!-- AI -->
            <div class="word" v-if="record[0].role != 'user'">
                <img :src="aiImg">
                <div class="info">
                    <div class="info-content">{{ record[0].content }}</div>
                </div>
            </div>
            <!-- 用户 -->
            <div class="word-my" v-else>
                <div class="info-my">
                    <div class="info-content-my">{{ record[0].content }}</div>
                </div>
                <img :src="userImg">
            </div>
        </div>
    </div>
    <div class="auto-fill"></div>
    <div class="chat-bottom">
        <div class="chat-area">
            <textarea v-model="prompt" class="chat-area-input"></textarea>
            <button class="send-btn" @click="send">发送</button>
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
import { ref, defineProps } from 'vue';

const recordContent = ref();
const aiImg = ref();
const userImg = ref();
const prompt = ref();
const props = defineProps({
    image_base64: String
});

//TODO: 点击按钮后的发送与接收，以及如何进一步封装api
const send = () => {
    console.log(prompt.value);
    prompt.value = "";
}

console.log(props.image_base64);

aiImg.value = "logo.png";
userImg.value = "logo.png";

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
.chat-content {
    width: 100%;
    background-color: #E5F1F5;
}

.word {
    display: flex;
    margin-bottom: 20px;
}

img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
}

.info {
    margin-left: 10px;
}

.info-content {
    padding: 10px;
    font-size: 14px;
    background: #fff;
    position: relative;
    margin-top: 8px;
}

.info-content::before {
    position: absolute;
    left: -8px;
    top: 8px;
    content: '';
    border-right: 10px solid #FFF;
    border-top: 8px solid transparent;
    border-bottom: 8px solid transparent;
}

.word-my {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;
}

.info-my {
    width: 90%;
    margin-left: 10px;
    text-align: right;
}

.info-content-my {
    max-width: 70%;
    padding: 10px;
    font-size: 14px;
    float: right;
    margin-right: 10px;
    position: relative;
    margin-top: 8px;
    background: #005366;
    text-align: left;
    color: #ffffff;
}

.info-content-my::after {
    position: absolute;
    right: -8px;
    top: 8px;
    content: '';
    border-left: 10px solid #005366;
    border-top: 8px solid transparent;
    border-bottom: 8px solid transparent;
}


.auto-fill {
    background: #E5F1F5;
    flex: 1
}

.chat-area {
    margin: 0px 10px;
    margin-bottom: 10px;
    display: flex;
    padding: 6px 5px;
    align-items: center;
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
    color: #409eff;
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