import { getListUser } from '@/libs/api/user'
import { useTableContext } from '@/libs/components/Table'
import { useQuery } from '@tanstack/react-query'
import { UserSearchInputType, UserType } from '..'

export const useUserListQuery = () => {
  const { input, getTableData, sortOptions } = useTableContext<UserType, UserSearchInputType>()
  const { page, limit, search, is_active, role } = input
  const { sort_by, column } = sortOptions || {}

  const data = useQuery({
    queryKey: ['userList', page, limit, search, sort_by, column, is_active, role],
    queryFn: () => getListUser({ ...input, ...sortOptions }),
  })

  return {
    tableData: getTableData(data),
  }
}
