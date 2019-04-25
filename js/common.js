// 接口回调参数说明: 200 正常    401 token失效

// app.$forceUpdate(); //重新渲染dom元素 

// 在签约的时候传的参数status    用户端强制为1

// 审核结果    1：待审核    2：同意     3：拒绝

// 本地存储的所有数据: 
	// userStatus  0: 未登录   1: 已登录但是未绑定身份证号码   2: 用户状态正常
	// userName    绑定用户的名字
	// areaCode    地区编码
	// idCard      身份证号码
	// genderCd    性别
	// birthDate   出生日期
	// address     地址
	// isContrct   是否可以进行签约
	// userId      个人Id
	// teamCode    签约的团队code    没有签约任何团队时显示 "暂未签约"
	// personId    用户的ID；
	
	// ryAppKey    融云APPKEY
	// ryToken	   融云token
const JTURL = "http://192.168.1.188:8089/jkda/"
// const JTURL = "http://192.168.1.4:8089/jkda/"


// 获取本地存储的数据
var token,phone,areaCode,idCard,personId,userName;
function getStorageDate(){
	token = plus.storage.getItem("token");
	phone = plus.storage.getItem("phone");
	areaCode = plus.storage.getItem("areaCode");
	idCard = plus.storage.getItem("idCard");
	userId = plus.storage.getItem("userId");
	personId = plus.storage.getItem("personId");
	userName = plus.storage.getItem("userName");
}

// 清楚本地所有缓存
function clearStorage (){
	plus.storage.clear();
}


// 盘点某DOM是否含有某class类
function hasClass(element, cls) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;   // true为有   false为没有
}

// 关闭当前页面
function closeActivePage() {
	var ws = plus.webview.currentWebview();
	plus.webview.close(ws);
}

// Ajax请求失败后执行的函数
function ajaxError(type) {
	if(type == 'timeout') {
		plus.nativeUI.toast("请求超时");
	} else {
		plus.nativeUI.toast("请求失败");
	}
}
// token失效的时候调用的函数
function ajaxTokenInvalid (){
	plus.nativeUI.toast("登录凭证失效 请重新登录");
	plus.storage.removeItem("token");
	plus.storage.removeItem("userId");
	plus.storage.removeItem("phone");
	plus.storage.removeItem("userName");
	// var login = plus.webview.create("/page/login/login.html", "login"); // 
	// plus.webview.show(login, "slide-in-left", 300)
}
// 其他错误
function otherErr (){
	plus.nativeUI.toast("服务器异常 请稍后重试");
}



// 刷新首页四个页面的内容
function refreshIndexPage(){
	var indexCom = plus.webview.getWebviewById(plus.runtime.appid);
	var index_ = plus.webview.getWebviewById("index_");
	var msg = plus.webview.getWebviewById("msg");
	var heathy = plus.webview.getWebviewById("heathy");
	var own = plus.webview.getWebviewById("own");
	
	mui.fire(indexCom, "refresh");
	mui.fire(index_, "refresh");
	mui.fire(msg, "refresh");
	mui.fire(heathy, "refresh");
	mui.fire(own, "refresh");
}


