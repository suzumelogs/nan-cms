import { PaginationType } from '@/libs/types/pagination'
import { TypeOf, string, z } from 'zod'

export type INCOME_OPTIONS_TYPE = {
  value: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
  label: string
}

export type UserType = {
  id: number
  name?: string
  email: string
  role?: string | number
  is_active?: string | number
  profile_photo_url?: string
  created_at?: string
}

export type UserListType = {
  data: UserType[]
} & PaginationType

export type UserSearchInputType = {
  search?: string
  is_active?: string | number
  role?: string | number
  page?: string
  limit?: string
} & PaginationType

export type UserListQueryInputType = {
  column?: string
  sort_by?: 'asc' | 'desc'
} & UserSearchInputType
export type BookMarkType = {
  id: string
  name: string
  address: string
  builded_year: string
  occupation_area: number
  amount: number
  yield: number
}

export type UserDetailType = {
  id: string
  name: string
  email: string
  role?: string
  is_active?: string | number
  created_at: string
  updated_at?: string
}

export type UserDetailResponseType = {
  data: UserDetailType
}

export type DeleteUserParam = {
  userId: string
}

export type QueryInputUserDetailType = {
  userId: string
  sort_by?: string
  column?: string
}

export const UserInputSchema = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
  role: z.string().optional(),
  is_active: z.string().optional(),
  created_at: z.string().optional(),
})

export const UserCreateInputSchema = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
  role: z.string().optional(),
  is_active: z.string().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
})

export const UserUpdateInputSchema = z
  .object({
    id: string(),
  })
  .merge(UserCreateInputSchema)

export type UserCreateInputType = TypeOf<typeof UserCreateInputSchema>
export type UserUpdateInputType = TypeOf<typeof UserUpdateInputSchema>
