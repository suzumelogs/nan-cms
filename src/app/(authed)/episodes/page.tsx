import { EpisodeFilter, EpisodeList } from '@/features/episodes'
import { TableProvider } from '@/libs/components/Table'

export default function Page() {
  return (
    <TableProvider>
      <EpisodeFilter />
      <EpisodeList />
    </TableProvider>
  )
}
