import { AppstoreOutlined, AuditOutlined, CalendarOutlined, HomeOutlined, PieChartOutlined, PlusOutlined, SettingOutlined } from '@ant-design/icons';
import ProjectIntro from '@components/ProjectIntro';
import { Menu, MenuProps } from 'antd';
import React, { useState } from 'react';

type MenuItem = Required<MenuProps>['items'][number];

const getItem = (label: React.ReactNode,
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

const items: MenuProps['items'] = [
  getItem('Scientific Tech and Writing', '1', <HomeOutlined />),
  getItem('Task List', '2', <AppstoreOutlined />, [
    getItem('Write First Draft', '3'),
    getItem('Write Second Draft', '4'),
    getItem('Write Final Draft', '5'),
    getItem('Add New Task', '6', <PlusOutlined />)
  ]),
  getItem('Contribution', '7', <PieChartOutlined />),
  getItem('Project Documents', '8', <AuditOutlined />),
  getItem('Project Calendar', '9', <CalendarOutlined />),
  getItem('Manage Project', '10', <SettingOutlined />)
];

const ProjectMain: React.FC = () => {
  const [menuSelected, setMenuSelected] = useState('1');

  const onClick: MenuProps['onClick'] = e => {
    setMenuSelected(e.key);
  };

  return (
    <div className="project-main">
      <Menu
        onClick={onClick}
        style={{ width: 256, height: '100%' }}
        defaultSelectedKeys={['1']}
        mode="inline"
        items={items}
        className="project-main-menu"
        selectedKeys={[menuSelected]}
      />
      <div className="project-main-right">
        {
          {
            1: <ProjectIntro />
          }[menuSelected]
        }
      </div>
    </div>
  );
};

export default ProjectMain;
