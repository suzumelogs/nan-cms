import { getListEquipments } from '@/libs/api/equipments'
import { useTableContext } from '@/libs/components/Table'
import { useQuery } from '@tanstack/react-query'
import { EquipmentSearchInputType, EquipmentType } from '../type'

export const useEquipmentListQuery = () => {
  const { input, getTableData, sortOptions } = useTableContext<
    EquipmentType,
    EquipmentSearchInputType
  >()
  const { page, limit, filter } = input
  const { sort_by, column } = sortOptions || {}

  const data = useQuery({
    queryKey: ['equipments-list', page, filter, limit, sort_by, column],
    queryFn: () => getListEquipments({ ...input, limit, ...sortOptions }),
  })

  return {
    tableData: getTableData(data),
    totalPages: data.data?.total || 0,
  }
}
