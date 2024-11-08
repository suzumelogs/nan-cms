import { getChapterValueLabels } from '@/libs/api/chapters'
import { useQuery } from '@tanstack/react-query'

export const useChapterValueLabel = () => {
  const data = useQuery({
    queryKey: ['chapter-value-label'],
    queryFn: () => getChapterValueLabels(),
  })
  return data
}
