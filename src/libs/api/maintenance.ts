import request from '../config/axios'

export const getListMaintenances = async (params: any) => {
  const { page, limit, filter } = params
  try {
    const response = await request.get<any>('/maintenances/all/pagination', {
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

export const getMaintenance = async (id: string) => {
  try {
    const response = await request.get<any>(`/maintenances/get-by/${id}`)
    return response.data.data
  } catch (error) {
    throw error
  }
}

export const createMaintenance = async (data: any) => {
  const maintenanceData = {
    ...data,
  }

  try {
    const response = await request.post('/maintenances/create', maintenanceData)
    return response.data
  } catch (error) {
    throw error
  }
}

export const updateMaintenance = async (data: any) => {
  try {
    const { id, ...dataRequest } = data

    const updatedData = {
      ...dataRequest,
    }

    const response = await request.patch(`/maintenances/update/${id}`, updatedData)
    return response.data
  } catch (error) {
    throw error
  }
}

export const deleteMaintenance = async (maintenanceId: string) => {
  try {
    const response = await request.delete(`/maintenances/remove/${maintenanceId}`)
    return response.data
  } catch (error) {
    throw error
  }
}

export const getMaintenanceValueLabels = async () => {
  try {
    const response = await request.get('/maintenances/value-labels/maintenance')
    return response.data
  } catch (error) {
    throw error
  }
}
