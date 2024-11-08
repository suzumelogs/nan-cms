import { updateChapter } from '@/libs/api/chapters'
import { ErrorTypeResponse } from '@/libs/types/axios'
import { useMutation } from '@tanstack/react-query'
import { UseFormSetError } from 'react-hook-form'
import { ChapterUpdateInputType } from '../type'

export const useChapterUpdate = (setError: UseFormSetError<ChapterUpdateInputType>) => {
  const handleMutationError = (error: ErrorTypeResponse) => {
    const { data: responseData } = error.response || {}
    const errorValidation = responseData?.errors

    if (errorValidation) {
      Object.entries(errorValidation).forEach(([key, message]) => {
        if (message) {
          setError(key as keyof ChapterUpdateInputType, { message })
        }
      })
    }
  }
  const mutation = useMutation({
    mutationFn: updateChapter,
    onError: handleMutationError,
  })

  return mutation
}
