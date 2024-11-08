import { getEpisode } from '@/libs/api/episodes'
import { useQuery } from '@tanstack/react-query'

export const useEpisodeDetail = (_id: string) => {
  const data = useQuery({
    queryKey: ['episode-detail', _id],
    queryFn: () => getEpisode(_id),
    enabled: !!_id,
  })

  return data
}
