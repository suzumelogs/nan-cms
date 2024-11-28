'use client'

import { ReactTable } from '@/libs/components/Table'
import { ColumnDef } from '@tanstack/react-table'
import { useRouter } from 'next/navigation'
import { useRentalListQuery } from '../hooks'
import { RentalType } from '../type'

const RentalList = () => {
  const { tableData, totalPages } = useRentalListQuery()
  const router = useRouter()

  const formatCurrency = (value?: number) =>
    value !== undefined
      ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value)
      : ''

  const formatDate = (date: string | Date) =>
    new Intl.DateTimeFormat('en-GB').format(new Date(date))

  const commonCellStyle = {
    fontSize: 14,
    lineHeight: '20px',
    fontWeight: 400,
    padding: '8px 16px',
  }

  const columns: ColumnDef<RentalType>[] = [
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
      header: 'Tên người dùng',
      accessorKey: 'user.name',
      meta: {
        headStyle: {
          padding: '0 16px',
        },
        cellStyle: {
          ...commonCellStyle,
        },
      },
    },
    {
      header: 'Tên thiết bị',
      accessorKey: 'device.name',
      meta: {
        headStyle: {
          padding: '0 16px',
        },
        cellStyle: {
          ...commonCellStyle,
        },
      },
    },
    {
      header: 'Ngày bắt đầu',
      accessorKey: 'startDate',
      cell: ({ row }) => formatDate(row.original.startDate as string),
      meta: {
        headStyle: {
          padding: '0 16px',
        },
        cellStyle: {
          ...commonCellStyle,
        },
      },
    },
    {
      header: 'Ngày kết thúc',
      accessorKey: 'endDate',
      cell: ({ row }) => formatDate(row.original.endDate as string),
      meta: {
        headStyle: {
          padding: '0 16px',
        },
        cellStyle: {
          ...commonCellStyle,
        },
      },
    },
    {
      header: 'Tổng tiền',
      accessorKey: 'totalPrice',
      cell: ({ row }) => formatCurrency(row.original.totalAmount),
      meta: {
        headStyle: {
          padding: '0 16px',
        },
        cellStyle: {
          ...commonCellStyle,
        },
      },
    },
    {
      header: 'Trạng thái',
      accessorKey: 'status',
      meta: {
        headStyle: {
          // padding: '0 16px',
        },
        cellStyle: {
          ...commonCellStyle,
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
          router.push(`/rentals/${id}/detail`)
        },
      }}
    />
  )
}

export { RentalList }
