'use client'

import { DatePicker } from '@/libs/components/DatePicker'
import { Input } from '@/libs/components/Form'
import { ButtonCreate } from '@/libs/components/Table/styled'
import { zodResolver } from '@hookform/resolvers/zod'
import { Stack, Typography } from '@mui/material'
import { useQueryClient } from '@tanstack/react-query'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useCreateDiscount } from '../hooks'
import { DiscountInputSchema, DiscountInputType } from '../type'

export const DiscountForm = () => {
  const queryClient = useQueryClient()
  const { control, handleSubmit } = useForm<DiscountInputType>({
    defaultValues: {
      code: '',
      discountRate: '',
      maxUsage: '',
      validFrom: '',
      validTo: '',
    },
    resolver: zodResolver(DiscountInputSchema),
  })

  const { mutate } = useCreateDiscount()

  const onSubmit: SubmitHandler<DiscountInputType> = (data) => {
    mutate(
      {
        ...data,
        discountRate: +data.discountRate,
        maxUsage: +data.maxUsage,
      },
      {
        onSuccess: () => {
          queryClient.refetchQueries({ queryKey: ['discounts'] })
          alert('Create discount successfully')
        },
        onError: (error) => {
          alert(error.message)
        },
      },
    )
  }

  return (
    <Stack spacing={2}>
      <Typography variant="h2" color="mono.600">
        Discount Form
      </Typography>

      <Stack component="form" spacing={2} onSubmit={handleSubmit(onSubmit)}>
        <Input control={control} name="code" label="Code" />

        <Input control={control} name="discountRate" label="Discount Rate" />

        <Input control={control} name="maxUsage" label="Max Usage" />

        <DatePicker control={control} name="validFrom" label="Valid From" />

        <DatePicker control={control} name="validTo" label="Valid To" />

        <ButtonCreate type="submit">Create</ButtonCreate>
      </Stack>
    </Stack>
  )
}
