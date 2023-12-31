import HmacSHA256 from 'crypto-js/hmac-sha256.js'
import Base64 from 'crypto-js/enc-base64.js';
import Utf8 from 'crypto-js/enc-utf8.js'

/**
 * 生成具有连接权限的url
 * @param {string} api_key api key，用于鉴权
 * @param {string} api_secret hmac-sha256加密的 key，用于鉴权
 * @param {string} host 请求url的host
 * @param {string} path 请求url的path
 * @returns Websocket可以直接连接的带有权限的url
 */
export function createAuthorUrl(api_key, api_secret, host, path) {
    let url = "wss://" + host + path;
    // 生成RFC1123格式的时间戳
    let date = new Date();
    let timestamp = date.toUTCString();
    //let timestamp = "Tue, 14 Nov 2023 06:46:57 GMT";
    // 拼接字符串
    let signature_origin = "host: " + host + "\n" + "date: " + timestamp + "\n" + "GET " + path + " HTTP/1.1";

    // 进行hmac-sha256进行加密
    let signature_sha = HmacSHA256(Utf8.parse(signature_origin), Utf8.parse(api_secret));

    let signature_sha_base64 = Base64.stringify(signature_sha);

    let authorization_origin = `api_key="${api_key}", algorithm="hmac-sha256", headers="host date request-line", signature="${signature_sha_base64}"`;

    let authorization = Base64.stringify(Utf8.parse(authorization_origin));

    // 拼接鉴权参数，生成url
    url = encodeURI(`${url}?authorization=${authorization}&date=${timestamp}&host=${host}`);
    return url;
}

/**
 * Websocket请求的参数
 * @param {string} app_id 程序id,用于鉴权
 * @param {Array} prompts 所有的上下文信息
 */
export function createParams(app_id, prompts) {
    /*通过appid和用户的提问来生成请参数*/
    let data = {
        "header": {
            "app_id": app_id
        },
        "parameter": {
            "chat": {
                "domain": "image",
                "temperature": 0.5,
                "top_k": 4,
                "max_tokens": 2028,
                "auditing": "default"
            }
        },
        "payload": {
            "message": {
                "text": prompts
            }
        }
    }
    return JSON.stringify(data);
}

/**
 * 创建包含图片记录
 * @param {string} image_base64 图片base64编码
 * @returns 记录
 */
export function createRecordContents(image_base64) {
    let recordContents = [{ "role": "user", "content": image_base64, "content_type": "image" }];
    return recordContents;
}

/**
     * 要向记录中添加的json内容
     * @param {string} role 角色,user or assistant
     * @param {string} content 内容
     * @param {Array} index 索引
     * @returns 格式化的记录
     */
export function getRecordContent(role, content) {
    let jsoncon = {};
    jsoncon["role"] = role;
    jsoncon["content"] = content;
    jsoncon["content_type"] = "text";

    return jsoncon;
}

export function getWebSocket(url) {
    return new WebSocket(url);
}
