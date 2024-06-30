import request from "@/utils/axios";
import { ResponseData } from "./model/response";
import { UserDto, UserParams } from "@/types/userDto";
import { Token } from "./model/token";
import { LoginDto } from "@/types/loginDto";
import { PageLimitDto } from "./model/PageLimitDto";
import { fetchUserListDto } from "./req/fetchUserListDto";

/**
 * 登录接口
 * @param req 
 * @returns 
 */
export function fetchLogin(req: LoginDto) {
  return request.post<ResponseData<Token>>(`/auth/login`, req)
}

/**
 * 获取用户信息
 * @returns 
 */
export function fetchUserInfo() {
  return request.get<ResponseData<UserDto>>(`/users/profile`)
}

/**
 * 创建用户
 * @param req 
 * @returns 
 */
export function fetchCreateUser(req: UserParams) {
  return request.post<ResponseData<Boolean>>(`/users/create`, req)
}

/**
 * 获取用户列表
 * @returns 
 */
export function fetchUserList(req: fetchUserListDto) {
  return request.post<ResponseData<PageLimitDto<UserDto>>>('/users/getUserList', req)
}

/**
 * 修改用户信息
 * @param req 
 * @returns 
 */
export function fetchUpdateUser(id: string | undefined, req: UserParams) {
  return request.patch<ResponseData<Boolean>>(`/users/update/${id}`, req)
}

/**
 * 删除用户
 * @param id 
 * @returns 
 */
export function fetchDeleteUser(id: string | undefined) {
  return request.delete<ResponseData<Boolean>>(`/users/delete/${id}`)
}






