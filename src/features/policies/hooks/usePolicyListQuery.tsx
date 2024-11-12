import { getListPolicies } from '@/libs/api/policy'
import { useTableContext } from '@/libs/components/Table'
import { useQuery } from '@tanstack/react-query'
import { PolicySearchInputType, PolicyType } from '../type'

export const usePolicyListQuery = () => {
  const { input, getTableData, sortOptions } = useTableContext<PolicyType, PolicySearchInputType>()
  const { page, limit, filter } = input
  const { sort_by, column } = sortOptions || {}

  const data = useQuery({
    queryKey: ['policy-list', page, filter, limit, sort_by, column],
    queryFn: () => getListPolicies({ ...input, limit, ...sortOptions }),
  })

  return {
    tableData: getTableData(data),
    totalPages: data.data?.total || 0,
  }
}
