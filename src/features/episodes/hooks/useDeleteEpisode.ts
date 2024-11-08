import { deleteEpisode } from '@/libs/api/episodes'
import { useMutation } from '@tanstack/react-query'

export const useDeleteEpisode = () => {
  const { mutate } = useMutation({
    mutationFn: deleteEpisode,
  })

  return {
    deleteEpisode: mutate,
  }
}
