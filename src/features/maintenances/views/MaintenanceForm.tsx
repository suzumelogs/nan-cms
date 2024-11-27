'use client'

import { DetailItem } from '@/features/article/components'
import { FormLayout, Input } from '@/libs/components/Form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Stack } from '@mui/material'
import { useParams, useRouter } from 'next/navigation'
import { enqueueSnackbar } from 'notistack'
import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMaintenanceCreate, useMaintenanceDetail, useMaintenanceUpdate } from '../hooks'
import { MaintenanceCreateInputSchema, MaintenanceCreateInputType } from '../type'

const MaintenanceForm = () => {
  const router = useRouter()
  const { maintenanceId } = useParams()
  const { data: maintenanceDetail } = useMaintenanceDetail(maintenanceId as string)

  const {
    control,
    handleSubmit,
    setError,
    setValue,
    formState: { isDirty },
  } = useForm<MaintenanceCreateInputType>({
    defaultValues: {
      maintenanceDate: '',
      description: '',
      maintenanceCost: 0,
    },
    resolver: zodResolver(MaintenanceCreateInputSchema),
  })

  useEffect(() => {
    if (maintenanceDetail) {
      const { maintenanceDate, description, maintenanceCost } = maintenanceDetail
      setValue('maintenanceDate', maintenanceDate as string)
      setValue('description', description as string)
      setValue('maintenanceCost', maintenanceCost as number)
    }
  }, [setValue, maintenanceDetail])

  const { mutate: createMaintenance, isPending: isPendingCreate } = useMaintenanceCreate(setError)
  const { mutate: updateMaintenance, isPending: isPendingUpdate } = useMaintenanceUpdate(setError)

  const onSubmit: SubmitHandler<MaintenanceCreateInputType> = (data) => {
    const submitData = { ...data, id: maintenanceId as string }

    const successCallback = () => {
      enqueueSnackbar(maintenanceId ? 'Cập nhật thành công' : 'Thêm mới thành công', {
        variant: 'success',
      })
      router.push(maintenanceId ? `/maintenances/${maintenanceId}/detail` : '/maintenances')
    }

    if (maintenanceId) {
      updateMaintenance(submitData, { onSuccess: successCallback })
    } else {
      createMaintenance(data, { onSuccess: successCallback })
    }
  }

  return (
    <FormLayout
      onSubmit={handleSubmit(onSubmit)}
      title={maintenanceId ? 'Cập nhật bảo trì' : 'Tạo mới bảo trì'}
      isDirty={isDirty}
      submitLoading={isPendingCreate || isPendingUpdate}
    >
      <Stack direction="row" spacing={2}>
        <Stack spacing={2} width={{ xs: '100%', lg: '50%' }}>
          <Stack direction={{ xs: 'column', lg: 'row' }} gap={4} alignItems={{ lg: 'center' }}>
            <DetailItem
              label="ID"
              value={maintenanceDetail?.id || '-'}
              valueSx={{ width: { xs: '100%', lg: 500 } }}
            />
          </Stack>

          <Stack direction="column" gap={2}>
            <Input
              control={control}
              name="maintenanceDate"
              label="Ngày bảo trì"
              labelLeft
              placeholder="Chọn ngày bảo trì"
              type="date"
              fullWidth
            />
            <Input
              control={control}
              name="description"
              label="Mô tả"
              labelLeft
              placeholder="Mô tả"
              fullWidth
            />
            <Input
              control={control}
              name="maintenanceCost"
              label="Chi phí bảo trì"
              labelLeft
              placeholder="Nhập chi phí bảo trì"
              type="number"
              fullWidth
            />
            <DetailItem
              label="Ngày tạo"
              value={maintenanceDetail?.createdAt || '-'}
              valueSx={{ width: { xs: '100%', lg: 200 } }}
            />
            <DetailItem
              label="Ngày cập nhật"
              value={maintenanceDetail?.updatedAt || '-'}
              valueSx={{ width: { xs: '100%', lg: 200 } }}
            />
          </Stack>
        </Stack>
      </Stack>
    </FormLayout>
  )
}

export { MaintenanceForm }
