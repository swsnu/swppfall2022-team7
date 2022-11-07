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

export interface TaskType {
  name: string
  id: number
  description: string
  updatedAt: string
  members: MemberType[]
  documentSpaces: DocumentSpaceType[]
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
  name: 'Sanghun Kim',
  email: 'kshuun@snu.ac.kr',
  avatar: 'S',
  id: 4
};

export const dummyDescription = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.';

export const dummyProject = {
  id: 1,
  updatedAt: '1 hour ago',
  description: dummyDescription,
  documents: 5,
  name: 'Summary of Thousand Brains',
  subject: 'Scientific Tech and Writing',
  members: [choi, yi, joo],
  documentSpaces: [
    {
      name: 'Space 1',
      updatedAt: '1 hour ago',
      id: 1
    },
    {
      name: 'Space 2',
      updatedAt: '2022.10.25',
      id: 2
    },
    {
      name: 'Space 3',
      updatedAt: '2022.10.23',
      id: 3
    }
  ],
  tasks: [
    {
      name: 'Task 1',
      id: 1,
      updatedAt: '2 days ago',
      members: [choi, yi],
      description: 'Description 1',
      documentSpaces: [
        {
          name: 'Space 1',
          updatedAt: '1 hour ago',
          id: 1
        },
        {
          name: 'Space 2',
          updatedAt: '2022.10.25',
          id: 2
        }
      ]
    },
    {
      name: 'Task 2',
      id: 2,
      updatedAt: '1 hour ago',
      members: [yi, joo],
      description: 'Description 2',
      documentSpaces: [
        {
          name: 'Space 2',
          updatedAt: '2022.10.25',
          id: 2
        },
        {
          name: 'Space 3',
          updatedAt: '2022.10.23',
          id: 3
        }
      ]
    }
  ]
};

export const dummyProjects = [dummyProject];

export const testDummyProject: ProjectType = {
  id: 1,
  updatedAt: '1 hour ago',
  description: 'test',
  documents: 0,
  name: 'test',
  subject: 'test',
  members: [choi, yi, kim, joo],
  documentSpaces: [],
  tasks: []
};
