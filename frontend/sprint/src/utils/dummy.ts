export interface MemberType {
  name: string
  email: string
  avatar: string
  id: number
}

export interface DocumentSpaceType {
  name: string
  updatedAt: string
  id: number
}

export interface CommentType {
  author: string
  content: string
  id: number
}

export interface TaskType {
  name: string
  id: number
  description: string
  updatedAt: string
  members: MemberType[]
  documentSpaces: DocumentSpaceType[]
  comments: CommentType[]
  dueDate: string
  status: string
}

export interface ProjectType {
  id: number
  description: string
  name: string
  subject: string
  updatedAt: string
  members: MemberType[]
  documents: number
  documentSpaces: DocumentSpaceType[]
  tasks: TaskType[]
};

export const choi = {
  name: 'Seokwoo Choi',
  email: 'poding84@snu.ac.kr',
  avatar: 'C',
  id: 1
};

const yi = {
  name: 'Sanghyun Yi',
  email: 'brighthonor@snu.ac.kr',
  avatar: 'Y',
  id: 2
};

const joo = {
  name: 'HyungJin Joo',
  email: 'hjjoo3@snu.ac.kr',
  avatar: 'J',
  id: 3
};

const kim = {
  name: 'SangHun Kim',
  email: 'kshunn@snu.ac.kr',
  avatar: 'K',
  id: 4
};

const jeong = {
  name: 'Deokin Jeong',
  email: 'applist@snu.ac.kr',
  avatar: 'J',
  id: 5
};

const lim = {
  name: 'Jigyu Lim',
  email: 'jigu@snu.ac.kr',
  avatar: 'L',
  id: 6
};

const lee = {
  name: 'Dongsun Lee',
  email: 'dslee@kaist.ac.kr',
  avatar: 'L',
  id: 7
};

const kim2 = {
  name: 'Dohyun Kim',
  email: 'dhkim@snu.ac.kr',
  avatar: 'K',
  id: 8
};

export const dummyMembers = [choi, yi, joo, kim, jeong, lim, lee, kim2];

export const dummyDescription = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.';

export const dummyProject = {
  id: 1,
  updatedAt: '1 hour ago',
  description: 'Project SPRINT for SWPP Fall 2022 (Special Platform for Robust Integration in Novice Team)',
  documents: 3,
  name: 'SPRINT',
  subject: 'Principles and Practices of Software Development',
  members: [choi, yi, joo, kim],
  documentSpaces: [
    {
      name: 'Abstract',
      updatedAt: '1 hour ago',
      id: 1
    },
    {
      name: 'User Stories',
      updatedAt: '2022.10.25',
      id: 2
    },
    {
      name: 'Testing Plan',
      updatedAt: '2022.10.23',
      id: 3
    }
  ],
  tasks: [
    {
      name: 'Requirements and Specs',
      status: 'done',
      id: 1,
      dueDate: '2022-10-03',
      updatedAt: '1 week ago',
      members: [choi, yi],
      description: 'This section will include the specification for your project in the form of user stories. For each user story, you should have at least a Feature and one or more Scenarios, each of which can have one or more Acceptance Tests. Acceptance Tests list one or more acceptance tests with concrete values for the parameters, and concrete assertions that you will make to verify the postconditions. You have to at least write user stories in detail (including Acceptance Tests) for the features to be implemented by this sprint. You can include user stories for the future sprints, and extend or modify the user stories in the following sprints.',
      documentSpaces: [
        {
          name: 'Abstract',
          updatedAt: '1 hour ago',
          id: 1
        },
        {
          name: 'User Stories',
          updatedAt: '2022.10.25',
          id: 2
        }
      ],
      comments: [
        {
          id: 1,
          author: 'SangHun Kim',
          content: 'We should also include competetive landscapes!'
        },
        {
          id: 2,
          author: 'Seokwoo Choi',
          content: 'When is the task due?'
        }
      ]
    },
    {
      name: 'Design and Planning',
      id: 2,
      status: 'done',
      dueDate: '2022-10-15',
      updatedAt: '1 hour ago',
      members: [joo, kim],
      description: 'Break down each user story described in your requirements document into programming tasks. Determine the difficulty of each task, and try to estimate the number of developer-days that the tasks should take. Try to also determine dependencies among tasks. Then, you should list all of the tasks to be done in the current sprint, a preliminary assignment of tasks to people in the group, estimates of the time for each task, dependencies between tasks, and a preliminary division into sprints (e.g., which features are implemented in the first sprint, second sprint, and so on). The plan should be designed to get some prototype system running as quickly as possible and then growing towards to the full project over a sequence of sprints. Please pay extra attention to the dependency relationships between tasks; you will almost certainly run into the situation where one bit isn\'t done but everything else is waiting for it. In that case, you want to know exactly where resources need to go, and how urgent each bit is (hint: NOT proportional to its size or importance in the whole system).',
      documentSpaces: [
        {
          name: 'Testing Plan',
          updatedAt: '2022.10.23',
          id: 3
        }
      ],
      comments: [
        {
          id: 3,
          author: 'Sanghyun Yi',
          content: 'Should we include the ER diagram in our Github Wiki?'
        }
      ]
    }
  ]
};

export const dummyProject2 = {
  id: 2,
  updatedAt: '1 day ago',
  description: 'Science Writing Team Project',
  documents: 2,
  name: 'Science Writing Team Project',
  subject: 'Science Writing',
  members: [choi, yi, joo, kim],
  documentSpaces: [
    {
      name: 'Summary Writing',
      updatedAt: '4 hour ago',
      id: 1
    },
    {
      name: 'Report Editing',
      updatedAt: '2022.10.29',
      id: 2
    }
  ],
  tasks: [
    {
      name: 'Write First draft of Summary Writing',
      status: 'done',
      id: 1,
      dueDate: '2022-10-03',
      updatedAt: '8 days ago',
      members: [yi],
      description: 'Write the first draft of summary of "Thousand Brain"',
      documentSpaces: [
        {
          name: 'Summary Writing',
          updatedAt: '1 days ago',
          id: 1
        }
      ],
      comments: [
        {
          id: 1,
          author: 'SangHun Kim',
          content: 'Looks good!'
        }
      ]
    },
    {
      name: 'Write Second draft of Summary Writing',
      id: 2,
      status: 'done',
      dueDate: '2022-10-15',
      updatedAt: '1 hour ago',
      members: [choi],
      description: 'Read first draft and edit it',
      documentSpaces: [
        {
          name: 'Summary Writing',
          updatedAt: '1 days ago',
          id: 1
        }
      ],
      comments: [
        {
          id: 3,
          author: 'Sanghyun Yi',
          content: 'Oh, you catched some point well! I missed those parts!'
        }
      ]
    },
    {
      name: 'Prepare powerpoint for editing science report',
      id: 3,
      status: 'ongoing',
      dueDate: '2022-11-01',
      updatedAt: '10 hour ago',
      members: [choi],
      description: 'We just dicussed about which parts are needed to be edited. Please make a PPT for presentation',
      documentSpaces: [
        {
          name: 'Report Editing',
          updatedAt: '30 minutes ago',
          id: 1
        }
      ],
      comments: [
        {
          id: 1,
          author: 'Sanghyun Yi',
          content: 'PPT looks awesome!'
        },
        {
          id: 2,
          author: 'Sanghun Kim',
          content: 'This PPT looks good'
        },
        {
          id: 3,
          author: 'Hyungjin Joo',
          content: '👍'
        }
      ]
    }
  ]
};

export const dummyProjects = [dummyProject, dummyProject2];
