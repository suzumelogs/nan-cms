import {
  BookCreateInputType,
  BookDetailResponseType,
  BookListQueryInputType,
  BookListType,
  BookUpdateInputType,
  QueryInputBookDetailType,
} from '@/features/books'
import request from '../config/axios'

const formData = (data: BookCreateInputType | BookUpdateInputType | any): FormData => {
  const formData = new FormData()
  if ('name' in data) formData.append('name', data.name as string)
  if ('author' in data) formData.append('author', data.author as string)
  if ('description' in data) formData.append('description', data.description as string)
  if ('isPremium' in data) formData.append('isPremium', data.isPremium)
  if ('url' in data && data.url) formData.append('url', data.url)
  if ('file' in data && data.file) formData.append('file', data.file)
  if ('categoryId' in data && data.categoryId) formData.append('categoryId', data.categoryId)
  return formData
}

export const getListBooks = async (params: BookListQueryInputType) => {
  const { page, limit, filter } = params
  try {
    const response = await request.get<BookListType>('/books', {
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

export const getBook = async (_id: string) => {
  try {
    const response = await request.get<BookDetailResponseType>(`/books/${_id}`)
    return response.data.data
  } catch (error) {
    throw error
  }
}

export const createBook = async (data: BookCreateInputType) => {
  try {
    const response = await request.post('/books', data)
    return response.data
  } catch (error) {
    throw error
  }
}

export const updateBook = async (data: BookUpdateInputType) => {
  try {
    const { _id, ...dataRequest } = data
    const formDataReq = formData(dataRequest)
    const response = await request.patch(`/books/${_id}`, dataRequest)
    return response.data
  } catch (error) {
    throw error
  }
}

export const getBookDetail = async ({ column, bookId }: QueryInputBookDetailType) => {
  try {
    const response = await request.get<BookDetailResponseType>(`/books/${bookId}`, {
      params: {
        column,
      },
    })
    return response.data.data
  } catch (error) {
    throw error
  }
}

export const deleteBook = async (bookId: string) => {
  try {
    const response = await request.delete(`/books/${bookId}`)
    return response.data
  } catch (error) {
    throw error
  }
}

export const getBookValueLabels = async () => {
  try {
    const response = await request.get('/books/value-labels/book')
    return response.data
  } catch (error) {
    throw error
  }
}

export const updateTop10YearBook = async (bookId: string) => {
  try {
    const response = await request.patch(`/books/${bookId}/update/is-top-10-year`)
    return response.data
  } catch (error) {
    throw error
  }
}
