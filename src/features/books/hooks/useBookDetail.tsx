import { getBook } from '@/libs/api/books'
import { useQuery } from '@tanstack/react-query'

export const useBookDetail = (_id: string) => {
  const data = useQuery({
    queryKey: ['book-detail', _id],
    queryFn: () => getBook(_id),
    enabled: !!_id,
  })

  return data
}
