import { PaginationType } from '@/libs/types/pagination'
import { TypeOf, z } from 'zod'

export enum RentalStatus {
  pending = 'pending',
  confirmed = 'confirmed',
  completed = 'completed',
  canceled = 'canceled',
}

export type RentalType = {
  id: string
  rentalStartDate: string
  rentalEndDate: string
  totalPrice: number
  depositAmount: number
  damageFee?: number
  status: RentalStatus
  userId: string
  deviceId: string
  createdAt?: string
  updatedAt?: string
}

export type RentalDetailType = {
  id: string
  rentalStartDate: string
  rentalEndDate: string
  totalPrice: string
  depositAmount: string
  damageFee?: string
  status: string
  userId: string
  deviceId: string
  createdAt: string
  updatedAt: string
}

export type RentalListType = {
  data: RentalType[]
} & PaginationType

export type RentalSearchInputType = PaginationType & {
  filter?: string
  page?: string
  next?: string
}

export type RentalListQueryInputType = RentalSearchInputType & {
  column?: string
  sortBy?: 'asc' | 'desc'
}

export type RentalDetailResponseType = {
  data: RentalDetailType
}

export type QueryInputRentalDetailType = {
  rentalId?: string
  sortBy?: string
  column?: string
}

export const RentalCreateInputSchema = z.object({
  rentalStartDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Ngày bắt đầu thuê phải hợp lệ',
  }),
  rentalEndDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Ngày kết thúc thuê phải hợp lệ',
  }),
  totalPrice: z.number().min(0, { message: 'Tổng giá phải lớn hơn hoặc bằng 0' }).optional(),
  depositAmount: z.number().min(0, { message: 'Tiền đặt cọc phải lớn hơn hoặc bằng 0' }).optional(),
  damageFee: z.number().min(0, { message: 'Phí hỏng hóc phải lớn hơn hoặc bằng 0' }).optional(),
  status: z.nativeEnum(RentalStatus).default(RentalStatus.pending),
  userId: z.string().min(1, { message: 'ID người dùng là bắt buộc' }),
  deviceId: z.string().min(1, { message: 'ID thiết bị là bắt buộc' }),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
})

export const RentalUpdateInputSchema = RentalCreateInputSchema.extend({
  id: z.string().min(1, { message: 'ID thuê là bắt buộc' }),
})

export type RentalCreateInputType = TypeOf<typeof RentalCreateInputSchema>
export type RentalUpdateInputType = TypeOf<typeof RentalUpdateInputSchema>
