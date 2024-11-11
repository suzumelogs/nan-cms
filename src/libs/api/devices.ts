import { DeviceListQueryInputType, DeviceListType } from '@/features/devices'
import request from '../config/axios'

export const getListDevices = async (params: DeviceListQueryInputType) => {
  const { page, limit, filter } = params
  try {
    const response = await request.get<DeviceListType>('/device/pagination', {
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
