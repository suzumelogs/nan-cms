import { createDiscount } from '@/libs/api/discounts'
import { useMutation } from '@tanstack/react-query'

export const useCreateDiscount = () => {
  const mutation = useMutation({
    mutationFn: createDiscount,
  })

  return mutation
}
