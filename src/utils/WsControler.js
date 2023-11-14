import Utf8 from 'crypto-js/enc-utf8.js';
import WsParam from './WsParams.js';
import WebSocket from 'ws'

class WsControler {
    /**
     * 
     * @param {string} app_id 程序id，用于鉴权
     * @param {string} api_key api key，用于鉴权
     * @param {string} api_secret hmac-sha256加密的 key，用于鉴权
     * @param {string} host 请求url的host
     * @param {string} path 请求url的path
     * @param {string} image_base64 base64格式的图片数据
     */
    constructor(app_id, api_key, api_secret, host, path, image_base64) {
        this.WsParam = new WsParam(app_id, api_key, api_secret, host, path);
        this.text = [{
            "role": "user", "content": Utf8.stringify(image_base64), "content_type": "image"
        }]
        this.ws = new WebSocket(this.WsParam.create_au_url());
        this.ws.onmessage = (event) => {
            console.log(event);
            //this._getText("assistant", answer);
        }
        this.ws.onopen = () => {
            console.log("open");
            console.log(this.ws.readyState);
        }
        this.ws.onerror = (event) => {
            console.log("error:", event);
        }
    }
    /**
     * 向记录中添加json内容
     * @param {string} role 角色,user or assistant
     * @param {string} content 内容
     */
    _getText(role, content) {
        let jsoncon = {};
        jsoncon["role"] = role;
        jsoncon["content"] = content;
        this.text.push(jsoncon);
    }

    /**
     * 发送Websocket请求
     * @param {string} prompt 用户提交的问题
     */
    send(prompt) {
        this._getText("user", prompt);
        this.ws.send(this.WsParam.create_params(this.text))
        console.log("send");
    }
}

export default WsControler;