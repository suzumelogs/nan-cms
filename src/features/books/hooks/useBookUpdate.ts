import { updateBook } from '@/libs/api/books'
import { ErrorTypeResponse } from '@/libs/types/axios'
import { useMutation } from '@tanstack/react-query'
import { UseFormSetError } from 'react-hook-form'
import { BookUpdateInputType } from '../type'

export const useBookUpdate = (setError: UseFormSetError<BookUpdateInputType>) => {
  const handleMutationError = (error: ErrorTypeResponse) => {
    const { data: responseData } = error.response || {}
    const errorValidation = responseData?.errors

    if (errorValidation) {
      Object.entries(errorValidation).forEach(([key, message]) => {
        if (message) {
          setError(key as keyof BookUpdateInputType, { message })
        }
      })
    }
  }
  const mutation = useMutation({
    mutationFn: updateBook,
    onError: handleMutationError,
  })

  return mutation
}
