import { Input } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { useState, useEffect } from 'react';

interface TaskDetailProps {
  taskName: string
  taskContent: string
}

const TaskDetail: React.FC<TaskDetailProps> = ({ taskName, taskContent }: TaskDetailProps) => {
  const [edit, setEdit] = useState(false);
  const [editedName, setEditedName] = useState(taskName);
  const [taskInfo, setTaskInfo] = useState({ name: taskName, content: taskContent });
  const [editedContent, setEditedContent] = useState(taskContent);

  useEffect(() => {
    setTaskInfo({ name: taskName, content: taskContent });
    setEditedName(taskName);
    setEditedContent(taskContent);
    setEdit(false);
  }, [taskName]);

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
    </div>
  );
};

export default TaskDetail;
