'use client'

import { ReactTable } from '@/libs/components/Table'
import { ColumnDef } from '@tanstack/react-table'
import { useRouter } from 'next/navigation'
import { useCategoryListQuery } from '../hooks'
import { CategoryType } from '../type'

const CategoryList = () => {
  const { tableData, totalPages } = useCategoryListQuery()
  const router = useRouter()

  const formatCurrency = (value?: number) =>
    value !== undefined
      ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value)
      : ''

  const commonCellStyle = {
    fontSize: 14,
    lineHeight: '20px',
    fontWeight: 400,
    padding: '8px 16px',
  }

  const columns: ColumnDef<CategoryType>[] = [
    {
      header: 'STT',
      accessorFn: (row, index) => index + 1,
      meta: {
        width: 60,
        headStyle: {
          padding: '0 16px',
        },
        cellStyle: {
          width: 60,
          textAlign: 'center',
          fontSize: 14,
          lineHeight: '20px',
          fontWeight: 400,
          padding: '8px',
        },
      },
    },
    {
      header: 'Tên gói',
      accessorKey: 'name',
      meta: {
        headStyle: {
          padding: '0 16px',
        },
        cellStyle: {
          ...commonCellStyle,
          width: 200,
          fontWeight: 500,
        },
      },
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
          width: 250,
        },
      },
    },
    {
      header: 'Giá theo ngày',
      accessorKey: 'priceDay',
      cell: ({ row }) => formatCurrency(row.original.priceDay),
      meta: {
        headStyle: {
          padding: '0 16px',
        },
        cellStyle: {
          ...commonCellStyle,
          width: 150,
        },
      },
    },
    {
      header: 'Giá theo tuần',
      accessorKey: 'priceWeek',
      cell: ({ row }) => formatCurrency(row.original.priceWeek),
      meta: {
        headStyle: {
          padding: '0 16px',
        },
        cellStyle: {
          ...commonCellStyle,
          width: 150,
        },
      },
    },
    {
      header: 'Giá theo tháng',
      accessorKey: 'priceMonth',
      cell: ({ row }) => formatCurrency(row.original.priceMonth),
      meta: {
        headStyle: {
          padding: '0 16px',
        },
        cellStyle: {
          ...commonCellStyle,
          width: 150,
        },
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
        onDetail: (id) => {
          router.push(`/categories/${id}/detail`)
        },
      }}
    />
  )
}

export { CategoryList }
