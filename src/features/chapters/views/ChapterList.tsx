'use client'

import { StatusTag } from '@/libs/components/StatusTag'
import { ReactTable } from '@/libs/components/Table'
import { generateMediaUrl } from '@/utils/media'
import { Stack } from '@mui/material'
import { ColumnDef } from '@tanstack/react-table'
import { useRouter } from 'next/navigation'
import { useChapterListQuery } from '../hooks'
import { ChapterType } from '../type'

const ChapterList = () => {
  const { tableData, totalPages } = useChapterListQuery()
  const router = useRouter()

  const commonCellStyle = {
    fontSize: 14,
    lineHeight: '20px',
    fontWeight: 400,
    padding: '0 16px',
  }

  const columns: ColumnDef<ChapterType>[] = [
    {
      header: 'ID',
      accessorFn: (row, index) => index + 1,
      meta: {
        width: 56,
        headStyle: {
          padding: '0 24px',
        },
        cellStyle: {
          width: 56,
          textAlign: 'center',
          fontSize: 14,
          lineHeight: '20px',
          fontWeight: 400,
          padding: '0 8px',
        },
      },
    },
    {
      header: 'Tên sách',
      accessorKey: 'name',
      meta: {
        headStyle: {
          padding: '0 16px',
        },
        cellStyle: {
          ...commonCellStyle,
          width: 250,
        },
      },
    },
    {
      header: 'Hình ảnh',
      accessorKey: 'imageUrl',
      meta: {
        headStyle: {
          padding: '0 8px',
        },
        cellStyle: {
          padding: '0 8px',
          textAlign: 'center',
          width: 100,
        },
      },
      cell: ({ row }) => (
        <Stack flexDirection="row" alignItems="center" columnGap={1}>
          <Stack
            width="40px"
            height="40px"
            component="img"
            borderRadius="2px"
            src={
              row.original?.url
                ? generateMediaUrl(row.original?.url, 'image')
                : 'https://demofree.sirv.com/nope-not-here.jpg'
            }
          />
        </Stack>
      ),
    },
    {
      header: 'Mô tả',
      accessorKey: 'description',
      meta: {
        headStyle: {
          padding: '0 16px',
        },
        cellStyle: {
          ...commonCellStyle,
          width: 300,
        },
      },
    },
    {
      header: 'Trả phí',
      accessorKey: 'isPremium',
      meta: {
        width: 180,
        headStyle: {
          padding: '0 16px',
        },
        cellStyle: {
          ...commonCellStyle,
          width: 180,
        },
      },
      cell: ({ row }) => {
        return (
          <StatusTag
            text={row.original.isPremium == true ? 'Có' : 'Không'}
            color={row.original.isPremium == true ? 'green' : 'red'}
          />
        )
      },
    },
  ]

  return (
    <ReactTable
      {...tableData}
      columns={columns}
      next={totalPages}
      action={{
        disabledDetail: false,
        onDetail: (_id) => {
          router.push(`/chapters/${_id}/detail`)
        },
      }}
    />
  )
}

export { ChapterList }
