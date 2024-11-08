'use client'

import { DetailItem } from '@/features/article/components'
import { FormLayout, Input, UploadImage } from '@/libs/components/Form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Stack, Typography } from '@mui/material'
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
      url: undefined,
    },
    resolver: zodResolver(CategoryCreateInputSchema),
  })

  useEffect(() => {
    if (categoryDetail) {
      const { name } = categoryDetail
      setValue('name', name as string)
    }
  }, [setValue, categoryDetail])

  const { mutate: createCategory, isPending: isPendingCreate } = useCategoryCreate(setError)
  const { mutate: updateCategory, isPending: isPendingUpdate } = useCategoryUpdate(setError)

  const onSubmit: SubmitHandler<CategoryCreateInputType> = (data) => {
    const submitData = { ...data, _id: categoriesId as string }

    const successCallback = () => {
      enqueueSnackbar(
        categoriesId ? 'Cập nhật danh mục thành công' : 'Thêm mới danh mục thành công',
        {
          variant: 'success',
        },
      )
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
      <Stack direction="row">
        <Stack spacing={2} width={{ xs: '100%', lg: '50%' }}>
          <Stack direction={{ xs: 'column', lg: 'row' }} gap={4} alignItems={{ lg: 'center' }}>
            <DetailItem
              label="ID"
              value={categoryDetail?._id || '-'}
              valueSx={{ width: { xs: '100%', lg: 500 } }}
            />
          </Stack>

          <Stack direction={{ xs: 'column', lg: 'row' }} gap={4}>
            <Input
              control={control}
              name="name"
              label="Tên danh mục"
              labelLeft
              placeholder="Tên sách"
              fullWidth
            />
          </Stack>

          <Stack direction="row" gap={1}>
            <Stack
              minWidth={120}
              padding="4px 8px"
              bgcolor="base.white"
              justifyContent="center"
              sx={{ height: 44 }}
            >
              <Typography variant="body2" color="grey.500">
                Hình ảnh
              </Typography>
            </Stack>
            <UploadImage
              name="url"
              control={control}
              content="Kéo và thả file hình ảnh vào đây hoặc nhấp để chọn"
            />
          </Stack>
        </Stack>
      </Stack>
    </FormLayout>
  )
}

export { CategoryForm }
