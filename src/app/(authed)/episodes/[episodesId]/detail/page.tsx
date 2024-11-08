import { EpisodeDetail } from '@/features/episodes'
import { TableProvider } from '@/libs/components/Table'

export default function Page() {
  return (
    <TableProvider>
      <EpisodeDetail />
    </TableProvider>
  )
}
