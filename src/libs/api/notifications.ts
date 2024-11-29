import { NotificationsResponse } from '@/libs/components/Layout/Header/Notification/type'
import request from '../config/axios'

export const getNotifications = async () => {
  const response = await request.get<NotificationsResponse>('/notifications')
  return response.data.data
}
