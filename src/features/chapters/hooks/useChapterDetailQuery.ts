import { getChapterDetail } from '@/libs/api/chapters'
import { useTableContext } from '@/libs/components/Table'
import { useQuery } from '@tanstack/react-query'
import { ChapterDetailResponseType, QueryInputChapterDetailType } from '../type'

export const useChapterDetailQuery = (chapterId: string) => {
  const { sortOptions } = useTableContext<ChapterDetailResponseType, QueryInputChapterDetailType>()

  const { data, error, isLoading } = useQuery({
    queryKey: ['chapter-detail', chapterId, sortOptions?.sort_by, sortOptions?.column],
    queryFn: () => getChapterDetail({ chapterId, ...sortOptions }),
  })

  return { data, error, isLoading }
}
