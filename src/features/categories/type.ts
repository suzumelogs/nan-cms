import { PaginationType } from '@/libs/types/pagination'
import { TypeOf, z } from 'zod'

export type CategoryType = {
  id: string
  name: string
  description?: string
  priceDay?: number
  priceWeek?: number
  priceMonth?: number
  createdAt?: string
  updatedAt?: string
}

export type CategoryDetailType = {
  id?: string
  name?: string
  description?: string
  priceDay?: string
  priceWeek?: string
  priceMonth?: string
  createdAt?: string
  updatedAt?: string
}

export type CategoryListType = {
  data: CategoryType[]
} & PaginationType

export type CategorySearchInputType = PaginationType & {
  filter?: string
  page?: string
  next?: string
}

export type CategoryListQueryInputType = CategorySearchInputType & {
  column?: string
  sortBy?: 'asc' | 'desc'
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
    .min(1, { message: 'Tên gói là bắt buộc' })
    .max(100, { message: 'Tên gói không được dài quá 100 ký tự' }),
  description: z
    .string()
    .min(1, { message: 'Mô tả là bắt buộc' })
    .max(500, { message: 'Mô tả không được dài quá 500 ký tự' }),
  priceDay: z.string().min(0, { message: 'Giá theo ngày là bắt buộc' }).optional().or(z.number()),
  priceWeek: z.string().min(0, { message: 'Giá theo tuần là bắt buộc' }).optional().or(z.number()),
  priceMonth: z
    .string()
    .min(0, { message: 'Giá theo tháng là bắt buộc' })
    .optional()
    .or(z.number()),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
})

export const CategoryUpdateInputSchema = CategoryCreateInputSchema.extend({
  id: z.string().min(1, { message: 'ID gói là bắt buộc' }),
})

export type CategoryCreateInputType = TypeOf<typeof CategoryCreateInputSchema>
export type CategoryUpdateInputType = TypeOf<typeof CategoryUpdateInputSchema>
