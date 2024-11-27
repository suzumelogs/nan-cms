'use client'

import { DetailItem } from '@/features/article/components'
import { useCategoryValueLabel } from '@/features/categories/hooks'
import { FormLayout, Input, Select } from '@/libs/components/Form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Stack } from '@mui/material'
import { useParams, useRouter } from 'next/navigation'
import { enqueueSnackbar } from 'notistack'
import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useEquipmentCreate, useEquipmentDetail, useEquipmentUpdate } from '../hooks'
import { EquipmentCreateInputSchema, EquipmentCreateInputType } from '../type'

const EquipmentForm = () => {
  const router = useRouter()
  const { equipmentsId } = useParams()
  const { data: equipmentDetail } = useEquipmentDetail(equipmentsId as string)

  const {
    control,
    handleSubmit,
    setError,
    setValue,
    formState: { isDirty },
  } = useForm<EquipmentCreateInputType>({
    defaultValues: {
      name: '',
      image: '',
      description: '',
      pricePerDay: 0,
      pricePerWeek: 0,
      pricePerMonth: 0,
      stock: 0,
      categoryId: ''
    },
    resolver: zodResolver(EquipmentCreateInputSchema),
  })

  useEffect(() => {
    if (equipmentDetail) {
      const { name, image, description, pricePerDay, pricePerWeek, pricePerMonth, stock, categoryId } =
        equipmentDetail
      setValue('name', name as string)
      setValue('image', image as string)
      setValue('description', description as string)
      setValue('pricePerDay', pricePerDay as number)
      setValue('pricePerWeek', pricePerWeek as number)
      setValue('pricePerMonth', pricePerMonth as number)
      setValue('stock', stock as number)
      setValue('categoryId', categoryId as string)
    }
  }, [setValue, equipmentDetail])

  const { mutate: createEquipment, isPending: isPendingCreate } = useEquipmentCreate(setError)
  const { mutate: updateEquipment, isPending: isPendingUpdate } = useEquipmentUpdate(setError)
  const { data: CATEGORIES } = useCategoryValueLabel()

  const onSubmit: SubmitHandler<EquipmentCreateInputType> = (data) => {
    const submitData = { ...data, id: equipmentsId as string }

    const successCallback = () => {
      enqueueSnackbar(
        equipmentsId ? 'Cập nhật thiết bị thành công' : 'Thêm mới thiết bị thành công',
        {
          variant: 'success',
        },
      )
      router.push(equipmentsId ? `/equipments/${equipmentsId}/detail` : '/equipments')
    }

    if (equipmentsId) {
      updateEquipment(submitData, { onSuccess: successCallback })
    } else {
      createEquipment(data, { onSuccess: successCallback })
    }
  }

  return (
    <FormLayout
      onSubmit={handleSubmit(onSubmit)}
      title={equipmentsId ? 'Cập nhật' : 'Tạo mới'}
      isDirty={isDirty}
      submitLoading={isPendingCreate || isPendingUpdate}
    >
      <Stack direction="row" spacing={2}>
        <Stack spacing={2} width={{ xs: '100%', lg: '50%' }}>
          <Stack direction={{ xs: 'column', lg: 'row' }} gap={4} alignItems={{ lg: 'center' }}>
            <DetailItem
              label="ID"
              value={equipmentDetail?.id || '-'}
              valueSx={{ width: { xs: '100%', lg: 500 } }}
            />
          </Stack>

          <Stack direction="column" gap={2}>
            <Input
              control={control}
              name="name"
              label="Tên thiết bị"
              labelLeft
              placeholder="Tên thiết bị"
              fullWidth
            />
            <Input
              control={control}
              name="image"
              label="Hình ảnh"
              labelLeft
              placeholder="Hình ảnh"
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
            <Input
              control={control}
              type="number"
              name="stock"
              label="Số lượng"
              labelLeft
              placeholder="Số lượng"
              fullWidth
            />
            <Select
              control={control}
              name="categoryId"
              label="Danh mục"
              labelLeft
              placeholder="Danh mục"
              options={CATEGORIES}
              fullWidth
            />
            <DetailItem
              label="Ngày tạo"
              value={equipmentDetail?.createdAt || '-'}
              valueSx={{ width: { xs: '100%', lg: 200 } }}
            />
            <DetailItem
              label="Ngày cập nhật"
              value={equipmentDetail?.updatedAt || '-'}
              valueSx={{ width: { xs: '100%', lg: 200 } }}
            />
          </Stack>
        </Stack>
      </Stack>
    </FormLayout>
  )
}

export { EquipmentForm }
