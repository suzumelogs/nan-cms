import { PaginationType } from '@/libs/types/pagination'
import { TypeOf, z } from 'zod'

const MAX_FILE_SIZE = 5000000
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

export type CategoryType = {
  _id?: string
  name?: string
  url?: string
  createdAt?: string
  updatedAt?: string
}

export type CategorySearchInputType = PaginationType & {
  filter?: string
  page?: string
  next?: string
}

export type CategoryListQueryInputType = CategorySearchInputType & {
  column?: string
  sortBy?: 'asc' | 'desc'
}

export type CategoryListType = {
  data: CategoryType[]
  pagination: PaginationType
} & PaginationType

export type CategoryDetailType = {
  _id?: string
  name?: string
  url?: string
  createdAt?: string
  updatedAt?: string
}

export type CategoryDetailResponseType = {
  data: CategoryDetailType
}

export type QueryInputCategoryDetailType = {
  categoryId?: string
  sortBy?: string
  column?: string
}

export const CategoryCreateInputSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Tên danh mục là bắt buộc' })
    .max(100, { message: 'Tên danh mục không được dài quá 100 ký tự' }),
  url: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
})

export const CategoryUpdateInputSchema = CategoryCreateInputSchema.extend({
  _id: z.string().min(1, { message: 'ID sách là bắt buộc' }),
})

export type CategoryCreateInputType = TypeOf<typeof CategoryCreateInputSchema>
export type CategoryUpdateInputType = TypeOf<typeof CategoryUpdateInputSchema>
