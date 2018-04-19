
import encode from './encode'

let axios = {}
let domain = 'https://yj.kiy.cn'

// domain = 'http://192.168.30.37:9898'

axios.domain = domain

axios.postApiData = (options) => new Promise((resolve, reject) => {
	console.log(options.data)
	  wx.request({
		url: domain + options.url,
	    method: options.method || 'POST',
	    data: options.data ,
	    success: res => {
	    	resolve(res.data)
	    },
	    fail: res => {
	    	reject(res)
	    }
	  })
})
 
axios.getAjaxData = (param , strMethod , uid) => new Promise((resolve , reject) => {
	if(strMethod) { const paramData = Object.assign(param,{strMethod: strMethod}) }
	const data = Object.assign({uid : uid || '217141a5-01d0-4696-9500-ae2d82a8cb4c'},{param : param || paramData})
	const en = encode(JSON.stringify(data))
	console.log(JSON.stringify(data))
	wx.request({
		url : domain + '/Mobile/GetData/GetAjaxData',
		method: 'POST',
		data: {data : en},
	    success: res => {
			try {
				// resolve只返回数据，不返回其他
				if (res.data.success) {
					resolve(res.data.data)
				} else {
					wx.showToast({
						title: res.data.map.errMsg || res.data.msg,
						icon: 'none'
					})
					reject(res.data)
				}
			} catch (error) {
				wx.showToast({
					title: res.data.map.errMsg,
					icon: 'none'
				})
			}
			
	    	
	    },
	    fail: res => {
			wx.showToast({
				title: res.msg,
				icon: 'none'
			})
			reject(res)
		}
	})
})

export default axios
