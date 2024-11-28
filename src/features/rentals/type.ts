import { PaginationType } from '@/libs/types/pagination'
import { TypeOf, z } from 'zod'

export type RentalType = {
  id: string
  userId: string
  totalAmount?: number
  startDate?: string
  endDate?: string
  status: RentalStatusType
  feedbacks?: string[]
  items?: RentalItemType[]
  createdAt?: string
  updatedAt?: string
}

export type RentalDetailType = {
  id?: string
  userId?: string
  totalAmount?: number
  startDate?: string
  endDate?: string
  status?: RentalStatusType
  feedbacks?: string[]
  items?: RentalItemType[]
  createdAt?: string
  updatedAt?: string
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

export type RentalStatusType = 'pending' | 'active' | 'completed' | 'canceled'

export type RentalItemType = {
  id: string
  name: string
  description?: string
  quantity: number
}

export const RentalCreateInputSchema = z.object({
  userId: z.string().min(1, { message: 'User ID là bắt buộc' }),
  totalAmount: z.number().positive({ message: 'Số tiền phải lớn hơn 0' }).optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  status: z.enum(['pending', 'active', 'completed', 'canceled']).optional(),
  items: z
    .array(
      z.object({
        id: z.string().min(1, { message: 'ID của mục là bắt buộc' }),
        name: z.string().min(1, { message: 'Tên của mục là bắt buộc' }),
        description: z.string().optional(),
        quantity: z.number().min(1, { message: 'Số lượng phải ít nhất là 1' }),
      }),
    )
    .optional(),
  feedbacks: z.array(z.string()).optional(),
})

export const RentalUpdateInputSchema = RentalCreateInputSchema.extend({
  id: z.string().min(1, { message: 'ID Rental là bắt buộc' }),
})

export type RentalCreateInputType = TypeOf<typeof RentalCreateInputSchema>

export type RentalUpdateInputType = TypeOf<typeof RentalUpdateInputSchema>
