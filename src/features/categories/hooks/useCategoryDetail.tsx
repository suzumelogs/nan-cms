import { getCategory } from '@/libs/api/categories'
import { useQuery } from '@tanstack/react-query'

export const useCategoryDetail = (_id: string) => {
  const data = useQuery({
    queryKey: ['category-detail', _id],
    queryFn: () => getCategory(_id),
    enabled: !!_id,
  })

  return data
}
