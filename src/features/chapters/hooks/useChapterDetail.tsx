import { getChapter } from '@/libs/api/chapters'
import { useQuery } from '@tanstack/react-query'

export const useChapterDetail = (_id: string) => {
  const data = useQuery({
    queryKey: ['chapter-detail', _id],
    queryFn: () => getChapter(_id),
    enabled: !!_id,
  })

  return data
}
