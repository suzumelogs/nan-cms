import { getListCategories } from '@/libs/api/categories'
import { useTableContext } from '@/libs/components/Table'
import { useQuery } from '@tanstack/react-query'
import { CategorySearchInputType, CategoryType } from '../type'

export const useCategoryListQuery = () => {
  const { input, getTableData, sortOptions } = useTableContext<
    CategoryType,
    CategorySearchInputType
  >()
  const { page, limit, filter } = input
  const { sort_by, column } = sortOptions || {}

  const data = useQuery({
    queryKey: ['category-list', page, filter, limit, sort_by, column],
    queryFn: () => getListCategories({ ...input, limit, ...sortOptions }),
  })

  return {
    tableData: getTableData(data),
    totalPages: data.data?.pagination?.totalPages || 0,
  }
}
