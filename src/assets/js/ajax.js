const ajaxflag = {}
export default (type='GET', url='',comm ={}, data={}, timeoutflg = true,async=true) => {
	let flagname = url;
	return new Promise((resolve, reject) => { //定义一个promise
		if(!ajaxflag[flagname]){
			type = type.toUpperCase();
			let requestObj;
			if (window.XMLHttpRequest) {
				requestObj = new XMLHttpRequest();
			} else {
				requestObj = new ActiveXObject;
			}
			ajaxflag[flagname] = true;
			// requestObj.timeout = 10000;	// 接口响应延时
			if (type == 'GET') {
				// 公共参数assign业务参数 拼接url
				let dataStr = '';
				let params = Object.assign({},data,comm);
				Object.keys(params).forEach(key => {
					dataStr += key + '=' + params[key] + '&';
				})
				dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
				url = url + '?' + dataStr;

				requestObj.open(type, url, async);
				requestObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
				requestObj.send();
			}else if (type == 'POST') {
				// 公共参数拼接url
				let dataStr = '';
				Object.keys(comm).forEach(key => {
					dataStr += key + '=' + comm[key] + '&';
				})
				dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
				url = url + '?' + dataStr;
				// 业务参数form data
				let parmStr = '';
				Object.keys(data).forEach(key => {
					parmStr += key + '=' + data[key] + '&';
				})
				parmStr = parmStr.substr(0, parmStr.lastIndexOf('&'));

				requestObj.open(type, url, async);
				requestObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
				//requestObj.send(JSON.stringify(data));
				requestObj.send(parmStr);
			}else {
				ajaxflag[flagname] = false;
				reject('error type');
			}

			if(timeoutflg){
				setTimeout(()=>{
					ajaxflag[flagname] = false;
				},1000)
			}else{
				ajaxflag[flagname] = false;
			}

			requestObj.onreadystatechange = () => {
				if (requestObj.readyState == 4) {
					if (requestObj.status == 200) {
						let obj = requestObj.response
						if (typeof obj !== 'object') {
							obj = JSON.parse(obj);
						}
						resolve(obj);
					}else {
						resolve({
							code:-99,
							msg:'小二正忙，请稍候重试',
						});
					}
				}
			}
		}else{
			return '';
		}
	})
}
