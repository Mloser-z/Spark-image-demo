<template>
    <div class="chat-page">
        <ContentBox :recordContents="textRecordContents" />
        <SendBox @postChatPrompt="send" :isConnected="connect" />
    </div>
</template>

<script>
export default {
    name: "ChatPage"
}
</script>

<script setup>
import { ref, defineProps, watch } from 'vue';
import ContentBox from './ContentBox.vue';
import SendBox from './SendBox.vue';
import { createAuthorUrl, createParams, createRecordContents, getRecordContent, } from '@/utils/wsutils';
import { app_id, api_key, api_secret, host, path } from '../config';

const textRecordContents = ref([]);
const recordContents = ref([]);
const connect = ref(true);
const props = defineProps({
    image_base64: String
});
let ws = undefined;

/* 点击发送功能 */
const send = (prompt) => {
    let recordContent = getRecordContent("user", prompt);
    recordContents.value.push(recordContent);
    textRecordContents.value.push([recordContent, textRecordContents.value.length]);
    ws.send(createParams(app_id, recordContents.value));
}

/* 监听父组件传值变化，解决异步问题，初始化 */
watch(() => props.image_base64, (newValue) => {
    // base64编码必须去除头部
    let unHeaderBase64 = newValue.split(",")[1];
    recordContents.value = createRecordContents(unHeaderBase64);
    connect.value = false;
})

/* 监听WebSocket连接状态 */
watch(connect, () => {
    if (!connect.value) {
        ws = new WebSocket(createAuthorUrl(api_key, api_secret, host, path));
        ws.onopen = () => {
            connect.value = true;
        }
        ws.onerror = (event) => {
            console.log("error", event);
            alert("Error!");
        }
        ws.onmessage = (response) => {
            let res = JSON.parse(response.data);
            if (res.header.code == 0) {
                let newRes = res.payload.choices.text[0].content;
                // 第一条消息需要创建json，动态改变textRecordContetnts最后一条消息实现流式输出
                if (res.payload.choices.seq == 0) {
                    let recordContent = getRecordContent("assistant", newRes);
                    textRecordContents.value.push([recordContent, textRecordContents.value.length]);
                }
                else {
                    textRecordContents.value[textRecordContents.value.length - 1][0].content += newRes;
                }
                // 最后一条消息时，将recordContents中记录完整信息
                if (res.payload.usage != undefined) {
                    recordContents.value.push(textRecordContents.value[textRecordContents.value.length - 1][0]);
                }
            }
            else {
                alert(res.header);
                //console.log(response.data);
            }
        }
        ws.onclose = () => {
            connect.value = false;
        }
    }

})

</script>

<style>
.chat-page {
    display: flex;
    flex-direction: column;
    flex: 1;
}
</style>