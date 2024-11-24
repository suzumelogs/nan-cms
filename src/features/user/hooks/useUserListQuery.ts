import { getListUsers } from '@/libs/api/user'
import { useTableContext } from '@/libs/components/Table'
import { useQuery } from '@tanstack/react-query'
import { UserSearchInputType, UserType } from '..'

export const useUserListQuery = () => {
  const { input, getTableData, sortOptions } = useTableContext<UserType, UserSearchInputType>()
  const { page, limit } = input
  const { sort_by, column } = sortOptions || {}

  const data = useQuery({
    queryKey: ['userList', page, limit, sort_by, column],
    queryFn: () => getListUsers({ ...input, ...sortOptions }),
  })

  return {
    tableData: getTableData(data),
    totalPages: data.data?.total || 0,
  }
}
