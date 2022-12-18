import { QuestContribType, TimelineContribType } from '@store/zustand/contribution';
import { DocumentSpaceType } from '@store/zustand/documentSpace';
import { DocumentSpaceCardType, ProjectType } from '@store/zustand/project';
import { CommentType, ReactionType, TaskType } from '@store/zustand/task';
import { NotificationType, UserType } from '@store/zustand/user';

export const fakeUser1: UserType = {
  email: 'fakeUser1@fake.com',
  id: 1,
  username: 'fakeUser1'
};

export const fakeUser2: UserType = {
  email: 'fakeUser2@fake.com',
  id: 2,
  username: 'fakeUser2'
};

export const fakeReaction1: ReactionType = {
  created_at: 'a',
  emoji: 'good',
  user: fakeUser1
};

export const fakeReaction2: ReactionType = {
  created_at: 'b',
  emoji: 'heart',
  user: fakeUser2
};

export const fakeReaction3: ReactionType = {
  created_at: 'v',
  emoji: 'bad',
  user: fakeUser2
};

export const fakeReaction4: ReactionType = {
  created_at: 'd',
  emoji: 'eyes',
  user: fakeUser2
};

export const fakeComment1: CommentType = {
  content: 'fakeComment1',
  created_at: 'a',
  id: 1,
  reaction_list: [fakeReaction1],
  writer: {
    id: 1,
    username: 'fakeUser1'
  }
};

export const fakeComment2: CommentType = {
  content: 'fakeComment2',
  created_at: 'a',
  id: 2,
  reaction_list: [fakeReaction1, fakeReaction2],
  writer: {
    id: 2,
    username: 'fakeUser2'
  }
};

export const fakeDocumentSpace1: DocumentSpaceType = {
  head: 1,
  id: 1,
  name: 'a',
  project: 1
};

export const fakeDocumentSpace2: DocumentSpaceType = {
  project: 1,
  head: 2,
  id: 2,
  name: 'b'
};

export const fakeDocumentSpaceCard1: DocumentSpaceCardType = {
  head: 1,
  id: 1,
  name: 'a',
  created_at: 'a'
};

export const fakeDocumentSpaceCard2: DocumentSpaceCardType = {
  head: 2,
  id: 2,
  name: 'b',
  created_at: 'a'
};

export const fakeTask1: TaskType = {
  assignee: fakeUser1,
  content: 'a',
  createdAt: 'a',
  id: 1,
  name: 'a',
  project: 1,
  untilAt: '2022-12-24',
  updatedAt: 'a',
  status: 'on-going',
  document_space_list: [{ created_at: 'a', ...fakeDocumentSpace1 }],
  until_at: '2022-12-24'
};
export const fakeTask2: TaskType = {
  assignee: {
    email: 'a',
    id: 1,
    username: 'a'
  },
  content: 'b',
  createdAt: 'b',
  id: 2,
  name: 'b',
  project: 2,
  untilAt: '2022-12-05',
  until_at: '2022-12-05',
  updatedAt: 'b',
  status: 'done',
  document_space_list: [{ created_at: 'b', ...fakeDocumentSpace2 }]
};
export const emptyTask1: TaskType = {
  assignee: null,
  content: 'b',
  createdAt: 'b',
  id: 3,
  name: 'b',
  project: 2,
  untilAt: 'b',
  updatedAt: 'b',
  status: 'done',
  document_space_list: [{ created_at: 'b', ...fakeDocumentSpace2 }]
};

export const fakeProject1: ProjectType = {
  document_number: 1,
  id: 1,
  last_modified: 'a',
  manager: 1,
  member_list: [fakeUser1, fakeUser2],
  name: 'a',
  subject: 'a',
  document_space_list: [
    {
      created_at: '1',
      ...fakeDocumentSpace1
    },
    {
      created_at: 'b',
      ...fakeDocumentSpace2
    }
  ],
  task_list: [fakeTask1, emptyTask1, fakeTask2]
};

export const fakeProject2: ProjectType = {
  document_number: 2,
  id: 2,
  last_modified: 'a',
  manager: 2,
  member_list: [fakeUser1],
  name: 'b',
  subject: 'b',
  document_space_list: [
    {
      created_at: 'a',
      ...fakeDocumentSpace1
    },
    {
      created_at: 'b',
      ...fakeDocumentSpace2
    }
  ],
  task_list: [fakeTask2]
};

export const fakeProject3: ProjectType = {
  document_number: 1,
  id: 1,
  last_modified: 'a',
  manager: 1,
  member_list: [],
  name: 'a',
  subject: 'a',
  document_space_list: [
    {
      created_at: '1',
      ...fakeDocumentSpace1
    },
    {
      created_at: 'b',
      ...fakeDocumentSpace2
    }
  ],
  task_list: [fakeTask1, emptyTask1]
};

export const fakeNoti1: NotificationType = {
  checked: false,
  content: 'testNoti1',
  created_at: '11',
  id: 1,
  link: 'asdf'
};

export const fakeNoti2: NotificationType = {
  checked: true,
  content: 'testNoti2',
  created_at: '22',
  id: 2,
  link: 'asdf2'
};

export const fakeQuest1: QuestContribType = {
  board: {
    'Complete a task': 'Done',
    'Compose a comment': 'On Going',
    'React to a comment': 'Done',
    'Upload a document': 'On Going'
  },
  user: fakeUser1
};

export const fakeTimeline1: TimelineContribType = {
  date_str: '2022-22-22',
  logs: [
    {
      created_at: 'a',
      message: 'asdf',
      user: fakeUser1
    }
  ]
};
