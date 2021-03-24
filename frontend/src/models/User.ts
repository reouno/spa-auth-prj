import { Entity } from '@/models/Entity';

export interface User {
  username: string
  firstName: string
  lastName: string
  email: string
  groups: string[]
  isActive: boolean
  isStaff: boolean
  isSuperUser: boolean
  lastLogin: Date
  dateJoined: Date
  userPermissions: string[]
}

export type UserEntity = Entity<string, User>
