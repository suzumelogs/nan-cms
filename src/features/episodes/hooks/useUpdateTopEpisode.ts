import { updateTopEpisode } from '@/libs/api/episodes'
import { useMutation } from '@tanstack/react-query'

export const useUpdateTopEpisode = () => {
  const { mutate } = useMutation({
    mutationFn: updateTopEpisode,
  })

  return {
    updateTopEpisode: mutate,
  }
}
