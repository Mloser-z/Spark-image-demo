<template>
    <div class="chat-content">
        <!-- recordContent 聊天记录数组-->
        <div v-for="record in props.recordContent" :key="record[1]">
            <!-- AI -->
            <div class="word" v-if="record[0].role != 'user'">
                <img src="bot.png">
                <div class="info">
                    <div class="info-content">{{ record[0].content }}</div>
                </div>
            </div>
            <!-- 用户 -->
            <div class="word-my" v-else>
                <div class="info-my">
                    <div class="info-content-my">{{ record[0].content }}</div>
                </div>
                <img src="user.png">
            </div>
        </div>
    </div>
    <div class="auto-fill"></div>
</template>

<script>
export default {
    name: "ContentBox"
}
</script>

<script setup>
import { defineProps } from 'vue';
const props = defineProps({
    recordContent: Array
});

</script>

<style>
.chat-content {
    width: 100%;
    background-color: #E5F1F5;
}

.word {
    display: flex;
    margin: 10px 0 10px 20px;
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
    border-radius: 10px;
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
    margin: 10px 20px 10px 0;
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
    border-radius: 10px;
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
</style>