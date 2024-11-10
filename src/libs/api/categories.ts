import {
  CategoryCreateInputType,
  CategoryDetailResponseType,
  CategoryListQueryInputType,
  CategoryListType,
  CategoryUpdateInputType,
  QueryInputCategoryDetailType,
} from '@/features/categories'
import request from '../config/axios'

export const getListCategories = async (params: CategoryListQueryInputType) => {
  const { page, limit, filter } = params
  try {
    const response = await request.get<CategoryListType>('/categories/pagination', {
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

export const getCategory = async (id: string) => {
  try {
    const response = await request.get<CategoryDetailResponseType>(`/categories/${id}`)
    return response.data.data
  } catch (error) {
    throw error
  }
}

export const createCategory = async (data: CategoryCreateInputType) => {
  const categoryData = {
    ...data,
    priceDay: Number(data.priceDay),
    priceMonth: Number(data.priceMonth),
    priceWeek: Number(data.priceWeek),
  }

  try {
    const response = await request.post('/categories', categoryData)
    return response.data
  } catch (error) {
    throw error
  }
}

export const updateCategory = async (data: CategoryUpdateInputType) => {
  try {
    const { id, ...dataRequest } = data

    console.log(data)

    const updatedData = {
      ...dataRequest,
      priceDay: dataRequest.priceDay ? Number(dataRequest.priceDay) : 0,
      priceMonth: dataRequest.priceMonth ? Number(dataRequest.priceMonth) : 0,
      priceWeek: dataRequest.priceWeek ? Number(dataRequest.priceWeek) : 0,
    }

    console.log(updatedData)

    const response = await request.patch(`/categories/${id}`, updatedData)
    return response.data
  } catch (error) {
    throw error
  }
}

export const getCategoryDetail = async ({ column, categoryId }: QueryInputCategoryDetailType) => {
  try {
    const response = await request.get<CategoryDetailResponseType>(`/categories/${categoryId}`, {
      params: {
        column,
      },
    })
    return response.data.data
  } catch (error) {
    throw error
  }
}

export const deleteCategory = async (categoryId: string) => {
  try {
    const response = await request.delete(`/categories/${categoryId}`)
    return response.data
  } catch (error) {
    throw error
  }
}

export const getCategoryValueLabels = async () => {
  try {
    const response = await request.get('/categories/value-labels/category')
    return response.data
  } catch (error) {
    throw error
  }
}
