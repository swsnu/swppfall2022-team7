import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ProjectDocument from './ProjectDocument';
import * as AWSMock from 'aws-sdk-mock';
import AWS from 'aws-sdk';
import { render, waitFor } from '@testing-library/react';
import axios from 'axios';
import { fakeDocumentSpace1 } from '@utils/testDummy';
import useBindStore from '@store/zustand';

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
  it('should render', async () => {
    axios.get = jest.fn().mockResolvedValue({ data: [fakeDocumentSpace1] });
    render(AD);
    await waitFor(() => { expect(useBindStore.getState().documentSpaces).toEqual([fakeDocumentSpace1]) });
  });
});
