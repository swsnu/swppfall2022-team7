import useBindStore from '@store/zustand';
import { emojiIcons, emojis, EmojiType, ReactionType } from '@store/zustand/task';
import { Tag, Tooltip } from 'antd';
import { useParams } from 'react-router-dom';

interface ReactionProps {
  commentId: number
  reactionList: ReactionType[]
}

const Reaction: React.FC<ReactionProps> = ({ commentId, reactionList }: ReactionProps) => {
  const addReaction = useBindStore(state => state.addReaction);
  const selectTask = useBindStore(state => state.selectTask);
  const { taskId } = useParams();
  const userId = localStorage.getItem('userId');
  const includesUser = {
    good: false,
    bad: false,
    heart: false,
    eyes: false
  };
  const emojiRecord: Record<EmojiType, ReactionType[]> = {
    good: [],
    bad: [],
    heart: [],
    eyes: []
  };
  for (const reaction of reactionList) {
    emojiRecord[reaction.emoji].push(reaction);
    if (userId !== null && reaction.user.id === parseInt(userId)) includesUser[reaction.emoji] = true;
  }
  const reactedUserText = (reactionList: ReactionType[]): string => {
    const userList = [];
    for (const reaction of reactionList) userList.push(reaction.user.username);
    return userList.join(', ');
  };
  const onClickTag = async (emoji: EmojiType): Promise<void> => {
    await addReaction(commentId, emoji);
    await selectTask(parseInt(taskId ?? '0'));
  };
  return (
    <>
      {emojis.map(emoji => (
        emojiRecord[emoji].length > 0
          ? <Tooltip title={reactedUserText(emojiRecord[emoji])} key={emoji}>
            <Tag onClick={() => { void onClickTag(emoji); }} color={includesUser[emoji] ? 'geekblue' : undefined}>{emojiIcons[emoji]} {emojiRecord[emoji].length}</Tag>
          </Tooltip>
          : <Tag key={emoji} onClick={() => { void onClickTag(emoji); }}>{emojiIcons[emoji]} 0</Tag>
      ))}
    </>
  );
};

export default Reaction;
