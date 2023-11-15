<template>
    <label for="pic" title="请上传jpg或png格式的图片">上传图片</label>
    <input ref="imgInput" type="file" name="pic" id="pic" v-on:input="showImg" accept="image/png, image/jpg"
        style="display: none">
    <ChatPage :image_base64="image_base64" />
</template>

<script>
export default {
    name: 'App'
}
</script>

<script setup>
import ChatPage from './components/ChatPage.vue';
import { ref } from 'vue';

const imgInput = ref();
const image_base64 = ref();

const showImg = () => {
    let file = imgInput.value.files[0];
    if (file != undefined) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            image_base64.value = reader.result;
        }
    }
    imgInput.value.value = null;

};


</script>

<style>
#app {
    display: flex;
    flex-direction: column;
    height: 99%;
    width: 99%;
    position: absolute;
}
</style>
