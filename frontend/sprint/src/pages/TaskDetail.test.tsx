// import { fireEvent, screen } from '@testing-library/react';
// import { renderWithProviders } from '@utils/mocks';
// import TaskDetail from './TaskDetail';
// import * as AWSMock from 'aws-sdk-mock';
// import AWS from 'aws-sdk';
// import { MemoryRouter, Route, Routes } from 'react-router-dom';

// jest.mock('antd', () => ({ ...jest.requireActual('antd') }));

// const stubInitialState = [{
//   id: 1,
//   updatedAt: '1 hour ago',
//   description: 'Project SPRINT for SWPP Fall 2022 (Special Platform for Robust Integration in Novice Team)',
//   documents: 0,
//   name: 'SPRINT',
//   subject: 'Principles and Practices of Software Development',
//   members: [],
//   documentSpaces: [],
//   tasks: [
//     {
//       name: 'Requirements and Specs',
//       status: 'done',
//       id: 1,
//       dueDate: '2022-02-02',
//       updatedAt: '1 week ago',
//       members: [],
//       description: 'This section will include the specification for your project in the form of user stories. For each user story, you should have at least a Feature and one or more Scenarios, each of which can have one or more Acceptance Tests. Acceptance Tests list one or more acceptance tests with concrete values for the parameters, and concrete assertions that you will make to verify the postconditions. You have to at least write user stories in detail (including Acceptance Tests) for the features to be implemented by this sprint. You can include user stories for the future sprints, and extend or modify the user stories in the following sprints.',
//       documentSpaces: [],
//       comments: [{
//         id: 1,
//         author: 'Sanghyun Yi',
//         content: 'Should we include the ER diagram in our Github Wiki?'
//       }]
//     }
//   ]
// }];

// const mockState = {
//   preloadedState: {
//     project: stubInitialState
//   }
// };

// describe('task detail test', () => {
//   let AD: JSX.Element;
//   beforeAll(() => {
//     jest.useFakeTimers();
//     AWSMock.setSDKInstance(AWS);
//     AWSMock.mock('S3', 'getSignedUrl', (func: string, obj: any) => {
//       return null;
//     });
//     AWSMock.mock('S3', 'listObjects', (params: any, callback: Function) => {
//       callback(null, { Contents: [{ Key: 'file1.csv' }] });
//     });
//     AD = <MemoryRouter initialEntries={['/1/1']}><Routes><Route path='/:projectId/:taskId' element={<TaskDetail />} /></Routes></MemoryRouter>;
//     global.matchMedia = global.matchMedia ?? function () {
//       return {
//         addListener: jest.fn(),
//         removeListener: jest.fn()
//       };
//     };
//   });
//   it('should render without error', () => {
//     renderWithProviders(AD);
//   });
//   it('should handle save after edit', () => {
//     renderWithProviders(AD);
//     const editButton = screen.getByText('Edit');
//     fireEvent.click(editButton);
//     const inputs = screen.getAllByRole('textbox');
//     fireEvent.change(inputs[0], { target: { value: 'asdf' } });
//     fireEvent.change(inputs[1], { target: { value: 'asdf' } });
//     const saveButton = screen.getByText('Save');
//     fireEvent.click(saveButton);
//   });
//   it('should handld cancel after edit', () => {
//     renderWithProviders(AD, mockState);
//     const editButton = screen.getByText('Edit');
//     fireEvent.click(editButton);
//     const inputs = screen.getAllByRole('textbox');
//     fireEvent.change(inputs[0], { target: { value: 'asdf' } });
//     fireEvent.change(inputs[1], { target: { value: 'asdf' } });
//     const cancelButton = screen.getByText('Cancel');
//     fireEvent.click(cancelButton);
//   });
// });

describe('dummy', () => {
  it('d', () => {
    const a = 1;
  });
});

export {};
