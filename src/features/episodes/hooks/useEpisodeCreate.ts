import { createEpisode } from '@/libs/api/episodes'
import { ErrorTypeResponse } from '@/libs/types/axios'
import { useMutation } from '@tanstack/react-query'
import { UseFormSetError } from 'react-hook-form'
import { EpisodeCreateInputType } from '../type'

export const useEpisodeCreate = (setError: UseFormSetError<EpisodeCreateInputType>) => {
  const handleMutationError = (error: ErrorTypeResponse) => {
    const { data: responseData } = error.response || {}
    const errorValidation = responseData?.errors

    if (errorValidation) {
      Object.entries(errorValidation).forEach(([key, message]) => {
        if (message) {
          setError(key as keyof EpisodeCreateInputType, { message })
        }
      })
    }
  }

  const mutation = useMutation({
    mutationFn: createEpisode,
    onError: handleMutationError,
  })

  return mutation
}
