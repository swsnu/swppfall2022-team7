import { fireEvent, render, screen } from '@testing-library/react';
import { fakeDocumentSpace1 } from '@utils/testDummy';
import axios from 'axios';
import { act } from 'react-dom/test-utils';
import DocumentPanel from './DocumentPanel';
import DocUploader from './DocUploader';

jest.mock('./DocUploader', () => () => {
  return <></>;
});

DocUploader.displayName = 'asdf';

describe('<DocumentPanel />', () => {
  let AD: JSX.Element;
  beforeAll(() => {
    jest.spyOn(global.console, 'error').mockImplementation(() => {});
    jest.useFakeTimers();
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
