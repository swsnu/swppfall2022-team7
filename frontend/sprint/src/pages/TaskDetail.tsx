import { Input, Avatar, Comment, Tooltip, Button, Collapse, Upload, message } from 'antd';
import type { UploadProps } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import React, { useState, useEffect, createElement } from 'react';
import { DislikeFilled, DislikeOutlined, LikeFilled, LikeOutlined, InboxOutlined } from '@ant-design/icons';

interface TaskDetailProps {
  taskName: string
  taskContent: string
}

const { Dragger } = Upload;

const props: UploadProps = {
  name: 'file',
  multiple: true,
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  onChange: (info) => {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      void message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      void message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop: (e) => {
    console.log('Dropped files', e.dataTransfer.files);
  }
};

const TaskDetail: React.FC<TaskDetailProps> = ({ taskName, taskContent }: TaskDetailProps) => {
  const [edit, setEdit] = useState(false);
  const [editedName, setEditedName] = useState(taskName);
  const [taskInfo, setTaskInfo] = useState({ name: taskName, content: taskContent });
  const [editedContent, setEditedContent] = useState(taskContent);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [action, setAction] = useState<string | null>(null);

  const { Panel } = Collapse;

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
                  <Button onClick={onSaveClicked}>Save</Button>
                  <Button type='text' onClick={onCancelClicked}>Cancel</Button>
                </div>
              </div>
              <TextArea className="task-content" rows={10} defaultValue={taskInfo.content} onChange={(e) => { setEditedContent(e.target.value); }}/>
            </div>
          : <div>
              <div className="task-name">Task: {taskInfo.name}<Button onClick={() => setEdit(true)}>Edit</Button></div>
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
        <div className="documents-container">
          <div className="document-header">Projects Documents<Button className="document-confirm"size='small'>Confirm</Button></div>
          <Collapse accordion>
            <Panel header='Summary' key='1'>
              <div className="document-container">
                <div className="document-left">
                  <div className="document-uploaded">
                    <div className="uploaded-file">SummaryForm.hwp</div>
                    <div className="file-info">
                      <div className="uploaded-time">2022-11-04-11:05</div>
                      <div className="file-uploader">SangHyun Yi</div>
                    </div>
                  </div>
                  <div className="document-uploaded">
                    <div className="uploaded-file">First Draft.hwp</div>
                    <div className="file-info">
                      <div className="uploaded-time">2022-11-05-15:13</div>
                      <div className="file-uploader">SangHun Kim</div>
                    </div>
                  </div>
                  <div className="document-uploaded">
                    <div className="uploaded-file">SecondDraft.hwp</div>
                    <div className="file-info">
                      <div className="uploaded-time">2022-11-07-01:45</div>
                      <div className="file-uploader">SeokWoo Choi</div>
                    </div>
                  </div>
                  <div className="document-uploaded">
                    <div className="uploaded-file">FinalDraft.hwp</div>
                    <div className="file-info">
                      <div className="uploaded-time">2022-11-09-22:34</div>
                      <div className="file-uploader">HyungJin Joo</div>
                    </div>
                  </div>
                </div>
                <div className="document-right">
                  <Dragger {...props}>
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">
                      Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                      band files
                    </p>
                  </Dragger>
                </div>
              </div>
            </Panel>
          </Collapse>
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;
