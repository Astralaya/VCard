import config from '../../main'
 

export default  {
	install (Vue, options) {
		Vue.prototype.$router = {
	        // 保留当前页面，再新打开
	        open (options) {
	        	if(options.type == 'PUSH'){
	        		var strPar = ''
		        	if(options.params) {
		        		var params = options.params.params;
		        		strPar += '?'
		        		for(var key in params) {
		        			strPar += key + '=' + params[key] + '&'
		        		}
		        	}
		            wx.navigateTo({
		              url: options.url + strPar,
		              name: options.name,
		              type: options.type

		            })
	        	} else if (options.type == 'NEW') {
	        		wx.redirectTo({
					  url: options.url
					})
	        	} else if (options.type == 'TAB') {
	        		wx.switchTab({
	        			url: options.url
	        		})
	        	}
	        },
	        back () {
	        
	        },
	        getParams () {
	            return new Promise((resolve, reject) => {
	                _com.contacts(({ status, errorMsg, data }) => {
	                   status === 0 ? resolve(data) : reject({ status, errorMsg, data })
	                })
	            })
	        },
	        refresh () {

	        },
	        setBackParams () {

	        }
	    }
	}
    
}

// Vue.use(router)
