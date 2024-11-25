'use client'

import { DetailItem } from '@/features/article/components'
import { FormLayout, Input } from '@/libs/components/Form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Stack } from '@mui/material'
import { useParams, useRouter } from 'next/navigation'
import { enqueueSnackbar } from 'notistack'
import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import {
  useEquipmentPackageCreate,
  useEquipmentPackageDetail,
  useEquipmentPackageUpdate,
} from '../hooks'
import { EquipmentPackageCreateInputSchema, EquipmentPackageCreateInputType } from '../type'

const EquipmentPackageForm = () => {
  const router = useRouter()
  const { packageId } = useParams()
  const { data: equipmentPackageDetail } = useEquipmentPackageDetail(packageId as string)

  const {
    control,
    handleSubmit,
    setError,
    setValue,
    formState: { isDirty },
  } = useForm<EquipmentPackageCreateInputType>({
    defaultValues: {
      name: '',
      description: '',
      pricePerDay: 0,
      pricePerWeek: 0,
      pricePerMonth: 0,
    },
    resolver: zodResolver(EquipmentPackageCreateInputSchema),
  })

  useEffect(() => {
    if (equipmentPackageDetail) {
      const { name, description, pricePerDay, pricePerWeek, pricePerMonth } = equipmentPackageDetail
      setValue('name', name as string)
      setValue('description', description as string)
      setValue('pricePerDay', pricePerDay as number)
      setValue('pricePerWeek', pricePerWeek as number)
      setValue('pricePerMonth', pricePerMonth as number)
    }
  }, [setValue, equipmentPackageDetail])

  const { mutate: createEquipmentPackage, isPending: isPendingCreate } =
    useEquipmentPackageCreate(setError)
  const { mutate: updateEquipmentPackage, isPending: isPendingUpdate } =
    useEquipmentPackageUpdate(setError)

  const onSubmit: SubmitHandler<EquipmentPackageCreateInputType> = (data) => {
    const submitData = { ...data, id: packageId as string }

    const successCallback = () => {
      enqueueSnackbar(packageId ? 'Cập nhật thành công' : 'Thêm mới thành công', {
        variant: 'success',
      })
      router.push(packageId ? `/package/${packageId}/detail` : '/package')
    }

    if (packageId) {
      updateEquipmentPackage(submitData, { onSuccess: successCallback })
    } else {
      createEquipmentPackage(data, { onSuccess: successCallback })
    }
  }

  return (
    <FormLayout
      onSubmit={handleSubmit(onSubmit)}
      title={packageId ? 'Cập nhật' : 'Tạo mới'}
      isDirty={isDirty}
      submitLoading={isPendingCreate || isPendingUpdate}
    >
      <Stack direction="row" spacing={2}>
        <Stack spacing={2} width={{ xs: '100%', lg: '50%' }}>
          <Stack direction={{ xs: 'column', lg: 'row' }} gap={4} alignItems={{ lg: 'center' }}>
            <DetailItem
              label="ID"
              value={equipmentPackageDetail?.id || '-'}
              valueSx={{ width: { xs: '100%', lg: 500 } }}
            />
          </Stack>

          <Stack direction="column" gap={2}>
            <Input
              control={control}
              name="name"
              label="Tên gói"
              labelLeft
              placeholder="Tên gói"
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
              type="number"
              name="pricePerDay"
              label="Giá theo ngày"
              labelLeft
              placeholder="Giá theo ngày"
              fullWidth
            />
            <Input
              control={control}
              type="number"
              name="pricePerWeek"
              label="Giá theo tuần"
              labelLeft
              placeholder="Giá theo tuần"
              fullWidth
            />
            <Input
              control={control}
              type="number"
              name="pricePerMonth"
              label="Giá theo tháng"
              labelLeft
              placeholder="Giá theo tháng"
              fullWidth
            />
            <DetailItem
              label="Ngày tạo"
              value={equipmentPackageDetail?.createdAt || '-'}
              valueSx={{ width: { xs: '100%', lg: 200 } }}
            />
            <DetailItem
              label="Ngày cập nhật"
              value={equipmentPackageDetail?.updatedAt || '-'}
              valueSx={{ width: { xs: '100%', lg: 200 } }}
            />
          </Stack>
        </Stack>
      </Stack>
    </FormLayout>
  )
}

export { EquipmentPackageForm }
