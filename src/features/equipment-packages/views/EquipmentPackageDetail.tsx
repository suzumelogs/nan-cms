'use client'

import { DetailItem } from '@/features/article/components'
import { Header } from '@/libs/components/Form/Layout/Header'
import { Modal } from '@/libs/components/Modal'
import { formatDate } from '@/utils/format'
import { Box, Stack } from '@mui/material'
import { useParams, useRouter } from 'next/navigation'
import { enqueueSnackbar } from 'notistack'
import { useState } from 'react'
import { useDeleteEquipmentPackages, useEquipmentPackagesDetailQuery } from '../hooks'

const EquipmentPackageDetail = () => {
  const { packageId } = useParams()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const { deleteEquipmentPackage } = useDeleteEquipmentPackages()

  const handleOpenModal = () => setOpen(true)
  const handleCloseModal = () => setOpen(false)

  const handleDeleteEquipmentPackage = () => {
    deleteEquipmentPackage(packageId as string, {
      onSuccess: () => {
        enqueueSnackbar('Xoá thành công', { variant: 'success' })
        router.push('/package')
      },
    })
  }

  const { data, isLoading } = useEquipmentPackagesDetailQuery(packageId as string)

  const formatCurrency = (value?: number) =>
    value !== undefined
      ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value)
      : ''

  return (
    <Stack spacing={4}>
      <Header title="Chi tiết gói thiết bị" editPath="edit" deleteFunction={handleOpenModal} />

      <Box>
        <Stack spacing={2}>
          <DetailItem label="ID" value={data?.id} isPending={isLoading} />
          <DetailItem label="Tên gói" value={data?.name} isPending={isLoading} />
          <DetailItem label="Mô tả" value={data?.description} isPending={isLoading} />
          <DetailItem
            label="Giá theo ngày"
            value={formatCurrency(data?.pricePerDay)}
            isPending={isLoading}
          />
          <DetailItem
            label="Giá theo tuần"
            value={formatCurrency(data?.pricePerMonth)}
            isPending={isLoading}
          />
          <DetailItem
            label="Giá theo tháng"
            value={formatCurrency(data?.pricePerWeek)}
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
        handleSubmit={handleDeleteEquipmentPackage}
        textSubmit="Đồng ý"
        description="Bạn có thực sự muốn xóa gói thiết bị này?"
        title="Xóa gói thiết bị"
      />
    </Stack>
  )
}

export { EquipmentPackageDetail }
