import { PaginationType } from '@/libs/types/pagination'
import { TypeOf, z } from 'zod'

export type UsageRecordType = {
  id: string
  equipmentId: string
  usageDate: string
  usageDuration?: number
  usageCost?: number
  status?: string
  createdAt?: string
  updatedAt?: string
}

export type UsageRecordDetailType = {
  id?: string
  equipmentId?: string
  usageDate?: string
  usageDuration?: number
  usageCost?: number
  status?: string
  createdAt?: string
  updatedAt?: string
}

export type UsageRecordListType = {
  data: UsageRecordType[]
} & PaginationType

export type UsageRecordSearchInputType = PaginationType & {
  filter?: string
  page?: string
  next?: string
}

export type UsageRecordListQueryInputType = UsageRecordSearchInputType & {
  column?: string
  sortBy?: 'asc' | 'desc'
}

export type UsageRecordDetailResponseType = {
  data: UsageRecordDetailType
}

export type QueryInputUsageRecordDetailType = {
  usageRecordId?: string
  sortBy?: string
  column?: string
}

export const UsageRecordCreateInputSchema = z.object({
  equipmentId: z.string().min(1, { message: 'ID thiết bị là bắt buộc' }),
  usageDate: z.string().min(1, { message: 'Ngày sử dụng là bắt buộc' }),
  usageDuration: z.number().optional(),
  usageCost: z.number().optional(),
  status: z.string().optional(),
})

export const UsageRecordUpdateInputSchema = UsageRecordCreateInputSchema.extend({
  id: z.string().min(1, { message: 'ID bản ghi sử dụng là bắt buộc' }),
})

export type UsageRecordCreateInputType = TypeOf<typeof UsageRecordCreateInputSchema>
export type UsageRecordUpdateInputType = TypeOf<typeof UsageRecordUpdateInputSchema>
