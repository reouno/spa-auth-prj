/* eslint-disable camelcase */
import { UserEntity } from '@/models/User';
import apiClient from '@/gateway/apiClient';

export interface UserDto {
  date_joined: string
  email: string
  first_name: string
  groups: string[]
  is_active: boolean
  is_staff: boolean
  is_superuser: boolean
  last_login: string
  last_name: string
  user_permissions: string[]
  username: string
  uuid: string
}

// TODO: リポジトリで定義すべき
export const dtoToUserEntity = (raw: UserDto): UserEntity => ({
  id: { value: raw.uuid },
  val: {
    username: raw.username,
    firstName: raw.first_name,
    lastName: raw.last_name,
    email: raw.email,
    groups: raw.groups,
    isActive: raw.is_active,
    isStaff: raw.is_staff,
    isSuperUser: raw.is_superuser,
    lastLogin: new Date(raw.last_login),
    dateJoined: new Date(raw.date_joined),
    userPermissions: raw.user_permissions,
  },
});

export const checkLoggedIn = (): Promise<UserEntity> => apiClient.get('/api/auth/is-logged-in/').then((response) => dtoToUserEntity(response.data.user));

export const logout = (): Promise<void> => apiClient.get('/api/auth/logout/');
