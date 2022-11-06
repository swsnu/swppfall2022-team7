import { Input, Avatar, Comment, Tooltip, Button, Collapse, Upload, message } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import React, { useState, useEffect, createElement } from 'react';
import type { UploadFile, UploadProps } from 'antd/es/upload/interface';
import { DislikeFilled, DislikeOutlined, LikeFilled, LikeOutlined, InboxOutlined, StarOutlined } from '@ant-design/icons';
import AWS from 'aws-sdk';

interface TaskDetailProps {
  taskName: string
  taskContent: string
}

interface DocumentType {
  key: string | undefined
  time: Date | undefined
  url: string
}

const { Dragger } = Upload;

const TaskDetail: React.FC<TaskDetailProps> = ({ taskName, taskContent }: TaskDetailProps) => {
  const [edit, setEdit] = useState(false);
  const [editedName, setEditedName] = useState(taskName);
  const [taskInfo, setTaskInfo] = useState({ name: taskName, content: taskContent });
  const [editedContent, setEditedContent] = useState(taskContent);
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
        newList.unshift({ key: file.Key, time: file.LastModified, url: url });
        setFileList([...newList]);
      });
    });
  }, []);

  useEffect(() => {
    setTaskInfo({ name: taskName, content: taskContent });
    setEditedName(taskName);
    setEditedContent(taskContent);
    setEdit(false);
  }, [taskName]);

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
          setFileList([{ key: file.name, time: file.lastModifiedDate, url: url }, ...fileList]);
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
          <div className="document-header">Projects Documents<Button className="document-confirm" onClick={handleUpload} disabled={uploadFile.length === 0} loading={uploading} size='small'>Confirm</Button></div>
          <Collapse accordion>
            <Panel header='Summary' key='1'>
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
          </Collapse>
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;
