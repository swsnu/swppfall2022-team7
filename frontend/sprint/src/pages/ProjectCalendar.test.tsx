import { renderWithProviders } from '@utils/mocks';
import moment from 'moment';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ProjectCalendar from './ProjectCalendar';

const now = new Date();
const nowDate = moment(now).format('YYYY-MM-DD');

const stubInitialState = [{
  id: 1,
  updatedAt: '1 hour ago',
  description: 'Project SPRINT for SWPP Fall 2022 (Special Platform for Robust Integration in Novice Team)',
  documents: 0,
  name: 'SPRINT',
  subject: 'Principles and Practices of Software Development',
  members: [],
  documentSpaces: [],
  tasks: [
    {
      name: 'Requirements and Specs',
      status: 'done',
      id: 1,
      dueDate: nowDate,
      updatedAt: '1 week ago',
      members: [],
      description: 'This section will include the specification for your project in the form of user stories. For each user story, you should have at least a Feature and one or more Scenarios, each of which can have one or more Acceptance Tests. Acceptance Tests list one or more acceptance tests with concrete values for the parameters, and concrete assertions that you will make to verify the postconditions. You have to at least write user stories in detail (including Acceptance Tests) for the features to be implemented by this sprint. You can include user stories for the future sprints, and extend or modify the user stories in the following sprints.',
      documentSpaces: [],
      comments: []
    },
    {
      name: 'Requirements and Specs2',
      status: 'ongoing',
      id: 2,
      dueDate: nowDate,
      updatedAt: '1 week ago',
      members: [],
      description: 'This section will include the specification for your project in the form of user stories. For each user story, you should have at least a Feature and one or more Scenarios, each of which can have one or more Acceptance Tests. Acceptance Tests list one or more acceptance tests with concrete values for the parameters, and concrete assertions that you will make to verify the postconditions. You have to at least write user stories in detail (including Acceptance Tests) for the features to be implemented by this sprint. You can include user stories for the future sprints, and extend or modify the user stories in the following sprints.',
      documentSpaces: [],
      comments: []
    },
    {
      name: 'Requirements and Specs3',
      status: 'success',
      id: 3,
      dueDate: nowDate,
      updatedAt: '1 week ago',
      members: [],
      description: 'This section will include the specification for your project in the form of user stories. For each user story, you should have at least a Feature and one or more Scenarios, each of which can have one or more Acceptance Tests. Acceptance Tests list one or more acceptance tests with concrete values for the parameters, and concrete assertions that you will make to verify the postconditions. You have to at least write user stories in detail (including Acceptance Tests) for the features to be implemented by this sprint. You can include user stories for the future sprints, and extend or modify the user stories in the following sprints.',
      documentSpaces: [],
      comments: []
    },
    {
      name: 'Requirements and Specs4',
      status: 'warning',
      id: 4,
      dueDate: nowDate,
      updatedAt: '1 week ago',
      members: [],
      description: 'This section will include the specification for your project in the form of user stories. For each user story, you should have at least a Feature and one or more Scenarios, each of which can have one or more Acceptance Tests. Acceptance Tests list one or more acceptance tests with concrete values for the parameters, and concrete assertions that you will make to verify the postconditions. You have to at least write user stories in detail (including Acceptance Tests) for the features to be implemented by this sprint. You can include user stories for the future sprints, and extend or modify the user stories in the following sprints.',
      documentSpaces: [],
      comments: []
    }
  ]
}];

const mockState = {
  preloadedState: {
    project: stubInitialState
  }
};

describe('<ProjectCalendar />', () => {
  let AD: JSX.Element;
  beforeAll(() => {
    AD = <MemoryRouter initialEntries={['/1']}><Routes><Route path="/:projectId" element={<ProjectCalendar />} /></Routes></MemoryRouter>;
    global.matchMedia = global.matchMedia ?? function () {
      return {
        addListener: jest.fn(),
        removeListener: jest.fn()
      };
    };
  });
  it('should render', () => {
    renderWithProviders(AD, mockState);
  });
  it('should render w/o project id', () => {
    AD = <MemoryRouter initialEntries={['/1']}><Routes><Route path="/:project" element={<ProjectCalendar />} /></Routes></MemoryRouter>;
    renderWithProviders(AD, mockState);
  });
});
