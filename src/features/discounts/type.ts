import { PaginationType } from '@/libs/types/pagination'
import { z } from 'zod'

export type DiscountType = {
  id: string
  code: string
  discountRate: number
  validFrom: string
  validTo: string
  maxUsage: number
  currentUsage: number
  createdAt: string
  updatedAt: string
}

export type DiscountResponseType = {
  data: DiscountType[]
} & PaginationType

export const DiscountInputSchema = z.object({
  code: z.string().nonempty({ message: 'Mã giảm giá không được để trống' }),
  discountRate: z
    .string()
    .refine((val) => /^\d+$/.test(val) && +val >= 1 && +val <= 100, {
      message: 'Tỷ lệ giảm giá phải là số nguyên từ 1 đến 100',
    })
    .or(z.number()),
  validFrom: z
    .string()
    .refine((date) => !isNaN(Date.parse(date)), { message: 'Ngày bắt đầu không hợp lệ' })
    .or(z.date()),
  validTo: z
    .string()
    .refine((date) => !isNaN(Date.parse(date)), { message: 'Ngày kết thúc không hợp lệ' })
    .or(z.date()),
  maxUsage: z
    .string()
    .refine((val) => /^\d+$/.test(val) && +val >= 1, {
      message: 'Số lần sử dụng tối đa phải là số nguyên lớn hơn 0',
    })
    .or(z.number()),
})

export type DiscountInputType = z.infer<typeof DiscountInputSchema>
