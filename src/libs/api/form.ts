import request from '../config/axios'

type UploadResponse = {
  path: string
}

export const uploadAudio = async (file: File) => {
  const formData = new FormData()
  formData.append('file', file)

  const response = await request.post<UploadResponse>('/uploads/audio', formData)

  return response.data
}

export const uploadImage = async (file: File) => {
  const formData = new FormData()
  formData.append('file', file)

  const response = await request.post<UploadResponse>('/uploads/image', formData)

  return response.data
}

export const loadStream = async (url: string) => {
  const response = await request.get<UploadResponse>('/episodes/stream/preview-image', {
    params: {
      path: url,
    },
  })

  return response.data
}
