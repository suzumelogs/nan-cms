import { getListChapters } from '@/libs/api/chapters'
import { useTableContext } from '@/libs/components/Table'
import { useQuery } from '@tanstack/react-query'
import { ChapterSearchInputType, ChapterType } from '../type'

export const useChapterListQuery = () => {
  const { input, getTableData, sortOptions } = useTableContext<
    ChapterType,
    ChapterSearchInputType
  >()
  const { page, limit, filter } = input
  const { sort_by, column } = sortOptions || {}

  const data = useQuery({
    queryKey: ['chapter-list', page, filter, limit, sort_by, column],
    queryFn: () => getListChapters({ ...input, limit, ...sortOptions }),
  })

  return {
    tableData: getTableData(data),
    totalPages: data.data?.pagination?.totalPages || 0,
  }
}
