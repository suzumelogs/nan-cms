import { RentalListQueryInputType, RentalListType } from '@/features/rentals'
import request from '../config/axios'

export const getListRentals = async (params: RentalListQueryInputType) => {
  const { page, limit, filter } = params
  try {
    const response = await request.get<RentalListType>('/rental/pagination', {
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
