import { ReactionType } from '@store/zustand/task';
import { Tag, Tooltip } from 'antd';

interface ReactionProps {
  reactionList: ReactionType[]
}

const emoji = {
  good: '👍',
  heart: '❤',
  eyes: '👀'
};

const Reaction: React.FC<ReactionProps> = ({ reactionList }: ReactionProps) => {
  const goodList = [];
  const heartList = [];
  const eyesList = [];
  for (const reaction of reactionList) {
    if (reaction.emoji === 'good') goodList.push(reaction);
    else if (reaction.emoji === 'heart') heartList.push(reaction);
    else eyesList.push(reaction);
  }
  return (
    <>
      {
        goodList.length > 0
          ? <Tooltip title={goodList.map(reaction => reaction.user.username)}>
            <Tag>{emoji.good} {goodList.length}</Tag>
          </Tooltip>
          : <Tag>{emoji.good} 0</Tag>
      }
      {
        heartList.length > 0
          ? <Tooltip title={heartList.map(reaction => reaction.user.username)}>
            <Tag>{emoji.heart} {heartList.length}</Tag>
          </Tooltip>
          : <Tag>{emoji.heart} 0</Tag>
      }
      {
        eyesList.length > 0
          ? <Tooltip title={eyesList.map(reaction => reaction.user.username)}>
            <Tag>{emoji.eyes} {eyesList.length}</Tag>
          </Tooltip>
          : <Tag>{emoji.eyes} 0</Tag>
      }
    </>
  );
};

export default Reaction;
