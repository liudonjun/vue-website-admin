export interface UserDto {
  id: string;
  username: string;
  email: string;
  created_at: string;
  updated_at: string;
}

export type UserParams = Partial<UserDto>