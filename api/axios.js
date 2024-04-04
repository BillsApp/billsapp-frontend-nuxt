import axios from 'axios'

const urls = {
  development: 'http://127.0.0.1:8000/'
}

const baseUrl = urls[import.meta.env.MODE]

const axiosIns = axios.create({
    baseURL: baseUrl,
    timeout: 60000,
})

export default axiosIns
