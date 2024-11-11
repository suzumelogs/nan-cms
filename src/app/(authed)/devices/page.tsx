import { DeviceFilter, DeviceList } from '@/features/devices'
import { TableProvider } from '@/libs/components/Table'

export default function Page() {
  return (
    <TableProvider>
      <DeviceFilter />
      <DeviceList />
    </TableProvider>
  )
}
