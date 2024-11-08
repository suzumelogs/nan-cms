import { DiscountFilter, DiscountList } from '@/features/discounts'
import { TableProvider } from '@/libs/components/Table'

export default function Page() {
  return (
    <TableProvider>
      <DiscountFilter />
      <DiscountList />
    </TableProvider>
  )
}
