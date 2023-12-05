import axios from 'axios'
import { serverDev } from '../types/constants'
import Cookie from 'js-cookie'

const instance = axios.create({
    baseURL: serverDev
})

instance.interceptors.response.use(function (response) {

    if (response.data && response.data.user) {
        Cookie.set('user', JSON.stringify({
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

        request.headers.username = JSON.parse(Cookie.get('user')).username


    }
    return request
})

export default instance