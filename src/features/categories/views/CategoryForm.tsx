'use client'

import { DetailItem } from '@/features/article/components'
import { FormLayout, Input, InputMoney } from '@/libs/components/Form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Stack } from '@mui/material'
import { useParams, useRouter } from 'next/navigation'
import { enqueueSnackbar } from 'notistack'
import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useCategoryCreate, useCategoryDetail, useCategoryUpdate } from '../hooks'
import { CategoryCreateInputSchema, CategoryCreateInputType } from '../type'

const CategoryForm = () => {
  const router = useRouter()
  const { categoriesId } = useParams()
  const { data: categoryDetail } = useCategoryDetail(categoriesId as string)

  const {
    control,
    handleSubmit,
    setError,
    setValue,
    formState: { isDirty },
  } = useForm<CategoryCreateInputType>({
    defaultValues: {
      name: '',
      description: '',
      priceDay: '',
      priceWeek: '',
      priceMonth: '',
    },
    resolver: zodResolver(CategoryCreateInputSchema),
  })

  useEffect(() => {
    if (categoryDetail) {
      const { name, description, priceDay, priceWeek, priceMonth } = categoryDetail
      setValue('name', name as string)
      setValue('description', description as string)
      setValue('priceDay', priceDay as string)
      setValue('priceWeek', priceWeek as string)
      setValue('priceMonth', priceMonth as string)
    }
  }, [setValue, categoryDetail])

  const { mutate: createCategory, isPending: isPendingCreate } = useCategoryCreate(setError)
  const { mutate: updateCategory, isPending: isPendingUpdate } = useCategoryUpdate(setError)

  const onSubmit: SubmitHandler<CategoryCreateInputType> = (data) => {
    const submitData = { ...data, id: categoriesId as string }

    const successCallback = () => {
      enqueueSnackbar(categoriesId ? 'Cập nhật gói thành công' : 'Thêm mới gói thành công', {
        variant: 'success',
      })
      router.push(categoriesId ? `/categories/${categoriesId}/detail` : '/categories')
    }

    if (categoriesId) {
      updateCategory(submitData, { onSuccess: successCallback })
    } else {
      createCategory(data, { onSuccess: successCallback })
    }
  }

  return (
    <FormLayout
      onSubmit={handleSubmit(onSubmit)}
      title={categoriesId ? 'Cập nhật' : 'Tạo mới'}
      isDirty={isDirty}
      submitLoading={isPendingCreate || isPendingUpdate}
    >
      <Stack direction="row" spacing={2}>
        <Stack spacing={2} width={{ xs: '100%', lg: '50%' }}>
          <Stack direction={{ xs: 'column', lg: 'row' }} gap={4} alignItems={{ lg: 'center' }}>
            <DetailItem
              label="ID"
              value={categoryDetail?.id || '-'}
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
            <InputMoney
              control={control}
              name="priceDay"
              label="Giá theo ngày"
              labelLeft
              placeholder="Nhập giá theo ngày"
              type="text"
              fullWidth
            />
            <InputMoney
              control={control}
              name="priceWeek"
              label="Giá theo tuần"
              labelLeft
              placeholder="Nhập giá theo tuần"
              type="text"
              fullWidth
            />
            <InputMoney
              control={control}
              name="priceMonth"
              label="Giá theo tháng"
              labelLeft
              placeholder="Nhập giá theo tháng"
              type="text"
              fullWidth
            />
            <DetailItem
              label="Ngày tạo"
              value={categoryDetail?.createdAt || '-'}
              valueSx={{ width: { xs: '100%', lg: 200 } }}
            />
            <DetailItem
              label="Ngày cập nhật"
              value={categoryDetail?.updatedAt || '-'}
              valueSx={{ width: { xs: '100%', lg: 200 } }}
            />
          </Stack>
        </Stack>
      </Stack>
    </FormLayout>
  )
}

export { CategoryForm }
