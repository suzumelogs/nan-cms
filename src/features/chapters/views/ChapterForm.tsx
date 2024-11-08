'use client'

import { DetailItem } from '@/features/article/components'
import { useBookValueLabel } from '@/features/books/hooks'
import { FormLayout, Input, RadioGroup, Select, UploadImage } from '@/libs/components/Form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Stack, Typography } from '@mui/material'
import { useParams, useRouter } from 'next/navigation'
import { enqueueSnackbar } from 'notistack'
import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useChapterCreate, useChapterDetail, useChapterUpdate } from '../hooks'
import { ChapterCreateInputSchema, ChapterCreateInputType } from '../type'

const options = [
  { label: 'Có', value: 'true' },
  { label: 'Không', value: 'false' },
]

const ChapterForm = () => {
  const router = useRouter()
  const { chaptersId } = useParams()
  const { data: chapterDetail } = useChapterDetail(chaptersId as string)

  const {
    control,
    handleSubmit,
    setError,
    setValue,
    formState: { isDirty },
  } = useForm<ChapterCreateInputType>({
    defaultValues: {
      name: '',
      description: '',
      url: undefined,
      isPremium: true,
      bookId: '',
    },
    resolver: zodResolver(ChapterCreateInputSchema),
  })

  useEffect(() => {
    if (chapterDetail) {
      const { name, description, isPremium, bookId } = chapterDetail
      setValue('name', name as string)
      setValue('description', description as string)
      setValue('isPremium', isPremium ? true : false)
      setValue('bookId', bookId as string)
    }
  }, [setValue, chapterDetail])

  const { mutate: createChapter, isPending: isPendingCreate } = useChapterCreate(setError)
  const { mutate: updateChapter, isPending: isPendingUpdate } = useChapterUpdate(setError)
  const { data: BOOKS } = useBookValueLabel()

  const onSubmit: SubmitHandler<ChapterCreateInputType> = (data) => {
    const submitData = { ...data, _id: chaptersId as string }

    const successCallback = () => {
      enqueueSnackbar(chaptersId ? 'Cập nhật chương thành công' : 'Thêm mới chương thành công', {
        variant: 'success',
      })
      router.push(chaptersId ? `/chapters/${chaptersId}/detail` : '/chapters')
    }

    if (chaptersId) {
      updateChapter(submitData, { onSuccess: successCallback })
    } else {
      createChapter(data, { onSuccess: successCallback })
    }
  }

  return (
    <FormLayout
      onSubmit={handleSubmit(onSubmit)}
      title={chaptersId ? 'Cập nhật' : 'Tạo mới'}
      isDirty={isDirty}
      submitLoading={isPendingCreate || isPendingUpdate}
    >
      <Stack direction="row">
        <Stack spacing={2} width={{ xs: '100%', lg: '50%' }}>
          <Stack direction={{ xs: 'column', lg: 'row' }} gap={4} alignItems={{ lg: 'center' }}>
            <DetailItem
              label="ID"
              value={chapterDetail?._id || '-'}
              valueSx={{ width: { xs: '100%', lg: 500 } }}
            />
          </Stack>

          <Stack direction={{ xs: 'column', lg: 'row' }} gap={4}>
            <Input
              control={control}
              name="name"
              label="Tên chương"
              labelLeft
              placeholder="Tên chương"
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
              name="bookId"
              label="Sách"
              labelLeft
              placeholder="Sách"
              options={BOOKS}
              fullWidth
            />
          </Stack>

          <Stack direction={'row'} gap={1}>
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
            <UploadImage name="url" control={control} />
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

export { ChapterForm }
