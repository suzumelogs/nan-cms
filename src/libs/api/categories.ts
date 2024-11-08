import {
  CategoryCreateInputType,
  CategoryDetailResponseType,
  CategoryListQueryInputType,
  CategoryListType,
  CategoryUpdateInputType,
  QueryInputCategoryDetailType,
} from '@/features/categories'
import request from '../config/axios'

const formData = (data: CategoryCreateInputType | CategoryUpdateInputType | any): FormData => {
  const formData = new FormData()
  if ('name' in data) formData.append('name', data.name as string)
  if ('url' in data && data.url) formData.append('url', data.url)
  if ('file' in data && data.file) formData.append('file', data.file)
  return formData
}

export const getListCategories = async (params: CategoryListQueryInputType) => {
  const { page, limit, filter } = params
  try {
    const response = await request.get<CategoryListType>('/categories', {
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

export const getCategory = async (_id: string) => {
  try {
    const response = await request.get<CategoryDetailResponseType>(`/categories/${_id}`)
    return response.data.data
  } catch (error) {
    throw error
  }
}

export const createCategory = async (data: CategoryCreateInputType) => {
  try {
    const response = await request.post('/categories', data)
    return response.data
  } catch (error) {
    throw error
  }
}

export const updateCategory = async (data: CategoryUpdateInputType) => {
  try {
    const { _id, ...dataRequest } = data
    const response = await request.patch(`/categories/${_id}`, dataRequest)
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
