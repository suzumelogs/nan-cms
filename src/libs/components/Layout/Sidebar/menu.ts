import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import BuildIcon from '@mui/icons-material/Build'
import CategoryIcon from '@mui/icons-material/Category'
import DevicesIcon from '@mui/icons-material/Devices'
import EventAvailableIcon from '@mui/icons-material/EventAvailable'
import UserIcon from '@mui/icons-material/Person'
import PolicyIcon from '@mui/icons-material/Policy'
import StackedLineChartIcon from '@mui/icons-material/StackedLineChart'

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
    title: 'Gói thiết bị',
    icon: CategoryIcon,
    active_icon: CategoryIcon,
  },
  {
    href: '/devices',
    title: 'Thiết bị',
    icon: DevicesIcon,
    active_icon: DevicesIcon,
  },
  {
    href: '/rentals',
    title: 'Thuê',
    icon: EventAvailableIcon,
    active_icon: EventAvailableIcon,
  },
  {
    href: '/policies',
    title: 'Chính sách',
    icon: PolicyIcon,
    active_icon: PolicyIcon,
  },
  {
    href: '/maintenances',
    title: 'Bảo trì',
    icon: BuildIcon,
    active_icon: BuildIcon,
  },
  {
    href: '/discounts',
    title: 'Mã giảm giá',
    icon: AttachMoneyIcon,
    active_icon: AttachMoneyIcon,
  },
]
