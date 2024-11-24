import { PolicyListQueryInputType, PolicyListType } from '@/features/policies'
import request from '../config/axios'

export const getListPolicies = async (params: PolicyListQueryInputType) => {
  const { page, limit, filter } = params
  try {
    const response = await request.get<PolicyListType>('/policy/all/pagination', {
      params: {
        page,
        limit,
        filter,
      },
    })
    return response.data
  } catch (error) {
    throw error
  }
}
