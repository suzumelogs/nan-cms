'use client'

import { DetailItem } from '@/features/article/components'
import { Header } from '@/libs/components/Form/Layout/Header'
import { Modal } from '@/libs/components/Modal'
import { formatDate } from '@/utils/format'
import { generateMediaUrl } from '@/utils/media'
import { Box, Stack } from '@mui/material'
import { useParams, useRouter } from 'next/navigation'
import { enqueueSnackbar } from 'notistack'
import { useState } from 'react'
import { useDeleteEpisode, useEpisodeDetailQuery, useUpdateTopEpisode } from '../hooks'

const EpisodeDetail = () => {
  const { episodesId } = useParams()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const { deleteEpisode } = useDeleteEpisode()
  const { updateTopEpisode } = useUpdateTopEpisode()

  const handleOpenModal = () => setOpen(true)
  const handleCloseModal = () => setOpen(false)

  const handleDeleteEpisode = () => {
    deleteEpisode(episodesId as string, {
      onSuccess: () => {
        enqueueSnackbar('Xoá tập thành công', {
          variant: 'success',
        })
        router.push('/episodes')
      },
    })
  }

  const handleUpdateTopEpisode = () => {
    updateTopEpisode(episodesId as string, {
      onSuccess: () => {
        enqueueSnackbar('Cập nhật top 10 thành công', {
          variant: 'success',
        })
        router.push('/episodes')
      },
      onError: (error) => {
        // @ts-ignore
        enqueueSnackbar(error?.response?.data?.message, {
          variant: 'error',
        })
      },
    })
  }

  const { data, isLoading } = useEpisodeDetailQuery(episodesId as string)

  return (
    <Stack spacing={4}>
      <Header
        title="Chi tiết"
        editPath="edit"
        deleteFunction={handleOpenModal}
        showButtonUpTop
        updateTopFunction={handleUpdateTopEpisode}
        titleTop={data?.isTop ? 'Xóa top 10' : 'Thêm top 10'}
      />

      <Box>
        <Stack spacing={2}>
          <DetailItem label="ID" value={data?._id} isPending={isLoading} />
          <DetailItem label="Tên tập" value={data?.title} isPending={isLoading} />
          <DetailItem label="Album" value={data?.album} isPending={isLoading} />
          <DetailItem label="Tác giả" value={data?.artist} isPending={isLoading} />
          <DetailItem label="Mô tả" value={data?.description} isPending={isLoading} />
          <DetailItem
            status={{
              text: data?.isPremium ? 'Có' : 'Không',
              color: data?.isPremium ? 'green' : 'red',
            }}
            label="Trả phí"
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
          {data?.url && (
            <DetailItem
              label="Audio"
              audio={{ src: generateMediaUrl(data?.url as string, 'audio'), controls: true }}
              isPending={isLoading}
            />
          )}
          <DetailItem
            image={{
              src: generateMediaUrl(data?.artwork as string, 'image'),
              alt: 'Image chapter',
            }}
            label="Hình ảnh"
            isPending={isLoading}
          />
        </Stack>
      </Box>

      <Modal
        handleCloseModal={handleCloseModal}
        open={open}
        handleSubmit={handleDeleteEpisode}
        textSubmit="Đồng ý"
        description={`Bạn có thực sự muốn xóa tập này chứ ?`}
        title="Xóa tập"
      />
    </Stack>
  )
}

export { EpisodeDetail }
