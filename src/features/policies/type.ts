import { PaginationType } from '@/libs/types/pagination'
import { TypeOf, z } from 'zod'

export type PolicyType = {
  id: string
  description: string
  depositRate: number
  damageProcessingFee: number
  createdAt?: string
  updatedAt?: string
}

export type PolicyDetailType = {
  id?: string
  description?: string
  depositRate?: number
  damageProcessingFee?: number
  createdAt?: string
  updatedAt?: string
}

export type PolicyListType = {
  data: PolicyType[]
} & PaginationType

export type PolicySearchInputType = PaginationType & {
  damageProcessingFee?: string
  page?: string
  next?: string
}

export type PolicyListQueryInputType = PolicySearchInputType & {
  column?: string
  sortBy?: 'asc' | 'desc'
}

export type PolicyDetailResponseType = {
  data: PolicyDetailType
}

export type QueryInputPolicyDetailType = {
  policyId?: string
  sortBy?: string
  column?: string
}

export const PolicyCreateInputSchema = z.object({
  description: z
    .string()
    .min(1, { message: 'Mô tả chính sách là bắt buộc' })
    .max(1000, { message: 'Mô tả không được dài quá 1000 ký tự' }),
  depositRate: z
    .number()
    .min(0, { message: 'Tỷ lệ đặt cọc phải lớn hơn hoặc bằng 0' })
    .max(100, { message: 'Tỷ lệ đặt cọc không thể lớn hơn 100' }),
  damageProcessingFee: z
    .number()
    .min(0, { message: 'Phí xử lý hỏng hóc phải lớn hơn hoặc bằng 0' }),
})

export const PolicyUpdateInputSchema = PolicyCreateInputSchema.extend({
  id: z.string().min(1, { message: 'ID chính sách là bắt buộc' }),
})

export type PolicyCreateInputType = TypeOf<typeof PolicyCreateInputSchema>

export type PolicyUpdateInputType = TypeOf<typeof PolicyUpdateInputSchema>
