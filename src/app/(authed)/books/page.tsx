import { BookFilter, BookList } from '@/features/books'
import { TableProvider } from '@/libs/components/Table'

export default function Page() {
  return (
    <TableProvider>
      <BookFilter />
      <BookList />
    </TableProvider>
  )
}
