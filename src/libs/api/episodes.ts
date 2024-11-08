import {
  EpisodeCreateInputType,
  EpisodeDetailResponseType,
  EpisodeListQueryInputType,
  EpisodeListType,
  EpisodeUpdateInputType,
  QueryInputEpisodeDetailType,
} from '@/features/episodes'
import request from '../config/axios'

const formData = (data: EpisodeCreateInputType | EpisodeUpdateInputType | any): FormData => {
  const formData = new FormData()
  if ('title' in data) formData.append('title', data.title as string)
  if ('album' in data) formData.append('album', data.album as string)
  if ('artist' in data) formData.append('artist', data.artist as string)
  if ('description' in data) formData.append('description', data.description as string)
  if ('isPremium' in data) formData.append('isPremium', data.isPremium)
  if ('isTop' in data) formData.append('isTop', data.isTop)
  if ('artwork' in data && data.artwork) formData.append('artwork', data.artwork)
  if ('file' in data && data.file) formData.append('file', data.file)
  if ('url' in data && data.url) formData.append('url', data.url)
  if ('audioFile' in data && data.audioFile) formData.append('audioFile', data.audioFile)
  if ('chapterId' in data && data.chapterId) formData.append('chapterId', data.chapterId)
  return formData
}

export const getListEpisodes = async (params: EpisodeListQueryInputType) => {
  const { page, limit, filter } = params
  try {
    const response = await request.get<EpisodeListType>('/episodes', {
      params: {
        page,
        limit,
        filter,
      },
    })
    return response.data
  } catch (error) {
    throw error
  }
}

export const getEpisode = async (_id: string) => {
  try {
    const response = await request.get<EpisodeDetailResponseType>(`/episodes/${_id}`)
    return response.data.data
  } catch (error) {
    throw error
  }
}

export const createEpisode = async (data: EpisodeCreateInputType) => {
  try {
    const response = await request.post('/episodes', data)
    return response.data
  } catch (error) {
    throw error
  }
}

export const updateEpisode = async (data: EpisodeUpdateInputType) => {
  try {
    const { _id, ...dataRequest } = data
    const response = await request.patch(`/episodes/${_id}`, dataRequest)
    return response.data
  } catch (error) {
    throw error
  }
}

export const getEpisodeDetail = async ({ column, episodeId }: QueryInputEpisodeDetailType) => {
  try {
    const response = await request.get<EpisodeDetailResponseType>(`/episodes/${episodeId}`, {
      params: {
        column,
      },
    })
    return response.data.data
  } catch (error) {
    throw error
  }
}

export const deleteEpisode = async (episodeId: string) => {
  try {
    const response = await request.delete(`/episodes/${episodeId}`)
    return response.data
  } catch (error) {
    throw error
  }
}

export const updateTopEpisode = async (episodeId: string) => {
  try {
    const response = await request.patch(`/episodes/${episodeId}/update/is-top`)
    return response.data
  } catch (error) {
    throw error
  }
}
