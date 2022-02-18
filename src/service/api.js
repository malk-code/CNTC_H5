import Taro from '@tarojs/taro'
import { HTTP_STATUS } from './status'
import { base } from './config'


export default {
    baseOptions(params, method = 'GET') {
        let { url, data } = params
        let contentType = 'application/x-www-form-urlencoded'
        return new Promise((resolve, reject) => {
            Taro.request({
                isShowLoading: false,
                loadingText: '正在加载',
                url: base + url,
                data: data,
                method: method,
                // header: { 'content-type': contentType, },
                success(res) {
                    if (res.statusCode === HTTP_STATUS.NOT_FOUND) {
                        Taro.showToast({ title: "请求资源不存在", icon: "error" })
                    } else if (res.statusCode === HTTP_STATUS.BAD_GATEWAY) {
                        Taro.showToast({ title: "服务端出现了问题", icon: "error" })
                    } else if (res.statusCode === HTTP_STATUS.FORBIDDEN) {
                        Taro.showToast({ title: "没有权限访问", icon: "error" })
                    } else if (res.statusCode === HTTP_STATUS.SUCCESS) {
                        resolve(res.data)
                    }
                },
                error(e) {
                    Taro.showToast({ title: "请求接口出现问题", icon: "error" })
                },
            })
        })

    },
    get(url, data = '') {
        let option = { url, data }
        return this.baseOptions(option)
    },
    post: function (url, data) {
        let params = { url, data }
        return this.baseOptions(params, 'POST')
    }
}