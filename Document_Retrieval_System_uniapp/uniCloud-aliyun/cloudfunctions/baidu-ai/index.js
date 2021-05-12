'use strict';
exports.main = async (event, context) => {
	// 百度api鉴权
	let apiUrl = 'https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=z0UB1gOgTiGq3cr35iC87vK7&client_secret=vt1k9dNaoGe3MQDeOt5fElt4KlFpjGrk'
	const res = await uniCloud.httpclient.request(apiUrl, {
	    method: 'POST',
	    contentType: 'json', // 指定以application/json发送data内的数据
	    dataType: 'json' // 指定返回值为json格式，自动进行parse
	})
	
	const access_token = res.data.access_token
	
	switch (event.action) {
		case 'lexer': {
			// 词法分析
			let apiUrl = 'https://aip.baidubce.com/rpc/2.0/nlp/v1/lexer?charset=UTF-8&access_token=' + access_token
			const res = await uniCloud.httpclient.request(apiUrl, {
			    method: 'POST',
				data: {
					text: event.text
				},
			    contentType: 'json',
			    dataType: 'json'
			  })

			return res
		}
	}
	
	//event为客户端上传的参数
	console.log('event : ', event)
	
	//返回数据给客户端
	return event
};
