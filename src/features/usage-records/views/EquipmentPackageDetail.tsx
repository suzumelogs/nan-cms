'use client'

import { DetailItem } from '@/features/article/components'
import { Header } from '@/libs/components/Form/Layout/Header'
import { Modal } from '@/libs/components/Modal'
import { formatDate } from '@/utils/format'
import { Box, Stack, Typography } from '@mui/material'
import { useParams, useRouter } from 'next/navigation'
import { enqueueSnackbar } from 'notistack'
import { useState } from 'react'
import { useDeleteEquipmentPackages, useEquipmentPackagesDetailQuery } from '../hooks'
import { EquipmentByPackageList } from './EquipmentByPackageList'

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
      <Header title="Chi tiết" editPath="edit" deleteFunction={handleOpenModal} />

      <Box>
        <Stack spacing={2}>
          <DetailItem label="ID" value={data?.id} isPending={isLoading} />
          <DetailItem label="Tên gói" value={data?.name} isPending={isLoading} />
          <DetailItem label="Mô tả" value={data?.description} isPending={isLoading} />
          <DetailItem
            label="Giá gói"
            value={formatCurrency(data?.basePrice)}
            isPending={isLoading}
          />
          <DetailItem
            label="Giá cho thuê"
            value={formatCurrency(data?.rentalPrice)}
            isPending={isLoading}
          />
          <DetailItem
            label="Ảnh"
            image={{ src: data?.image ?? '', alt: data?.name }}
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

      <Box>
        <Typography fontSize={16} color={'#03396c'} mb={3}>
          Thiết bị có trong gói
        </Typography>
        <EquipmentByPackageList />
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
