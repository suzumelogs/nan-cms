import { PaginationType } from '@/libs/types/pagination'
import { TypeOf, z } from 'zod'

export type MaintenanceType = {
  id: string
  maintenanceDate: string
  description?: string
  suggestedNextMaintenance?: string
  status: 'pending' | 'completed'
  maintenanceCost?: number
  equipmentId: string
  createdAt?: string
  updatedAt?: string
}

export type MaintenanceDetailType = {
  id?: string
  maintenanceDate?: string
  description?: string
  suggestedNextMaintenance?: string
  status?: 'pending' | 'completed'
  maintenanceCost?: number
  equipmentId?: string
  createdAt?: string
  updatedAt?: string
}

export type MaintenanceListType = {
  data: MaintenanceType[]
} & PaginationType

export type MaintenanceSearchInputType = PaginationType & {
  filter?: string
  page?: string
  next?: string
}

export type MaintenanceListQueryInputType = MaintenanceSearchInputType & {
  column?: string
  sortBy?: 'asc' | 'desc'
}

export type MaintenanceDetailResponseType = {
  data: MaintenanceDetailType
}

export type QueryInputMaintenanceDetailType = {
  maintenanceId?: string
  sortBy?: string
  column?: string
}

export const MaintenanceCreateInputSchema = z.object({
  maintenanceDate: z.string().min(1, { message: 'Ngày bảo trì là bắt buộc' }),
  description: z.string().max(1000, { message: 'Mô tả không được dài quá 1000 ký tự' }).optional(),
  suggestedNextMaintenance: z.string().optional(),
  status: z.enum(['pending', 'completed']).default('pending'),
  maintenanceCost: z.number().positive({ message: 'Chi phí bảo trì phải là số dương' }).optional(),
  equipmentId: z.string().min(1, { message: 'ID thiết bị là bắt buộc' }),
})

export const MaintenanceUpdateInputSchema = MaintenanceCreateInputSchema.extend({
  id: z.string().min(1, { message: 'ID bảo trì là bắt buộc' }),
})

export type MaintenanceCreateInputType = TypeOf<typeof MaintenanceCreateInputSchema>

export type MaintenanceUpdateInputType = TypeOf<typeof MaintenanceUpdateInputSchema>
