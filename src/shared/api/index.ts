import axios from 'axios'

export const $api = axios.create({
  withCredentials: true,
  responseType: 'json',
})