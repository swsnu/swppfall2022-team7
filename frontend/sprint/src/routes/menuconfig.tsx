import { AppstoreOutlined, AuditOutlined, CalendarOutlined, HomeOutlined, PieChartOutlined, PlusOutlined, SettingOutlined } from '@ant-design/icons';
import { MenuProps } from 'antd';

export type MenuItem = Required<MenuProps>['items'][number];

export const getItem = (label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'): MenuItem => {
  const ret: MenuItem = {
    key,
    icon,
    children,
    label,
    type
  };
  return ret;
};

export const items: MenuProps['items'] = [
  getItem('Scientific Tech and Writing', 'intro', <HomeOutlined />),
  getItem('Task List', 'tasks', <AppstoreOutlined />, [
    getItem('Write First Draft', 'tasks/1'),
    getItem('Write Second Draft', 'tasks/2'),
    getItem('Write Final Draft', 'tasks/3'),
    getItem('Add New Task', 'add_task', <PlusOutlined />)
  ]),
  getItem('Contribution', 'contrib', <PieChartOutlined />),
  getItem('Project Documents', 'docs', <AuditOutlined />),
  getItem('Project Calendar', 'cal', <CalendarOutlined />),
  getItem('Manage Project', 'settings', <SettingOutlined />)
];

export const menuIdList = [
  'add_task',
  'contrib',
  'docs',
  'cal',
  'settings'
];
