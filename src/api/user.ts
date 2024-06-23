import request from "../utils/axios";
import { ResponseData } from "./model/response";
import { UserDto } from "../types/userDto";
import { Token } from "./model/token";
import { LoginDto } from "@/types/loginDto";

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




