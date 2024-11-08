import { getBookValueLabels } from '@/libs/api/books'
import { useQuery } from '@tanstack/react-query'

export const useBookValueLabel = () => {
  const data = useQuery({
    queryKey: ['book-value-label'],
    queryFn: () => getBookValueLabels(),
  })
  return data
}
