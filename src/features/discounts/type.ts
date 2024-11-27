import { PaginationType } from '@/libs/types/pagination'
import { TypeOf, z } from 'zod'

// --- Discount Types ---

export type DiscountType = {
  id: string
  code: string
  discountRate: number
  validFrom: string
  validTo: string
  maxUsage: number
  currentUsage: number
  isActive: boolean
  createdAt?: string
  updatedAt?: string
}

export type DiscountDetailType = {
  id?: string
  code?: string
  discountRate?: number
  validFrom?: string
  validTo?: string
  maxUsage?: number
  currentUsage?: number
  isActive?: boolean
  createdAt?: string
  updatedAt?: string
}

export type DiscountListType = {
  data: DiscountType[]
} & PaginationType

export type DiscountSearchInputType = PaginationType & {
  filter?: string
  page?: string
  next?: string
}

export type DiscountListQueryInputType = DiscountSearchInputType & {
  column?: string
  sortBy?: 'asc' | 'desc'
}

export type DiscountDetailResponseType = {
  data: DiscountDetailType
}

export type QueryInputDiscountDetailType = {
  discountId?: string
  sortBy?: string
  column?: string
}

export const DiscountCreateInputSchema = z.object({
  code: z
    .string()
    .min(1, { message: 'Mã giảm giá là bắt buộc' })
    .max(50, { message: 'Mã giảm giá không được dài quá 50 ký tự' }),
  discountRate: z
    .number()
    .min(0, { message: 'Tỷ lệ giảm giá phải lớn hơn hoặc bằng 0' })
    .max(100, { message: 'Tỷ lệ giảm giá không được vượt quá 100%' }),
  validFrom: z.string().min(1, { message: 'Ngày bắt đầu là bắt buộc' }),
  validTo: z.string().min(1, { message: 'Ngày kết thúc là bắt buộc' }),
  maxUsage: z.number().min(1, { message: 'Số lần sử dụng tối đa phải lớn hơn hoặc bằng 1' }),
  currentUsage: z.number().min(0, { message: 'Số lần sử dụng hiện tại phải lớn hơn hoặc bằng 0' }),
  isActive: z.boolean().default(true),
})

export const DiscountUpdateInputSchema = DiscountCreateInputSchema.extend({
  id: z.string().min(1, { message: 'ID giảm giá là bắt buộc' }),
})

export type DiscountCreateInputType = TypeOf<typeof DiscountCreateInputSchema>

export type DiscountUpdateInputType = TypeOf<typeof DiscountUpdateInputSchema>
