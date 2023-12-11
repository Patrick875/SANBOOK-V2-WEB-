import axios from 'axios'
import { serverDev } from '../types/constants'
import Cookie from 'js-cookie'

const instance = axios.create({
    baseURL: serverDev
})

instance.interceptors.response.use(function (response) {

    if (response.data && response.data.user) {
        Cookie.set('user', JSON.stringify({
            userId: response.data.user.id,
            username: response.data.user.username,
            email: response.data.user.email,
            role: response.data.user.role
        }))
        Cookie.set('token', response.data.token)

    }
    return response
})
instance.interceptors.request.use(function (request) {
    const user = Cookie.get('user')

    if (user) {
        const { username, userId } = JSON.parse(Cookie.get('user'))
        request.headers.username = username
        request.headers.userId = userId

    }
    return request
})

export default instance