'use client'

import { ReactTable } from '@/libs/components/Table'
import { generateMediaUrl } from '@/utils/media'
import { Stack } from '@mui/material'
import { ColumnDef } from '@tanstack/react-table'
import { useRouter } from 'next/navigation'
import { useCategoryListQuery } from '../hooks'
import { CategoryType } from '../type'

const CategoryList = () => {
  const { tableData, totalPages } = useCategoryListQuery()
  const router = useRouter()

  const commonCellStyle = {
    fontSize: 14,
    lineHeight: '20px',
    fontWeight: 400,
    padding: '0 16px',
  }

  const columns: ColumnDef<CategoryType>[] = [
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
      header: 'Tên danh mục',
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
  ]

  return (
    <ReactTable
      {...tableData}
      columns={columns}
      next={totalPages}
      action={{
        disabledDetail: false,
        onDetail: (_id) => {
          router.push(`/categories/${_id}/detail`)
        },
      }}
    />
  )
}

export { CategoryList }
