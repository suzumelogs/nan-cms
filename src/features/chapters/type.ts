import { PaginationType } from '@/libs/types/pagination'
import { TypeOf, z } from 'zod'

export type ChapterType = {
  _id?: string
  name?: string
  description?: string
  url?: string
  isPremium?: string | boolean
  bookId?: string
  createdAt?: string
  updatedAt?: string
}

export type ChapterSearchInputType = PaginationType & {
  filter?: string
  page?: string
  next?: string
}

export type ChapterListQueryInputType = ChapterSearchInputType & {
  column?: string
  sortBy?: 'asc' | 'desc'
}

export type ChapterListType = {
  data: ChapterType[]
  pagination: PaginationType
} & PaginationType

export type ChapterDetailType = {
  _id?: string
  name?: string
  description?: string
  url?: string | undefined
  isPremium?: string | boolean
  bookId?: string
  createdAt?: string
  updatedAt?: string
}

export type ChapterDetailResponseType = {
  data: ChapterDetailType
}

export type QueryInputChapterDetailType = {
  chapterId?: string
  sortBy?: string
  column?: string
}

export const ChapterCreateInputSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Tên chương là bắt buộc' })
    .max(100, { message: 'Tên chương không được dài quá 100 ký tự' }),
  description: z
    .string()
    .min(1, { message: 'Mô tả là bắt buộc' })
    .max(500, { message: 'Mô tả không được dài quá 500 ký tự' }),
  url: z.string().optional(),
  isPremium: z.boolean().optional(),
  bookId: z
    .string()
    .min(1, { message: 'Mã sách là bắt buộc' })
    .length(24, { message: 'bookId phải có độ dài 24 ký tự' })
    .regex(/^[0-9a-fA-F]{24}$/, { message: 'Mã sách phải là một ObjectId hợp lệ' }),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
})

export const ChapterUpdateInputSchema = ChapterCreateInputSchema.extend({
  _id: z.string().min(1, { message: 'ID chương là bắt buộc' }),
})

export type ChapterCreateInputType = TypeOf<typeof ChapterCreateInputSchema>
export type ChapterUpdateInputType = TypeOf<typeof ChapterUpdateInputSchema>
