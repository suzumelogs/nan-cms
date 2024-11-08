import { getDiscounts } from '@/libs/api/discounts'
import { useTableContext } from '@/libs/components/Table'
import { PaginationType } from '@/libs/types/pagination'
import { useQuery } from '@tanstack/react-query'
import { DiscountType } from '../type'

export const useGetDiscounts = () => {
  const { input, getTableData, sortOptions } = useTableContext<DiscountType, PaginationType>()
  const { page, limit } = input
  const { sort_by, column } = sortOptions || {}

  const data = useQuery({
    queryKey: ['discounts', page, limit, sort_by, column],
    queryFn: () => getDiscounts({ ...input, ...sortOptions }),
  })

  console.log(data)

  return {
    tableData: getTableData(data),
    totalPages: data.data?.totalPages || 0,
  }
}
