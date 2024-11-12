import request from '../config/axios'

export const getListDiscounts = async (params: any) => {
  const { page, limit, filter } = params
  try {
    const response = await request.get<any>('/discount/pagination', {
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
