import { deleteChapter } from '@/libs/api/chapters'
import { useMutation } from '@tanstack/react-query'

export const useDeleteChapter = () => {
  const { mutate } = useMutation({
    mutationFn: deleteChapter,
  })

  return {
    deleteChapter: mutate,
  }
}
