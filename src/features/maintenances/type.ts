import { PaginationType } from '@/libs/types/pagination'
import { TypeOf, z } from 'zod'

export enum MaintenanceStatus {
  pending = 'pending',
  completed = 'completed',
}

export type MaintenanceType = {
  id: string
  maintenanceDate: string
  description?: string
  suggestedNextMaintenance?: string
  status: MaintenanceStatus
  maintenanceCost?: number
  deviceId: string
  createdAt?: string
  updatedAt?: string
}

export type MaintenanceDetailType = {
  id: string
  maintenanceDate: string
  description?: string
  suggestedNextMaintenance?: string
  status: MaintenanceStatus
  maintenanceCost?: number
  deviceId: string
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

export type MaintenanceDetailResponseType = {
  data: MaintenanceDetailType
}

export type QueryInputMaintenanceDetailType = {
  maintenanceId: string
  sortBy?: string
  column?: string
}

export const MaintenanceCreateInputSchema = z.object({
  maintenanceDate: z.string().min(1, { message: 'Ngày bảo trì là bắt buộc' }),
  description: z.string().max(500, { message: 'Mô tả không được dài quá 500 ký tự' }).optional(),
  suggestedNextMaintenance: z.string().optional(),
  status: z.nativeEnum(MaintenanceStatus).default(MaintenanceStatus.pending),
  maintenanceCost: z.number().min(0, { message: 'Chi phí bảo trì phải là số dương' }).optional(),
  deviceId: z.string().min(1, { message: 'ID thiết bị là bắt buộc' }),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
})

export const MaintenanceUpdateInputSchema = MaintenanceCreateInputSchema.extend({
  id: z.string().min(1, { message: 'ID bảo trì là bắt buộc' }),
})

export type MaintenanceCreateInputType = TypeOf<typeof MaintenanceCreateInputSchema>
export type MaintenanceUpdateInputType = TypeOf<typeof MaintenanceUpdateInputSchema>
