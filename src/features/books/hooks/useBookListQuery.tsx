import { getListBooks } from '@/libs/api/books'
import { useTableContext } from '@/libs/components/Table'
import { useQuery } from '@tanstack/react-query'
import { BookSearchInputType, BookType } from '../type'

export const useBookListQuery = () => {
  const { input, getTableData, sortOptions } = useTableContext<BookType, BookSearchInputType>()
  const { page, limit, filter } = input
  const { sort_by, column } = sortOptions || {}

  const data = useQuery({
    queryKey: ['book-list', page, filter, limit, sort_by, column],
    queryFn: () => getListBooks({ ...input, limit, ...sortOptions }),
  })

  return {
    tableData: getTableData(data),
    totalPages: data.data?.pagination?.totalPages || 0,
  }
}
