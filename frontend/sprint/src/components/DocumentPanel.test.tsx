import * as AWSMock from 'aws-sdk-mock';
import AWS from 'aws-sdk';
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { fakeDocumentSpace1, fakeDocumentSpaceCard1, fakeDocumentSpaceCard2 } from "@utils/testDummy";
import axios from "axios";
import { act } from "react-dom/test-utils";
import DocSpaceCollapse from "./DocSpaceCollapse";
import DocumentPanel from './DocumentPanel';

jest.mock('./DocUploader', () => () => {
  return <></>;
});

describe('<DocumentPanel />', () => {
  let AD: JSX.Element;
  beforeAll(() => {
    jest.spyOn(global.console, 'error').mockImplementation(() => {});
    jest.useFakeTimers();
    AWSMock.setSDKInstance(AWS);
    AWSMock.mock('S3', 'getSignedUrl', (func: string, obj: any) => {
       return null;
    });
    AWSMock.mock('S3', 'listObjects', (params: any, callback: Function) => {
       callback(null, { Contents: [{ Key: '1/0_1_file1.csv' }, { Key: 'file2.csv' }] });
    });
    global.matchMedia = global.matchMedia ?? function () {
      return {
        addListener: jest.fn(),
        removeListener: jest.fn()
      };
    };
  });
  it('should render', async () => {
    AD = <DocumentPanel documentSpace={fakeDocumentSpace1}/>;
    axios.put = jest.fn();
    axios.get = jest.fn().mockResolvedValueOnce({ data: [fakeDocumentSpace1] }).mockResolvedValueOnce({ data: [fakeDocumentSpace1] });
    await act(async () => { render(AD); });
    const radios = screen.getAllByRole('radio');
    await act(async () => { fireEvent.click(radios[0]); });
    axios.get = jest.fn().mockResolvedValue({ data: { username: 'a' } });
    const button = screen.getByRole('button');
    await act(async () => { fireEvent.click(button); });
  });
  it('should render', async () => {
    AWSMock.mock('S3', 'listObjects', (params: any, callback: Function) => {
      callback(null, { Contents: [{ Key: undefined }, { Key: 'file2.csv' }] });
   });
    AD = <DocumentPanel documentSpace={fakeDocumentSpace1}/>;
    axios.put = jest.fn();
    axios.get = jest.fn().mockResolvedValueOnce({ data: [fakeDocumentSpace1] }).mockResolvedValueOnce({ data: [fakeDocumentSpace1] });
    await act(async () => { render(AD); });
    const radios = screen.getAllByRole('radio');
    await act(async () => { fireEvent.click(radios[0]); });
    axios.get = jest.fn().mockResolvedValue({ data: { username: 'a' } });
    const button = screen.getByRole('button');
    await act(async () => { fireEvent.click(button); });
  });
});
