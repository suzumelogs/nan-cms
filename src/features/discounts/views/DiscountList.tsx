'use client'

import { ReactTable } from '@/libs/components/Table'
import { ColumnDef } from '@tanstack/react-table'
import { useRouter } from 'next/navigation'
import { useDiscountListQuery } from '../hooks'
import { DiscountType } from '../type'

const DiscountList = () => {
  const { tableData, totalPages } = useDiscountListQuery()
  const router = useRouter()

  const commonCellStyle = {
    fontSize: 14,
    lineHeight: '20px',
    fontWeight: 400,
    padding: '8px 16px',
  }

  const columns: ColumnDef<DiscountType>[] = [
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
          ...commonCellStyle,
        },
      },
    },
    {
      header: 'Mã Giảm Giá',
      accessorKey: 'code',
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
      header: 'Tỷ Lệ Giảm Giá (%)',
      accessorKey: 'discountRate',
      cell: ({ row }) => `${row.original.discountRate}%`,
      meta: {
        headStyle: {
          padding: '0 16px',
        },
        cellStyle: {
          ...commonCellStyle,
          width: 150,
          textAlign: 'right',
        },
      },
    },
    {
      header: 'Hiệu Lực Từ',
      accessorKey: 'validFrom',
      cell: ({ row }) => new Date(row.original.validFrom).toLocaleDateString('vi-VN'),
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
      header: 'Hiệu Lực Đến',
      accessorKey: 'validTo',
      cell: ({ row }) => new Date(row.original.validTo).toLocaleDateString('vi-VN'),
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
      header: 'Sử Dụng Tối Đa',
      accessorKey: 'maxUsage',
      meta: {
        headStyle: {
          padding: '0 16px',
        },
        cellStyle: {
          ...commonCellStyle,
          width: 150,
          textAlign: 'right',
        },
      },
    },
    {
      header: 'Số Lần Đã Sử Dụng',
      accessorKey: 'currentUsage',
      meta: {
        headStyle: {
          padding: '0 16px',
        },
        cellStyle: {
          ...commonCellStyle,
          width: 150,
          textAlign: 'right',
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
          router.push(`/discounts/${id}/detail`)
        },
      }}
    />
  )
}

export { DiscountList }
