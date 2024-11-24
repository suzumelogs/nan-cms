import request from '../config/axios'

export const getListMaintenances = async (params: any) => {
  const { page, limit, filter } = params
  try {
    const response = await request.get<any>('/maintenances/all/pagination', {
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
