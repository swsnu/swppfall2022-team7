import { Input, Avatar, Comment, Tooltip, Button, DatePicker } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import React, { useState, useEffect, createElement, useMemo } from 'react';
import { DislikeFilled, DislikeOutlined, LikeFilled, LikeOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import useBindStore from '@store/zustand';
import DocSpaceCollapse from '@components/DocSpaceCollapse';

const TaskDetail: React.FC = () => {
  const { projectId, taskId } = useParams();
  const project = useBindStore(state => state.selectedProject);
  const task = useBindStore(state => state.selectedTask);
  const editTask = useBindStore(state => state.editTask);
  const selectProject = useBindStore(state => state.selectProject);

  const [edit, setEdit] = useState(false);
  const [editedName, setEditedName] = useState(task?.name);
  const [editedDate, setEditedDate] = useState(task?.untilAt);
  const [taskInfo, setTaskInfo] = useState({ name: task?.name, content: task?.content, dueDate: task?.untilAt });
  const [editedContent, setEditedContent] = useState(task?.content);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [action, setAction] = useState<string | null>(null);

  useEffect(() => {
    setTaskInfo({ name: task?.name, content: task?.content, dueDate: task?.untilAt });
    setEdit(false);
    setEditedName(task?.name);
    setEditedContent(task?.content);
    setEditedDate(task?.untilAt);
  }, [task]);

  const like = (): void => {
    setLikes(1);
    setDislikes(0);
    setAction('liked');
  };

  const dislike = (): void => {
    setLikes(0);
    setDislikes(1);
    setAction('disliked');
  };

  const actions = [
    <Tooltip key="comment-basic-like" title="Like">
      <span className="likeButton" onClick={like}>
        {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
        <span className="comment-action">{likes}</span>
      </span>
    </Tooltip>,
    <Tooltip key="comment-basic-dislike" title="Dislike">
      <span className="dislikeButton" onClick={dislike}>
        {React.createElement(action === 'disliked' ? DislikeFilled : DislikeOutlined)}
        <span className="comment-action">{dislikes}</span>
      </span>
    </Tooltip>,
    <span key="comment-basic-reply-to">Reply to</span>
  ];

  const onSaveClicked: () => Promise<void> = async () => {
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
                  <Avatar className="avatar">{task?.assignee?.username.substring(0, 1).toUpperCase()}</Avatar>
                </div>
                <Button onClick={() => setEdit(true)}>Edit</Button>
              </div>
              <div className="task-due">Due: {taskInfo.dueDate}</div>
              <div className="task-content">{taskInfo.content}</div>
            </div>
      }
      <div className="bottom-container">
        <div className="comment-container">
          <div className="comment-header">Comments</div>
          {task?.comment_list?.map(comment => (
            <Comment
              key={comment.id}
              actions={actions}
              author={<a>{'Author'}</a>}
              avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="alt" />}
              content={<p>{comment.content}</p>}
              datetime={comment.created_at}
            />
          ))}
        </div>
        <DocSpaceCollapse documentSpaces={task?.document_space_list ?? []} />
      </div>
    </div>
  );
};

export default TaskDetail;
