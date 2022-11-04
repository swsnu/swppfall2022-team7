import { AppstoreOutlined, AuditOutlined, CalendarOutlined, HomeOutlined, PieChartOutlined, PlusOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu, MenuProps } from 'antd';
import React, { useState } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

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
  const navigate = useNavigate();
  const { projectId } = useParams();

  const onClick: MenuProps['onClick'] = e => {
    setMenuSelected(e.key);
    if (projectId === undefined) return;
    if (e.key === '1') navigate(`/projects/${projectId}`);
    else if (e.key === '3') navigate(`/projects/${projectId}/tasks/1`);
    else navigate(`/projects/${projectId}`);
  };

  return (
    <div className="project-main">
      <div className="project-main-left">
        <div className="project-intro">
          <div className="project-name">Summary of <br></br>Thousands Brains</div>
          <div className="project-subject">Scientific Tech and Writing</div>
        </div>
        <Menu
          title='Header'
          onClick={onClick}
          style={{ width: 256, height: 'calc(100% - 100px)' }}
          defaultSelectedKeys={['1']}
          mode="inline"
          items={items}
          className="project-main-menu"
          selectedKeys={[menuSelected]}
        />
      </div>
      <Outlet />
    </div>
  );
};

export default ProjectMain;
