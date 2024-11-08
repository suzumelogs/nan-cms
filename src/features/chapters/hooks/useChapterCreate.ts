import { createChapter } from '@/libs/api/chapters'
import { ErrorTypeResponse } from '@/libs/types/axios'
import { useMutation } from '@tanstack/react-query'
import { UseFormSetError } from 'react-hook-form'
import { ChapterCreateInputType } from '../type'

export const useChapterCreate = (setError: UseFormSetError<ChapterCreateInputType>) => {
  const handleMutationError = (error: ErrorTypeResponse) => {
    const { data: responseData } = error.response || {}
    const errorValidation = responseData?.errors

    if (errorValidation) {
      Object.entries(errorValidation).forEach(([key, message]) => {
        if (message) {
          setError(key as keyof ChapterCreateInputType, { message })
        }
      })
    }
  }

  const mutation = useMutation({
    mutationFn: createChapter,
    onError: handleMutationError,
  })

  return mutation
}
