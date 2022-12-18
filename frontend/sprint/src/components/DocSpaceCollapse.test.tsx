import { fireEvent, render, screen } from '@testing-library/react';
import { fakeDocumentSpace1, fakeDocumentSpaceCard1, fakeDocumentSpaceCard2 } from '@utils/testDummy';
import axios from 'axios';
import { act } from 'react-dom/test-utils';
import DocSpaceCollapse from './DocSpaceCollapse';

jest.useFakeTimers();

jest.mock('./DocUploader', () => () => {
  return <></>;
});

describe('<DocSpaceCollapse />', () => {
  let AD: JSX.Element;
  beforeAll(() => {
    global.matchMedia = global.matchMedia ?? function () {
      return {
        addListener: jest.fn(),
        removeListener: jest.fn()
      };
    };
  });
  it('should render when no document space', async () => {
    AD = <DocSpaceCollapse documentSpaces={[]}/>;
    axios.get = jest.fn().mockResolvedValueOnce({ data: [fakeDocumentSpace1] }).mockResolvedValueOnce({ data: [fakeDocumentSpace1] });
    await act(async () => { render(AD); });
  });
  it('should render when document spaces exist', async () => {
    AD = <DocSpaceCollapse documentSpaces={[fakeDocumentSpaceCard1, fakeDocumentSpaceCard2]}/>;
    axios.get = jest.fn().mockResolvedValueOnce({ data: [fakeDocumentSpace1] }).mockResolvedValueOnce({ data: [fakeDocumentSpace1] });
    await act(async () => { render(AD); });
    const button = screen.getByText('Link Space');
    await act(async () => { fireEvent.click(button); });
  });
});
