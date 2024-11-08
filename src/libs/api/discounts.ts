import { DiscountInputType, DiscountResponseType } from '@/features/discounts/type'
import request from '../config/axios'
import { PaginationType } from '../types/pagination'

export const getDiscounts = async (params: PaginationType) => {
  const response = await request.get<DiscountResponseType>('/discount/pagination', { params })

  return response.data
}

export const createDiscount = async (data: DiscountInputType) => {
  const response = await request.post('/discount', data)

  return response.data
}
