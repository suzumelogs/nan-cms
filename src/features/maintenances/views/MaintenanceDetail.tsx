'use client'

import { DetailItem } from '@/features/article/components'
import { Header } from '@/libs/components/Form/Layout/Header'
import { Modal } from '@/libs/components/Modal'
import { formatDate } from '@/utils/format'
import { Box, Stack } from '@mui/material'
import { useParams, useRouter } from 'next/navigation'
import { enqueueSnackbar } from 'notistack'
import { useState } from 'react'
import { useDeleteMaintenance, useMaintenanceDetailQuery } from '../hooks'

const MaintenanceDetail = () => {
  const { maintenanceId } = useParams()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const { deleteMaintenance } = useDeleteMaintenance()

  const handleOpenModal = () => setOpen(true)
  const handleCloseModal = () => setOpen(false)

  const handleDeleteMaintenance = () => {
    deleteMaintenance(maintenanceId as string, {
      onSuccess: () => {
        enqueueSnackbar('Xoá thành công', { variant: 'success' })
        router.push('/maintenances')
      },
    })
  }

  const { data, isLoading } = useMaintenanceDetailQuery(maintenanceId as string)

  return (
    <Stack spacing={4}>
      <Header title="Chi tiết bảo trì" editPath="edit" deleteFunction={handleOpenModal} />

      <Box>
        <Stack spacing={2}>
          <DetailItem label="ID" value={data?.id} isPending={isLoading} />
          <DetailItem
            label="Ngày bảo trì"
            value={formatDate(data?.maintenanceDate as string)}
            isPending={isLoading}
          />
          <DetailItem label="Mô tả" value={data?.description} isPending={isLoading} />
          <DetailItem
            label="Chi phí bảo trì"
            value={data?.maintenanceCost ? `${data.maintenanceCost} VND` : 'N/A'}
            isPending={isLoading}
          />
          <DetailItem
            label="Trạng thái"
            value={data?.status}
            isPending={isLoading}
          />
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
        handleSubmit={handleDeleteMaintenance}
        textSubmit="Đồng ý"
        description="Bạn có thực sự muốn xóa thông tin bảo trì này?"
        title="Xóa bảo trì"
      />
    </Stack>
  )
}

export { MaintenanceDetail }
