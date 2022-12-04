import { items, menuIdList } from '@routes/menuconfig';
import useBindStore from '@store/zustand';
import { Menu, MenuProps } from 'antd';
import React, { useEffect } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

const ProjectMain: React.FC = () => {
  const navigate = useNavigate();
  const { projectId, menuId, taskId } = useParams();

  const project = useBindStore(state => state.selectedProject);
  const selectProject = useBindStore(state => state.selectProject);
  useEffect(() => {
    if (projectId === undefined) return;
    void selectProject(parseInt(projectId));
  }, [projectId]);

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
          items={items(project?.name ?? '', project?.task_list ?? [])}
          className="project-main-menu"
          selectedKeys={[selectedKey()]}
        />
      </div>
      <Outlet />
    </div>
  );
};

export default ProjectMain;
