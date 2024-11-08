'use client'

import { ReactTable } from '@/libs/components/Table'
import { ColumnDef } from '@tanstack/react-table'
import { useRouter } from 'next/navigation'
import { useGetDiscounts } from '../hooks'
import { DiscountType } from '../type'

const DiscountList = () => {
  const { tableData, totalPages } = useGetDiscounts()
  const router = useRouter()

  const commonCellStyle = {
    fontSize: 14,
    lineHeight: '20px',
    fontWeight: 400,
    padding: '8px 16px',
  }

  const columns: ColumnDef<DiscountType>[] = [
    {
      header: 'ID',
      accessorFn: (row, index) => index + 1,
      meta: {
        width: 56,
        headStyle: {
          padding: '8px 24px',
        },
        cellStyle: {
          width: 56,
          textAlign: 'center',
          fontSize: 14,
          lineHeight: '20px',
          fontWeight: 400,
          padding: '8px',
        },
      },
    },
    {
      header: 'Code',
      accessorKey: 'code',
      meta: {
        headStyle: {
          padding: '8px 16px',
        },
        cellStyle: {
          ...commonCellStyle,
          width: 150,
        },
      },
    },
    {
      header: 'Discount Rate',
      accessorKey: 'discountRate',
      meta: {
        width: 100,
        headStyle: {
          padding: '8px',
        },
        cellStyle: {
          padding: '8px',
          textAlign: 'center',
          width: 100,
        },
      },
    },
    {
      header: 'validFrom',
      accessorKey: 'validFrom',
      meta: {
        headStyle: {
          padding: '8px 16px',
        },
        cellStyle: {
          ...commonCellStyle,
          width: 150,
        },
      },
    },
    {
      header: 'validTo',
      accessorKey: 'validTo',
      meta: {
        headStyle: {
          padding: '8px 16px',
        },
        cellStyle: {
          ...commonCellStyle,
          width: 150,
        },
      },
    },
    {
      header: 'maxUsage',
      accessorKey: 'maxUsage',
      meta: {
        headStyle: {
          padding: '8px 16px',
        },
        cellStyle: {
          ...commonCellStyle,
          width: 150,
        },
      },
    },
    {
      header: 'currentUsage',
      accessorKey: 'currentUsage',
      meta: {
        width: 180,
        headStyle: {
          padding: '8px 16px',
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
        onDetail: (_id) => {
          router.push(`/episodes/${_id}/detail`)
        },
      }}
    />
  )
}

export { DiscountList }
