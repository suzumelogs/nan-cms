import { UserListQueryInputType, UserListType } from '@/features/user'
import {
  QueryInputUserDetailType,
  UserDetailResponseType,
  UserUpdateInputType,
} from '@/features/user/type'
import request from '../config/axios'
import { clearObjRequest } from '../hooks'

export const getListUser = async (params: UserListQueryInputType) => {
  try {
    const response = await request.get<UserListType>('/user', { params })
    return response.data
  } catch (error) {
    throw error
  }
}

export const getUser = async (id: string) => {
  try {
    const response = await request.get<UserDetailResponseType>(`/user/${id}`)
    return response.data.data
  } catch (error) {
    throw error
  }
}

export const updateUser = async (data: UserUpdateInputType) => {
  try {
    const { id, name, email, is_active, created_at, ...dataRequest } = data
    const cleanedRequest = clearObjRequest({
      ...dataRequest,
    })

    const response = await request.put(`/user/${id}`, {
      ...cleanedRequest,
    })
    return response.data
  } catch (error) {
    throw error
  }
}

export const getUserDetail = async ({ column, sort_by, userId }: QueryInputUserDetailType) => {
  try {
    const response = await request.get<UserDetailResponseType>(`/user/${userId}`, {
      params: {
        sort_by,
        column,
      },
    })
    return response.data.data
  } catch (error) {
    throw error
  }
}

export const deleteUser = async (userId: string) => {
  try {
    const response = await request.delete(`/user/${userId}`)
    return response.data
  } catch (error) {
    throw error
  }
}
