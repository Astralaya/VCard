
import encode from './encode'

let axios = {}
let domain = 'https://yj.kiy.cn'

domain = 'http://192.168.30.37:9898'

axios.postApiData = (options) => new Promise((resolve, reject) => {
	// console.log(options)
	console.log(domain + options.url)
	  wx.request({
		  url: domain + options.url,
	    method: options.method || 'POST',
	    data: options.data || {},
	    success: res => {
			console.log(res)
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
	wx.request({
		url : domain + '/Mobile/GetData/GetAjaxData',
		method: 'POST',
		data: {data : en},
	    success: res => {
	    	resolve(res.data)
	    },
	    fail: res => reject(res)
	})
})

export default axios
