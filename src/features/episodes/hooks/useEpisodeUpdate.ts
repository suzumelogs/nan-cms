import { updateEpisode } from '@/libs/api/episodes'
import { ErrorTypeResponse } from '@/libs/types/axios'
import { useMutation } from '@tanstack/react-query'
import { UseFormSetError } from 'react-hook-form'
import { EpisodeUpdateInputType } from '../type'

export const useEpisodeUpdate = (setError: UseFormSetError<EpisodeUpdateInputType>) => {
  const handleMutationError = (error: ErrorTypeResponse) => {
    const { data: responseData } = error.response || {}
    const errorValidation = responseData?.errors

    if (errorValidation) {
      Object.entries(errorValidation).forEach(([key, message]) => {
        if (message) {
          setError(key as keyof EpisodeUpdateInputType, { message })
        }
      })
    }
  }
  const mutation = useMutation({
    mutationFn: updateEpisode,
    onError: handleMutationError,
  })

  return mutation
}
