import { updateTop10YearBook } from '@/libs/api/books'
import { useMutation } from '@tanstack/react-query'

export const useUpdateTop10YearBook = () => {
  const { mutate } = useMutation({
    mutationFn: updateTop10YearBook,
  })

  return {
    updateTop10YearBook: mutate,
  }
}
