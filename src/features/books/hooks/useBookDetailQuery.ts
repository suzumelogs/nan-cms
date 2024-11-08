import { getBookDetail } from '@/libs/api/books'
import { useTableContext } from '@/libs/components/Table'
import { useQuery } from '@tanstack/react-query'
import { BookDetailResponseType, QueryInputBookDetailType } from '../type'

export const useBookDetailQuery = (bookId: string) => {
  const { sortOptions } = useTableContext<BookDetailResponseType, QueryInputBookDetailType>()

  const { data, error, isLoading } = useQuery({
    queryKey: ['book-detail', bookId, sortOptions?.sort_by, sortOptions?.column],
    queryFn: () => getBookDetail({ bookId, ...sortOptions }),
  })

  return { data, error, isLoading }
}
