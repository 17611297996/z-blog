// utils/device.js
export function isMobile() {
    // 检测用户代理字符串中的移动端设备标识
    const userAgent = window.navigator.userAgent.toLowerCase();
    const mobileKeywords = [
        'iphone', 'ipad', 'android', 'mobile', 'tablet', 'ipod',
        'windows phone', 'blackberry', 'samsung', 'htc', 'nokia',
        'motorola', 'sony', ' Ericsson', 'meizu', 'xiaomi',
        'oppo', 'vivo', 'oneplus'
    ];

    // 检查用户代理字符串中是否包含移动端设备关键词
    for (const keyword of mobileKeywords) {
        if (userAgent.includes(keyword)) {
            return true;
        }
    }

    // 如果用户代理字符串中没有发现移动端设备关键词，则检查屏幕宽度
    return window.innerWidth <= 768;
}