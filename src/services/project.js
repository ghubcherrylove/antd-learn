import request from '../utils/request';
import { API_BASE } from '../utils/store'

export async function queryProjectNotice(options) {
  return request('/api/project/notice', {...options, method: 'POST'});
}