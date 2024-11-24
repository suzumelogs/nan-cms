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
    const response = await request.get<CategoryListType>('/categories/all/pagination', {
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
    const response = await request.get<CategoryDetailResponseType>(`/categories/get-by/${id}`)
    return response.data.data
  } catch (error) {
    throw error
  }
}

export const createCategory = async (data: CategoryCreateInputType) => {
  const categoryData = {
    ...data,
  }

  try {
    const response = await request.post('/categories/create', categoryData)
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
    }

    const response = await request.patch(`/categories/update/${id}`, updatedData)
    return response.data
  } catch (error) {
    throw error
  }
}

export const getCategoryDetail = async ({ column, categoryId }: QueryInputCategoryDetailType) => {
  try {
    const response = await request.get<CategoryDetailResponseType>(
      `/categories/get-by/${categoryId}`,
      {
        params: {
          column,
        },
      },
    )
    return response.data.data
  } catch (error) {
    throw error
  }
}

export const deleteCategory = async (categoryId: string) => {
  try {
    const response = await request.delete(`/categories/remove/${categoryId}`)
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
