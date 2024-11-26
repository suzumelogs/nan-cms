'use client'

import { DetailItem } from '@/features/article/components'
import { Header } from '@/libs/components/Form/Layout/Header'
import { Modal } from '@/libs/components/Modal'
import { formatDate } from '@/utils/format'
import { Box, Stack } from '@mui/material'
import { useParams, useRouter } from 'next/navigation'
import { enqueueSnackbar } from 'notistack'
import { useState } from 'react'
import { useDeleteEquipment, useEquipmentDetailQuery } from '../hooks'

const EquipmentDetail = () => {
  const { equipmentsId } = useParams()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const { deleteEquipment } = useDeleteEquipment()

  const handleOpenModal = () => setOpen(true)
  const handleCloseModal = () => setOpen(false)

  const handleDeleteEquipment = () => {
    deleteEquipment(equipmentsId as string, {
      onSuccess: () => {
        enqueueSnackbar('Xoá thiết bị thành công', { variant: 'success' })
        router.push('/equipments')
      },
    })
  }

  const { data, isLoading } = useEquipmentDetailQuery(equipmentsId as string)

  return (
    <Stack spacing={4}>
      <Header title="Chi tiết thiết bị" editPath="edit" deleteFunction={handleOpenModal} />

      <Box>
        <Stack spacing={2}>
          <DetailItem label="ID" value={data?.id} isPending={isLoading} />
          <DetailItem label="Tên thiết bị" value={data?.name} isPending={isLoading} />
          <DetailItem label="Mô tả" value={data?.description} isPending={isLoading} />
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
        </Stack>
      </Box>

      <Modal
        handleCloseModal={handleCloseModal}
        open={open}
        handleSubmit={handleDeleteEquipment}
        textSubmit="Đồng ý"
        description="Bạn có thực sự muốn xóa thiết bị này?"
        title="Xóa thiết bị"
      />
    </Stack>
  )
}

export { EquipmentDetail }
