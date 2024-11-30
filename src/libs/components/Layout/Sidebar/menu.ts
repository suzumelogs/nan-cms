import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import BuildIcon from '@mui/icons-material/Build'
import CategoryIcon from '@mui/icons-material/Category'
import DevicesIcon from '@mui/icons-material/Devices'
import EventAvailableIcon from '@mui/icons-material/EventAvailable'
import HistoryIcon from '@mui/icons-material/History'
import InventoryIcon from '@mui/icons-material/Inventory'
import PersonIcon from '@mui/icons-material/Person'
import PolicyIcon from '@mui/icons-material/Policy'
import ReportProblemIcon from '@mui/icons-material/ReportProblem'
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
    href: '/categories',
    title: 'Danh mục',
    icon: CategoryIcon,
    active_icon: CategoryIcon,
  },
  {
    href: '/users',
    title: 'Người dùng',
    icon: PersonIcon,
    active_icon: PersonIcon,
  },
  {
    href: '/equipments',
    title: 'Thiết bị',
    icon: DevicesIcon,
    active_icon: DevicesIcon,
  },
  {
    href: '/package',
    title: 'Gói thiết bị',
    icon: InventoryIcon,
    active_icon: InventoryIcon,
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
    href: '/damage-reports',
    title: 'Báo cáo hỏng',
    icon: ReportProblemIcon,
    active_icon: ReportProblemIcon,
  },
  {
    href: '/repair-records',
    title: 'Lịch sử sửa chữa',
    icon: HistoryIcon,
    active_icon: HistoryIcon,
  },
  {
    href: '/usage-records',
    title: 'Lịch sử sử dụng',
    icon: HistoryIcon,
    active_icon: HistoryIcon,
  },
  {
    href: '/rentals',
    title: 'Đơn thuê',
    icon: EventAvailableIcon,
    active_icon: EventAvailableIcon,
  },
  {
    href: '/discounts',
    title: 'Mã giảm giá',
    icon: AttachMoneyIcon,
    active_icon: AttachMoneyIcon,
  },
]
