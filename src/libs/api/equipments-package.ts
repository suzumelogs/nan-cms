import {
  EquipmentPackageListQueryInputType,
  EquipmentPackageListType,
} from '@/features/equipment-packages'
import request from '../config/axios'

export const getListEquipmentsPackage = async (params: EquipmentPackageListQueryInputType) => {
  const { page, limit, filter } = params
  try {
    const response = await request.get<EquipmentPackageListType>(
      '/equipments-package/all/pagination',
      {
        params: {
          page,
          limit,
          filter,
        },
      },
    )
    return response.data
  } catch (error) {
    throw error
  }
}
