import { createBook } from '@/libs/api/books'
import { ErrorTypeResponse } from '@/libs/types/axios'
import { useMutation } from '@tanstack/react-query'
import { UseFormSetError } from 'react-hook-form'
import { BookCreateInputType } from '../type'

export const useBookCreate = (setError: UseFormSetError<BookCreateInputType>) => {
  const handleMutationError = (error: ErrorTypeResponse) => {
    const { data: responseData } = error.response || {}
    const errorValidation = responseData?.errors

    if (errorValidation) {
      Object.entries(errorValidation).forEach(([key, message]) => {
        if (message) {
          setError(key as keyof BookCreateInputType, { message })
        }
      })
    }
  }

  const mutation = useMutation({
    mutationFn: createBook,
    onError: handleMutationError,
  })

  return mutation
}
