import { Input, Avatar, Comment, Tooltip } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import React, { useState, useEffect, createElement } from 'react';
import { DislikeFilled, DislikeOutlined, LikeFilled, LikeOutlined } from '@ant-design/icons';

interface TaskDetailProps {
  taskName: string
  taskContent: string
}

const TaskDetail: React.FC<TaskDetailProps> = ({ taskName, taskContent }: TaskDetailProps) => {
  const [edit, setEdit] = useState(false);
  const [editedName, setEditedName] = useState(taskName);
  const [taskInfo, setTaskInfo] = useState({ name: taskName, content: taskContent });
  const [editedContent, setEditedContent] = useState(taskContent);

  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [action, setAction] = useState<string | null>(null);

  useEffect(() => {
    setTaskInfo({ name: taskName, content: taskContent });
    setEditedName(taskName);
    setEditedContent(taskContent);
    setEdit(false);
  }, [taskName]);

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
      <span onClick={like}>
        {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
        <span className="comment-action">{likes}</span>
      </span>
    </Tooltip>,
    <Tooltip key="comment-basic-dislike" title="Dislike">
      <span onClick={dislike}>
        {React.createElement(action === 'disliked' ? DislikeFilled : DislikeOutlined)}
        <span className="comment-action">{dislikes}</span>
      </span>
    </Tooltip>,
    <span key="comment-basic-reply-to">Reply to</span>
  ];

  const onSaveClicked = (): void => {
    setTaskInfo({ name: editedName, content: editedContent });
    setEdit(false);
  };

  const onCancelClicked = (): void => {
    setEdit(false);
    setEditedName(taskName);
    setEditedContent(taskContent);
  };

  return (
    <div className="task-detail">
      <div className="task-info">Summary of Thousands Brains: Scientific Tech and Writing: {taskInfo.name}</div>
      {
        edit
          ? <div className="edit-container">
              <div className="edit-name-container">
                <Input defaultValue={editedName} onChange={(e) => setEditedName(e.target.value)}/>
                <div className="edit-name-button-container">
                  <div className="edit-name-save" onClick={onSaveClicked}>Save</div>
                  <div className="edit-name-cancel" onClick={onCancelClicked}>Cancel</div>
                </div>
              </div>
              <TextArea className="task-content" rows={10} defaultValue={taskInfo.content} onChange={(e) => { setEditedContent(e.target.value); }}/>
            </div>
          : <div>
              <div className="task-name">Task: {taskInfo.name}<div className="edit-name" onClick={() => setEdit(true)}>Edit</div></div>
              <div className="task-content">{taskInfo.content}</div>
            </div>
      }
      <div className="bottom-container">
        <div className="comment-container">
          <div className="comment-header">Comments</div>
          <Comment
            actions={actions}
            author={<a>Han Solo</a>}
            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
            content={
              <p>
                We supply a series of design principles, practical patterns and high quality design
                resources (Sketch and Axure), to help people create their product prototypes beautifully
                and efficiently.
              </p>
            }
            datetime={
              <Tooltip title="2016-11-22 11:22:33">
                <span>8 hours ago</span>
              </Tooltip>
            }
          />
          <Comment
            actions={actions}
            author={<a>Han Solo</a>}
            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
            content={
              <p>
                We supply a series of design principles, practical patterns and high quality design
                resources (Sketch and Axure), to help people create their product prototypes beautifully
                and efficiently.
              </p>
            }
            datetime={
              <Tooltip title="2016-11-22 11:22:33">
                <span>8 hours ago</span>
              </Tooltip>
            }
          />
          <Comment
            actions={actions}
            author={<a>Han Solo</a>}
            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
            content={
              <p>
                We supply a series of design principles, practical patterns and high quality design
                resources (Sketch and Axure), to help people create their product prototypes beautifully
                and efficiently.
              </p>
            }
            datetime={
              <Tooltip title="2016-11-22 11:22:33">
                <span>8 hours ago</span>
              </Tooltip>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;
