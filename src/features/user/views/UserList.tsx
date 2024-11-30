'use client'

import { ReactTable } from '@/libs/components/Table'
import { ColumnDef } from '@tanstack/react-table'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useUserListQuery } from '../hooks'
import { UserType } from '../type'

const UserList = () => {
  const { tableData, totalPages } = useUserListQuery()
  const router = useRouter()

  const commonCellStyle = {
    fontSize: 14,
    lineHeight: '20px',
    fontWeight: 400,
    padding: '8px 16px',
  }

  const columns: ColumnDef<UserType>[] = [
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
      header: 'Tên danh mục',
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
      header: 'Email',
      accessorKey: 'email',
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
      header: 'Chứng minh thư',
      accessorKey: 'identityDoc',
      cell: ({ row }) => {
        return row.original.identityDoc ? (
          <Image src={row.original.identityDoc} alt="Chứng minh thư" width={100} height={100} />
        ) : null
      },
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
      header: 'Số điện thoại',
      accessorKey: 'phoneNumber',
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
      header: 'Giới tính',
      accessorKey: 'gender',
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
      header: 'Đã xác thực',
      accessorKey: 'statusIdentityDoc',
      cell: ({ row }) => {
        switch (row.original.statusIdentityDoc) {
          case 'verified':
            return 'Đã xác thực'
          case 'rejected':
            return 'Chưa xác thực'
          default:
            if (row.original.identityDoc) {
              return 'Chưa xác thực'
            } else {
              return 'Chưa cung cấp CMND'
            }
        }
      },
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
      header: 'Quyền',
      accessorKey: 'role',
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
  ]

  return (
    <ReactTable
      {...tableData}
      columns={columns}
      next={totalPages}
      action={{
        disabledDetail: false,
        onDetail: (id) => {
          router.push(`/users/${id}/detail`)
        },
      }}
    />
  )
}

export { UserList }
