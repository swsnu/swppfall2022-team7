import { Input, Avatar, Comment, Tooltip, Button, Collapse, Upload, message, DatePicker } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import React, { useState, useEffect, createElement, useMemo } from 'react';
import type { UploadFile, UploadProps } from 'antd/es/upload/interface';
import { DislikeFilled, DislikeOutlined, LikeFilled, LikeOutlined, InboxOutlined, StarOutlined } from '@ant-design/icons';
import AWS from 'aws-sdk';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import useBindStore from '@store/zustand';

interface DocumentType {
  key: string | undefined
  time: Date | undefined
  url: string
}

const { Dragger } = Upload;

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
  const [uploadFile, setUploadFile] = useState<UploadFile[]>([]);
  const [fileList, setFileList] = useState<DocumentType[]>([]);
  const [uploading, setUploading] = useState(false);

  const { Panel } = Collapse;
  AWS.config.region = 'ap-northeast-2';
  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'ap-northeast-2:89dcba84-b66a-49ce-b1f1-c0a3e77dd9da'
  });
  const s3 = new AWS.S3();

  useEffect(() => {
    setTaskInfo({ name: task?.name, content: task?.content, dueDate: task?.untilAt });
    setEdit(false);
    setEditedName(task?.name);
    setEditedContent(task?.content);
    setEditedDate(task?.untilAt);
  }, [task]);

  useEffect(() => {
    s3.getSignedUrl('getObject', {
      Bucket: 'swppsprint',
      Key: 'asdf',
      Expires: 604799,
      ResponseContentDisposition: 'attachment; filename ="asdf"'
    });
  }, []);

  useEffect(() => {
    s3?.listObjects({ Bucket: 'swppsprint' }, (e, d) => {
      if (e != null) void message.error('error during fetching document list');
      const newList: DocumentType[] = [];
      d.Contents?.forEach(file => {
        const url = s3.getSignedUrl('getObject', {
          Bucket: 'swppsprint',
          Key: file.Key,
          Expires: 604799,
          ResponseContentDisposition: `attachment; filename ="${file.Key ?? 'asdf.txt'}"`
        });
        newList.unshift({ key: file.Key, time: file.LastModified, url });
        setFileList([...newList]);
      });
    });
  }, []);

  const props: UploadProps = {
    onRemove: file => {
      const index = uploadFile.indexOf(file);
      const newFileList = uploadFile.slice();
      newFileList.splice(index, 1);
      setUploadFile(newFileList);
    },
    beforeUpload: file => {
      setUploadFile([...uploadFile, file]);
      return false;
    },
    fileList: uploadFile
  };

  const uploadAWS = async (): Promise<void> => {
    for (const file of uploadFile) {
      const upload = new AWS.S3.ManagedUpload({
        params: {
          Bucket: 'swppsprint',
          Key: file.name,
          Body: uploadFile[0]
        }
      });
      await upload.promise()
        .then(() => {
          const url = s3.getSignedUrl('getObject', {
            Bucket: 'swppsprint',
            Key: file.name,
            Expires: 604799,
            ResponseContentDisposition: `attachment; filename ="${file.name ?? 'asdf.txt'}"`
          });
          setFileList([{ key: file.name, time: file.lastModifiedDate, url }, ...fileList]);
        });
    };
  };

  const handleUpload2 = async (): Promise<void> => {
    await uploadAWS().then(() => {
      setUploadFile([]);
      setUploading(false);
    });
  };

  const handleUpload = (): void => {
    setUploading(true);
    void handleUpload2();
  };

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
          {/* {task?.comments.map(comment => (
            <Comment
              key={comment.id}
              actions={actions}
              author={<a>{comment.author}</a>}
              avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="alt" />}
              content={<p>{comment.content}</p>}
              datetime={'2 weeks ago'}
            />
          ))} */}
        </div>
        <div className="documents-container">
          <div className="document-header">Projects Documents<Button className="document-confirm" onClick={handleUpload} disabled={uploadFile.length === 0} loading={uploading} size='small'>Confirm</Button></div>
          {project?.id === 1 && task?.id === 1 && <Collapse accordion>
            <Panel header='Abstract' key='1'>
            <div className="document-container">
                <div className="document-left">
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
          </Collapse>}
          {project?.id === 1 && task?.id === 1 && <Collapse accordion>
            <Panel header='User Stories' key='2'>
              <div className="document-container">
                <div className="document-left">
                  {fileList.map((file, i) => {
                    return (
                      <a href={file.url} className="document-uploaded" key={file.key}>
                        <div className="file-name-container">
                          <div className="uploaded-file">{file.key}</div>
                          {(i === 0) && <StarOutlined size={10} />}
                        </div>
                        <div className="file-info">
                          <div className="uploaded-time">{file.time?.toISOString().substring(0, 10)}</div>
                          <div className="file-uploader">SangHyun Yi</div>
                        </div>
                      </a>
                    );
                  })}
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
          </Collapse>}
          {project?.id === 1 && task?.id === 2 && <Collapse accordion>
            <Panel header='Testing Plan' key='3'>
            <div className="document-container">
                <div className="document-left">
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
          </Collapse>}
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;
