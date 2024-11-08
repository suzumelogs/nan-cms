'use client'

import { EpisodeSearchInputType } from '@/features/episodes'
import { FilterBar, FilterColumn } from '@/libs/components/Table/FilterBar'
import { ExVoid } from '@/libs/types/utils'
import { Box, Modal, Stack, Typography } from '@mui/material'
import React from 'react'
import { DiscountForm } from './DiscountForm'

const DiscountFilter = () => {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    p: 4,
    border: 'none',
  }

  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const filterColumn: FilterColumn<ExVoid<EpisodeSearchInputType>>[] = [
    {
      field: 'filter',
      type: 'text',
      placeholder: 'Tìm kiếm',
      defaultValue: '',
      sx: { width: 240 },
      fieldOptions: {
        searchIcon: true,
        hasLine: true,
      },
    },
  ]

  return (
    <Stack spacing={3}>
      <Typography color="mono.600" variant="h2">
        Danh sách phiếu giảm giá
      </Typography>

      <FilterBar columns={filterColumn} onCreate={handleOpen} buttonSearchUnderButtonCreate />

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <DiscountForm />
        </Box>
      </Modal>
    </Stack>
  )
}

export { DiscountFilter }
