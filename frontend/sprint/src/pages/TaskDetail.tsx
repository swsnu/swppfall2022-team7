import { Input, Avatar, Button, DatePicker } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import useBindStore from '@store/zustand';
import DocSpaceCollapse from '@components/DocSpaceCollapse';
import StatusTag from '@components/StatusTag';
import CommentBox from '@components/CommentBox';
import { iconString } from '@utils/utils';

const TaskDetail: React.FC = () => {
  const { projectId, taskId } = useParams();
  const project = useBindStore(state => state.selectedProject);
  const task = useBindStore(state => state.selectedTask);
  const editTask = useBindStore(state => state.editTask);
  const selectProject = useBindStore(state => state.selectProject);
  const deleteTask = useBindStore(state => state.deleteTask);

  const navigate = useNavigate();
  const [edit, setEdit] = useState(false);
  const [editedName, setEditedName] = useState(task?.name);
  const [editedDate, setEditedDate] = useState(task?.untilAt);
  const [taskInfo, setTaskInfo] = useState({ name: task?.name, content: task?.content, dueDate: task?.untilAt });
  const [editedContent, setEditedContent] = useState(task?.content);

  useEffect(() => {
    setTaskInfo({ name: task?.name, content: task?.content, dueDate: task?.untilAt });
    setEdit(false);
    setEditedName(task?.name);
    setEditedContent(task?.content);
    setEditedDate(task?.untilAt);
  }, [task]);

  const onSaveClicked = async (): Promise<void> => {
    setTaskInfo({ name: editedName, content: editedContent, dueDate: editedDate });
    await editTask(parseInt(taskId ?? '0'), editedName ?? '', editedContent ?? '', task?.assignee?.id ?? 0, editedDate ?? '');
    await selectProject(parseInt(projectId ?? '0'));
    setEdit(false);
  };

  const onCancelClicked = (): void => {
    setEdit(false);
    setEditedName(task?.name);
    setEditedContent(task?.content);
  };

  const onDeleteTask = async (): Promise<void> => {
    if (taskId === undefined) return;
    if (!window.confirm('Do you want to delete this task?')) return;
    try {
      await deleteTask(parseInt(taskId));
      navigate(`/projects/${projectId ?? '0'}`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="task-detail">
      <div className="task-info">{project?.name}: {project?.subject}: {taskInfo.name}</div>
      {
        edit
          ? <div className="edit-container">
              <div className="edit-name-container">
                <Input defaultValue={editedName} onChange={(e) => setEditedName(e.target.value)}/>
                <div className="edit-name-button-container">
                  <Button onClick={() => { void onSaveClicked(); }}>Save</Button>
                  <Button type='text' onClick={onCancelClicked}>Cancel</Button>
                </div>
              </div>
              <DatePicker defaultValue={moment(editedDate, 'YYYY-MM-DD')} onChange={(_, dateString) => setEditedDate(dateString)} />
              <TextArea className="task-content" rows={10} defaultValue={taskInfo.content} onChange={(e) => { setEditedContent(e.target.value); }}/>
            </div>
          : <div>
              <div className="task-name">
                <div className="task-avatar">
                  Task: {taskInfo.name}
                </div>
                <div>
                  <Button onClick={() => setEdit(true)}>Edit</Button>&nbsp;
                  <Button type="primary" danger onClick={() => { void onDeleteTask(); }}>Delete</Button>
                </div>
              </div>
              <div className="due-tag">
                <div className="task-assignee task-due">Assignee: {task?.assignee?.username}</div>
                <div className="task-due divider">|</div>
                <div className="task-due">Due: {taskInfo.dueDate}</div>
                {task?.status !== undefined ? <StatusTag status={task?.status} /> : null}
              </div>
              <div className="task-content">
                <p dangerouslySetInnerHTML={{ __html: taskInfo.content?.replaceAll('\n', '<br/>') ?? '' }} />
              </div>
            </div>
      }
      <div className="bottom-container">
        <CommentBox commentList={task?.comment_list} />
        <DocSpaceCollapse documentSpaces={task?.document_space_list ?? []} />
      </div>
    </div>
  );
};

export default TaskDetail;
