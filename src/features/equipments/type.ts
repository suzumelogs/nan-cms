import { PaginationType } from '@/libs/types/pagination'
import { TypeOf, z } from 'zod'

export type EquipmentType = {
  id: string
  name: string
  image: string
  description?: string
  pricePerDay?: number
  pricePerWeek?: number
  pricePerMonth?: number
  stock?: number
  categoryId: string
  category?: string
  createdAt?: string
  updatedAt?: string
}

export type EquipmentDetailType = EquipmentType & {
  cartItems?: string[]
  rentalItems?: string[]
  packages?: string[]
  maintenances?: string[]
}

export type EquipmentListType = {
  data: EquipmentType[]
} & PaginationType

export type EquipmentSearchInputType = PaginationType & {
  filter?: string
  categoryId?: string
}

export type EquipmentListQueryInputType = EquipmentSearchInputType & {
  sortBy?: 'asc' | 'desc'
}

export type EquipmentDetailResponseType = {
  data: EquipmentDetailType
}

export type QueryInputEquipmentDetailType = {
  equipmentId?: string
  column?: string
}

export const EquipmentCreateInputSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Tên thiết bị là bắt buộc' })
    .max(100, { message: 'Tên thiết bị không được dài quá 100 ký tự' }),
  image: z.string().url({ message: 'Hình ảnh phải là một URL hợp lệ' }),
  description: z.string().max(1000, { message: 'Mô tả không được dài quá 1000 ký tự' }).optional(),
  pricePerDay: z.number().positive({ message: 'Giá theo ngày phải là số dương' }).optional(),
  pricePerWeek: z.number().positive({ message: 'Giá theo tuần phải là số dương' }).optional(),
  pricePerMonth: z.number().positive({ message: 'Giá theo tháng phải là số dương' }).optional(),
  stock: z.number().int().positive({ message: 'Số lượng phải là số nguyên dương' }).optional(),
  categoryId: z.string().min(1, { message: 'ID danh mục là bắt buộc' }),
})

export const EquipmentUpdateInputSchema = EquipmentCreateInputSchema.extend({
  id: z.string().min(1, { message: 'ID thiết bị là bắt buộc' }),
})

export type EquipmentCreateInputType = TypeOf<typeof EquipmentCreateInputSchema>
export type EquipmentUpdateInputType = TypeOf<typeof EquipmentUpdateInputSchema>
