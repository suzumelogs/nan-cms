'use client'

import { DetailItem } from '@/features/article/components'
import { Header } from '@/libs/components/Form/Layout/Header'
import { Modal } from '@/libs/components/Modal'
import { formatDate } from '@/utils/format'
import { Box, Stack } from '@mui/material'
import { useParams, useRouter } from 'next/navigation'
import { enqueueSnackbar } from 'notistack'
import { useState } from 'react'
import { useCategoryDetailQuery, useDeleteCategory } from '../hooks'

const CategoryDetail = () => {
  const { categoriesId } = useParams()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const { deleteCategory } = useDeleteCategory()

  const handleOpenModal = () => setOpen(true)
  const handleCloseModal = () => setOpen(false)

  const handleDeleteCartegory = () => {
    deleteCategory(categoriesId as string, {
      onSuccess: () => {
        enqueueSnackbar('Xoá gói thành công', { variant: 'success' })
        router.push('/categories')
      },
    })
  }

  const { data, isLoading } = useCategoryDetailQuery(categoriesId as string)

  const formatCurrency = (value?: number | string) =>
    value !== undefined
      ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
          value as number,
        )
      : ''

  return (
    <Stack spacing={4}>
      <Header title="Chi tiết gói" editPath="edit" deleteFunction={handleOpenModal} />

      <Box>
        <Stack spacing={2}>
          <DetailItem label="ID" value={data?.id} isPending={isLoading} />
          <DetailItem label="Tên gói" value={data?.name} isPending={isLoading} />
          <DetailItem
            label="Ngày tạo"
            value={formatDate(data?.createdAt as string)}
            isPending={isLoading}
          />
          <DetailItem
            label="Ngày cập nhật"
            value={formatDate(data?.updatedAt as string)}
            isPending={isLoading}
          />
          <DetailItem
            label="Giá theo ngày"
            value={formatCurrency(data?.priceDay)}
            isPending={isLoading}
          />
          <DetailItem
            label="Giá theo tuần"
            value={formatCurrency(data?.priceWeek)}
            isPending={isLoading}
          />
          <DetailItem
            label="Giá theo tháng"
            value={formatCurrency(data?.priceMonth)}
            isPending={isLoading}
          />
        </Stack>
      </Box>

      <Modal
        handleCloseModal={handleCloseModal}
        open={open}
        handleSubmit={handleDeleteCartegory}
        textSubmit="Đồng ý"
        description="Bạn có thực sự muốn xóa gói này?"
        title="Xóa gói"
      />
    </Stack>
  )
}

export { CategoryDetail }
