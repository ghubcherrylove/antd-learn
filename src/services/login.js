import request from '../utils/request';
import { API_BASE } from '../utils/store'

export async function login(options) {
  console.log('services: /api/login')
  return request('/api/login', {...options, method: 'POST'});
}

export async function queryList(options) {
  return request('/api/cardsList', {...options, method: 'POST'});
}