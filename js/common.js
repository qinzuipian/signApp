const JTURL = "http://192.168.1.188:8089/jkda/"


// 盘点某DOM是否含有某class类
function hasClass(element, cls) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}

// 关闭当前页面
function closeActivePage() {
	var ws = plus.webview.currentWebview();
	plus.webview.close(ws);
}

// Ajax请求失败后执行的函数
function ajaxError(type) {
	if(type == 'timeout') {
		plus.nativeUI.toast("服务器忙");
	} else {
		plus.nativeUI.toast("请检查本地网络");
	}
}