import { PaginationType } from '@/libs/types/pagination'
import { TypeOf, z } from 'zod'

export type DiscountType = {
  id: string
  code: string
  discountRate: number
  validFrom: string
  validTo: string
  maxUsage: number
  currentUsage: number
  createdAt?: string
  updatedAt?: string
}

export type DiscountDetailType = {
  id: string
  code: string
  discountRate: number
  validFrom: string
  validTo: string
  maxUsage: number
  currentUsage: number
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

export type DiscountDetailResponseType = {
  data: DiscountDetailType
}

export type QueryInputDiscountDetailType = {
  discountId: string
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
    .min(0, { message: 'Tỷ lệ giảm giá phải là số dương' })
    .max(100, { message: 'Tỷ lệ giảm giá không được quá 100%' }),
  validFrom: z.string().min(1, { message: 'Ngày bắt đầu hiệu lực là bắt buộc' }),
  validTo: z.string().min(1, { message: 'Ngày kết thúc hiệu lực là bắt buộc' }),
  maxUsage: z.number().min(1, { message: 'Số lần sử dụng tối đa phải là số dương' }),
  currentUsage: z.number().min(0, { message: 'Số lần sử dụng hiện tại không được âm' }).optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
})

export const DiscountUpdateInputSchema = DiscountCreateInputSchema.extend({
  id: z.string().min(1, { message: 'ID giảm giá là bắt buộc' }),
})

export type DiscountCreateInputType = TypeOf<typeof DiscountCreateInputSchema>
export type DiscountUpdateInputType = TypeOf<typeof DiscountUpdateInputSchema>
