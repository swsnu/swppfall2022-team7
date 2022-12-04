import { AppstoreOutlined, AuditOutlined, CalendarOutlined, HomeOutlined, PieChartOutlined, PlusOutlined, SettingOutlined } from '@ant-design/icons';
import { TaskType } from '@store/zustand/task';
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

export const items: (name: string, tasks: TaskType[]) => MenuProps['items'] = (name, tasks) => [
  getItem(name, 'intro', <HomeOutlined />),
  getItem('Task List', 'tasks', <AppstoreOutlined />, [
    ...tasks.map(task => getItem(task.name, `tasks/${task.id}`)),
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
