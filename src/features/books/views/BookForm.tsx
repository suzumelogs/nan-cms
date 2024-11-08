'use client'

import { DetailItem } from '@/features/article/components'
import { useCategoryValueLabel } from '@/features/categories/hooks'
import { FormLayout, Input, RadioGroup, Select, UploadImage } from '@/libs/components/Form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Stack, Typography } from '@mui/material'
import { useParams, useRouter } from 'next/navigation'
import { enqueueSnackbar } from 'notistack'
import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useBookCreate, useBookDetail, useBookUpdate } from '../hooks'
import { BookCreateInputSchema, BookCreateInputType } from '../type'

const options = [
  { label: 'Có', value: 'true' },
  { label: 'Không', value: 'false' },
]

const BookForm = () => {
  const router = useRouter()
  const { booksId } = useParams()
  const { data: bookDetail } = useBookDetail(booksId as string)

  const {
    control,
    handleSubmit,
    setError,
    setValue,
    formState: { isDirty },
  } = useForm<BookCreateInputType>({
    defaultValues: {
      name: '',
      author: '',
      description: '',
      isPremium: true,
      categoryId: '',
      url: '',
    },
    resolver: zodResolver(BookCreateInputSchema),
  })

  useEffect(() => {
    if (bookDetail) {
      const { name, author, description, isPremium, categoryId } = bookDetail
      setValue('name', name as string)
      setValue('author', author as string)
      setValue('description', description as string)
      setValue('isPremium', isPremium ? true : false)
      setValue('categoryId', categoryId as string)
    }
  }, [setValue, bookDetail])

  const { mutate: createBook, isPending: isPendingCreate } = useBookCreate(setError)
  const { mutate: updateBook, isPending: isPendingUpdate } = useBookUpdate(setError)
  const { data: CATEGORIES } = useCategoryValueLabel()

  const onSubmit: SubmitHandler<BookCreateInputType> = (data) => {
    const submitData = { ...data, _id: booksId as string }

    const successCallback = () => {
      enqueueSnackbar(booksId ? 'Cập nhật sách thành công' : 'Thêm mới sách thành công', {
        variant: 'success',
      })
      router.push(booksId ? `/books/${booksId}/detail` : '/books')
    }

    if (booksId) {
      updateBook(submitData, { onSuccess: successCallback })
    } else {
      createBook(data, { onSuccess: successCallback })
    }
  }

  return (
    <FormLayout
      onSubmit={handleSubmit(onSubmit)}
      title={booksId ? 'Cập nhật' : 'Tạo mới'}
      isDirty={isDirty}
      submitLoading={isPendingCreate || isPendingUpdate}
    >
      <Stack direction="row">
        <Stack spacing={2} width={{ xs: '100%', lg: '50%' }}>
          <Stack direction={{ xs: 'column', lg: 'row' }} gap={4} alignItems={{ lg: 'center' }}>
            <DetailItem
              label="ID"
              value={bookDetail?._id || '-'}
              valueSx={{ width: { xs: '100%', lg: 500 } }}
            />
          </Stack>

          <Stack direction={{ xs: 'column', lg: 'row' }} gap={4}>
            <Input
              control={control}
              name="name"
              label="Tên sách"
              labelLeft
              placeholder="Tên sách"
              fullWidth
            />
          </Stack>

          <Stack direction={{ xs: 'column', lg: 'row' }} gap={4}>
            <Input
              control={control}
              name="author"
              label="Tác giả"
              labelLeft
              placeholder="Tác giả"
              fullWidth
            />
          </Stack>

          <Stack direction={{ xs: 'column', lg: 'row' }} gap={4}>
            <Input
              control={control}
              name="description"
              label="Mô tả"
              labelLeft
              placeholder="Mô tả"
              multiline
              rows={3}
              fullWidth
            />
          </Stack>

          <Stack direction={{ xs: 'column', lg: 'row' }} gap={4}>
            <Select
              control={control}
              name="categoryId"
              label="Danh mục"
              labelLeft
              placeholder="Danh mục"
              options={CATEGORIES}
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

          <Stack direction={{ xs: 'column', lg: 'row' }} gap={4} marginTop={4}>
            <RadioGroup
              control={control}
              name="isPremium"
              label="Trả phí"
              options={options}
              defaultValue="true"
            />
          </Stack>
        </Stack>
      </Stack>
    </FormLayout>
  )
}

export { BookForm }
