import React from 'react';
import type { BadgeProps } from 'antd';
import { Badge, Calendar } from 'antd';
import type { Moment } from 'moment';
import moment from 'moment';
import useBindStore from '@store/zustand';

interface ListDataType {
  type: string
  content: string
}

const ProjectCalendar: React.FC = () => {
  const project = useBindStore(state => state.selectedProject);

  const getListData = (value: Moment): ListDataType[] => {
    const listData: ListDataType[] = [];
    project?.task_list?.forEach(task => {
      if (task?.until_at !== undefined) {
        if (moment(task.until_at).month() === value.month() && moment(task.until_at).year() === value.year()) {
          if (parseInt(task.until_at?.substring(8, 10)) === value.date()) {
            const taskStatus = task.status === 'on-going' ? 'warning' : 'success';
            const taskName = task.name;
            listData.push({ type: taskStatus, content: taskName });
          }
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
      <div className="project-info">{project?.name}: {project?.subject}: Calendar</div>
      <div className="calendar-header">Project Calendar</div>
      <Calendar className="calendar-cell" dateCellRender={dateCellRender} mode="month" />
    </div>
  );
};

export default ProjectCalendar;
