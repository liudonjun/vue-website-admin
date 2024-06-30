
/**
 * 获取用户列表入参
 */
export interface fetchUserListDto {
  pageIndex: number
  pageSize: number
  username: string | undefined
}