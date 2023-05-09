import { showLoadingToast } from 'vant'

export const showLoading = (msg = '跳转中...', callback) => {
    const toast = showLoadingToast({
        message: msg,
        forbidClick: true,
        duration: 0,
        onOpened: () => {
            callback(toast)
        }
    })
}