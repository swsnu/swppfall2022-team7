import { items, menuIdList } from '@routes/menuconfig';
import { Menu, MenuProps } from 'antd';
import React from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

const ProjectMain: React.FC = () => {
  const navigate = useNavigate();
  const { projectId, menuId, taskId } = useParams();

  const onSelect: MenuProps['onSelect'] = ({ key }: { key: string }) => {
    if (projectId === undefined) return;
    if (menuIdList.find(id => id === key) !== undefined) navigate(`/projects/${projectId}/${key}`);
    else if (key === 'intro') navigate(`/projects/${projectId}`);
    else navigate(`/projects/${projectId}/${key}`);
  };

  const selectedKey: () => string = () => {
    if (taskId !== undefined) return 'tasks/' + taskId;
    if (menuId !== undefined) return menuId;
    return 'intro';
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
          onSelect={onSelect}
          style={{ width: 256, height: 'calc(100vh - 164px)' }}
          defaultSelectedKeys={[projectId ?? '']}
          mode="inline"
          items={items}
          className="project-main-menu"
          selectedKeys={[selectedKey()]}
        />
      </div>
      <Outlet />
    </div>
  );
};

export default ProjectMain;
