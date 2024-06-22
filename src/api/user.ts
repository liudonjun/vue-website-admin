import request from "../utils/axios";

/**
 * @description "服务商登录"
 * @param req
 */
export function fetchLogin(req: any) {
  return request.post<any>(`/auth/login`, req)
}


/**
 * @description "服务商登录"
 * @param req
 */
export function fetchUserInfo() {
  return request.get<any>(`/users/profile`)
}




