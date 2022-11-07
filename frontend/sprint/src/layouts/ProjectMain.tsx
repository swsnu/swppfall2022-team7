import { items, menuIdList } from '@routes/menuconfig';
import { selectProject } from '@store/slices/project';
import { Menu, MenuProps } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

const ProjectMain: React.FC = () => {
  const navigate = useNavigate();
  const projectState = useSelector(selectProject);
  const { projectId, menuId, taskId } = useParams();
  const project = projectState.find(project => project.id === parseInt(projectId ?? '0'));

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
          <div className="project-name">{project?.name}</div>
          <div className="project-subject">{project?.subject}</div>
        </div>
        <Menu
          title='Header'
          onSelect={onSelect}
          style={{ width: 256, height: 'calc(100vh - 164px)' }}
          defaultSelectedKeys={[projectId ?? '']}
          mode="inline"
          items={items(project?.name ?? '', project?.tasks ?? [])}
          className="project-main-menu"
          selectedKeys={[selectedKey()]}
        />
      </div>
      <Outlet />
    </div>
  );
};

export default ProjectMain;
