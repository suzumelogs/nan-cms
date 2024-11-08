import BookmarksIcon from '@mui/icons-material/Bookmarks'
import CategoryIcon from '@mui/icons-material/Category'
import ImportContactsIcon from '@mui/icons-material/ImportContacts'
import UserIcon from '@mui/icons-material/Person'
import StackedLineChartIcon from '@mui/icons-material/StackedLineChart'
import ViewStreamIcon from '@mui/icons-material/ViewStream'

export type MenuType = {
  title: string
  icon: React.ElementType | React.ReactNode
  href: string
  active_icon: React.ElementType | React.ReactNode
  disabled?: boolean
  subHref?: string
}

export const menus: MenuType[] = [
  {
    href: '/',
    title: 'Tổng quan',
    subHref: 'dashboard',
    icon: StackedLineChartIcon,
    active_icon: StackedLineChartIcon,
  },
  {
    href: '/users',
    title: 'Người dùng',
    icon: UserIcon,
    active_icon: UserIcon,
  },
  {
    href: '/categories',
    title: 'Danh mục',
    icon: CategoryIcon,
    active_icon: CategoryIcon,
  },
  {
    href: '/books',
    title: 'Sách',
    icon: ImportContactsIcon,
    active_icon: ImportContactsIcon,
  },
  {
    href: '/chapters',
    title: 'Chương',
    icon: BookmarksIcon,
    active_icon: BookmarksIcon,
  },
  {
    href: '/episodes',
    title: 'Tập',
    icon: ViewStreamIcon,
    active_icon: ViewStreamIcon,
  },
]
