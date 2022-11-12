import { selectProject } from '@store/slices/project';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import React, { useMemo } from 'react';
import type { BadgeProps } from 'antd';
import { Badge, Calendar } from 'antd';
import type { Moment } from 'moment';
import moment from 'moment';

interface ListDataType {
  type: string
  content: string
}

const ProjectCalendar: React.FC = () => {
  const { projectId } = useParams();
  const projectState = useSelector(selectProject);
  const projectInfo = useMemo(() => (
    projectState.find(project => project.id === parseInt(projectId ?? '0'))
  ), [projectId]);
  const tasks = useMemo(() => (
    projectState.find(project => project.id === parseInt(projectId ?? '0'))?.tasks
  ), [projectId]);

  const getListData = (value: Moment): ListDataType[] => {
    const listData: ListDataType[] = [];
    tasks?.forEach(task => {
      if (moment(task.dueDate).month() === value.month()) {
        if (parseInt(task.dueDate.substring(8, 10)) === value.date()) {
          const t = task.status === 'ongoing' ? 'warning' : 'success';
          const c = task.name;
          listData.push({ type: t, content: c });
        }
      }
    });
    return listData;
  };

  const dateCellRender = (value: Moment): JSX.Element => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map(item => (
          <li key={item.content}>
            <Badge status={item.type as BadgeProps['status']} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="project-calendar">
      <div className="project-info">{projectInfo?.name}: {projectInfo?.subject}: Calendar</div>
      <div className="calendar-header">Project Calendar</div>
      <Calendar dateCellRender={dateCellRender} style={{ zIndex: 0 }} />
    </div>
  );
};

export default ProjectCalendar;
