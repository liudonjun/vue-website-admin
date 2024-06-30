import request from "@/utils/axios";
import { ResponseData } from "./model/response";
import { PageLimitDto } from "./model/PageLimitDto";

/**
 * 创建角色
 * @param req 
 * @returns 
 */
export function fetchCreateRole(req: any) {
  return request.post<ResponseData<Boolean>>(`/role/create`, req)
}

/**
 * 获取角色列表
 * @returns 
 */
export function fetchListRole(req: any) {
  return request.post<ResponseData<PageLimitDto<any>>>('/role/getRoleList', req)
}

/**
 * 修改角色信息
 * @param req 
 * @returns 
 */
export function fetchUpdateRole(id: string | undefined, req: any) {
  return request.patch<ResponseData<Boolean>>(`/role/update/${id}`, req)
}

/**
 * 删除角色
 * @param id 
 * @returns 
 */
export function fetchDeleteRole(id: string | undefined) {
  return request.delete<ResponseData<Boolean>>(`/role/delete/${id}`)
}






