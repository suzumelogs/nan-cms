import { deleteBook } from '@/libs/api/books'
import { useMutation } from '@tanstack/react-query'

export const useDeleteBook = () => {
  const { mutate } = useMutation({
    mutationFn: deleteBook,
  })

  return {
    deleteBook: mutate,
  }
}
