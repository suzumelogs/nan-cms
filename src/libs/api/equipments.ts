import { EquipmentListQueryInputType, EquipmentListType } from '@/features/equipments'
import request from '../config/axios'

export const getListEquipments = async (params: EquipmentListQueryInputType) => {
  const { page, limit, filter } = params
  try {
    const response = await request.get<EquipmentListType>('/equipments/all/pagination', {
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
