'use client'

import { DetailItem } from '@/features/article/components'
import { useDeletePolicy } from '@/features/policies/hooks'
import { Header } from '@/libs/components/Form/Layout/Header'
import { Modal } from '@/libs/components/Modal'
import { Box, Stack } from '@mui/material'
import { useParams, useRouter } from 'next/navigation'
import { enqueueSnackbar } from 'notistack'
import { useState } from 'react'
import { useDamageReportDetail } from '../hooks'

const DamageReportDetail = () => {
  const { id } = useParams()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const { deletePolicy } = useDeletePolicy()

  const handleOpenModal = () => setOpen(true)
  const handleCloseModal = () => setOpen(false)

  const handleDeletePolicy = () => {
    deletePolicy(id as string, {
      onSuccess: () => {
        enqueueSnackbar('Xoá chính sách thành công', { variant: 'success' })
        router.push('/policies')
      },
    })
  }

  const { data, isLoading } = useDamageReportDetail(id as string)

  return (
    <Stack spacing={4}>
      <Header title="Chi tiết" />
      <Box>
        <Stack spacing={2}>
          <DetailItem label="ID" value={data?.id} isPending={isLoading} />
          <DetailItem label="Mô tả chính sách" value={data?.description} isPending={isLoading} />
          <DetailItem label="Trạng thái" value={data?.status} isPending={isLoading} />
          <DetailItem
            label="Ảnh"
            image={{
              src: data?.image as string,
              alt: 'Ảnh hỏng hóc',
            }}
            isPending={isLoading}
          />
        </Stack>
      </Box>
      <Modal
        handleCloseModal={handleCloseModal}
        open={open}
        handleSubmit={handleDeletePolicy}
        textSubmit="Đồng ý"
        description="Bạn có thực sự muốn xóa chính sách này?"
        title="Xóa Chính Sách"
      />
    </Stack>
  )
}

export { DamageReportDetail }
