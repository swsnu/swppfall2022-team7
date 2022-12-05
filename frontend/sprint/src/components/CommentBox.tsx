import useBindStore from '@store/zustand';
import { CommentType, ReactionType } from '@store/zustand/task';
import { Avatar, Button, Comment, Form, Input } from 'antd';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Reaction from './Reaction';

interface CommentProps {
  commentList: CommentType[] | undefined
}

const CommentBox: React.FC<CommentProps> = ({ commentList }: CommentProps) => {
  const { taskId } = useParams();
  const user = useBindStore(state => state.user);
  const selectTask = useBindStore(state => state.selectTask);
  const addComment = useBindStore(state => state.addComment);
  const commentActions = (commentId: number, reactionList: ReactionType[]): JSX.Element => (
    <Reaction commentId={commentId} reactionList={reactionList} />
  );
  const { TextArea } = Input;
  const [content, setContent] = useState('');

  const onClickSubmit = async (): Promise<void> => {
    await addComment(parseInt(taskId ?? '0'), content);
    await selectTask(parseInt(taskId ?? '0'));
    setContent('');
  };

  const Editor =
    <>
      <TextArea rows={3} key="comment-content" value={content} onChange={e => setContent(e.target.value)} className="comment-content" />
      <Button size="small" htmlType="submit" type="primary" onClick={() => { void onClickSubmit(); }}>Add Comment</Button>
    </>
  ;
  return (
    <div className="comment-container">
      <div className="comment-header">Comments</div>
      {commentList?.map(comment => (
        <Comment
          key={comment.id}
          actions={[commentActions(comment.id, comment.reaction_list)]}
          author={<a>{comment.writer.username}</a>}
          avatar={<Avatar>{comment.writer.username.substring(0, 1).toUpperCase()}</Avatar>}
          content={<p>{comment.content}</p>}
          datetime={comment.created_at}
        />
      ))}
      <Comment
        avatar={<Avatar>{user?.username.substring(0, 1).toUpperCase()}</Avatar>}
        content={Editor}
      />
    </div>
  );
};

export default CommentBox;
