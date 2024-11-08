import { getEpisodeDetail } from '@/libs/api/episodes'
import { useTableContext } from '@/libs/components/Table'
import { useQuery } from '@tanstack/react-query'
import { EpisodeDetailResponseType, QueryInputEpisodeDetailType } from '../type'

export const useEpisodeDetailQuery = (episodeId: string) => {
  const { sortOptions } = useTableContext<EpisodeDetailResponseType, QueryInputEpisodeDetailType>()

  const { data, error, isLoading } = useQuery({
    queryKey: ['episode-detail', episodeId, sortOptions?.sort_by, sortOptions?.column],
    queryFn: () => getEpisodeDetail({ episodeId, ...sortOptions }),
  })

  return { data, error, isLoading }
}
