'use client'

import { getNotifications } from '@/libs/api/notifications'
import NotificationsIcon from '@mui/icons-material/Notifications'
import {
  Badge,
  CircularProgress,
  Divider,
  IconButton,
  Popover,
  Stack,
  Typography,
} from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import { isEmpty } from 'lodash'
import { Fragment, useState } from 'react'

export const Notification: React.FC = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['NOTIFICATION'],
    queryFn: getNotifications,
  })

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  return (
    <Fragment>
      <IconButton onClick={handleClick}>
        <Badge badgeContent={data?.length ?? 0} color="error" invisible={isEmpty(data)}>
          <NotificationsIcon />
        </Badge>
      </IconButton>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        disableScrollLock
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        PaperProps={{
          sx: {
            width: 400,
            maxHeight: 400,
          },
        }}
      >
        {isLoading ? (
          <CircularProgress />
        ) : isEmpty(data) ? (
          <Typography>No notifications</Typography>
        ) : (
          <>
            {data &&
              data?.map((item) => (
                <Stack key={item.id} p={2}>
                  <Stack>
                    <Typography fontWeight={700}>{item.message}</Typography>

                    <Typography fontSize={12}>
                      {format(new Date(item.createdAt), 'dd/MM/yyyy')}
                    </Typography>
                  </Stack>

                  <Divider />
                </Stack>
              ))}
          </>
        )}
      </Popover>
    </Fragment>
  )
}
