import { renderWithProviders } from '@utils/mocks';
import { dummyProjects } from '@utils/testDummy';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ProjectDocument from './ProjectDocument';
import * as AWSMock from 'aws-sdk-mock';
import AWS from 'aws-sdk';

const stubInitialState = dummyProjects;

const mockState = {
  preloadedState: {
    project: stubInitialState
  }
};

describe('<ProjectDocument />', () => {
  let AD: JSX.Element;
  beforeAll(() => {
    jest.useFakeTimers();
    AWSMock.setSDKInstance(AWS);
    AWSMock.mock('S3', 'getSignedUrl', (func: string, obj: any) => {
      return null;
    });
    AWSMock.mock('S3', 'listObjects', (params: any, callback: Function) => {
      callback(null, { Contents: [{ Key: 'file1.csv' }] });
    });
    AD = <MemoryRouter initialEntries={['/1']}><Routes><Route path='/:projectId' element={<ProjectDocument />} /></Routes></MemoryRouter>;
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
});
