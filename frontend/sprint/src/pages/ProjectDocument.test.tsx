import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ProjectDocument from './ProjectDocument';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import { fakeDocumentSpace1, fakeProject1 } from '@utils/testDummy';
import useBindStore from '@store/zustand';
import { act } from 'react-dom/test-utils';

describe('<ProjectDocument />', () => {
  let AD: JSX.Element;
  beforeAll(() => {
    jest.useFakeTimers();
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
    await waitFor(() => { expect(useBindStore.getState().documentSpaces).toEqual([fakeDocumentSpace1]); });
  });
  it('should handle add document space', async () => {
    const i = useBindStore.getState();
    i.selectedProject = fakeProject1;
    i.documentSpaces = [fakeDocumentSpace1];
    axios.get = jest.fn().mockResolvedValue({ data: [fakeDocumentSpace1] });
    axios.post = jest.fn();
    render(AD);
    await waitFor(() => { expect(useBindStore.getState().documentSpaces).toEqual([fakeDocumentSpace1]); });
    const addButton = screen.getAllByRole('button')[0];
    await act(async () => { fireEvent.click(addButton); });
    const spacename = screen.getByRole('textbox');
    await act(async () => { fireEvent.change(spacename, { target: { value: "testspacename" } }); });
    const okbutton = screen.getAllByRole('button')[4];
    await act(async () => { fireEvent.click(okbutton); });
  });
  it('should handle cancel add document space', async () => {
    const i = useBindStore.getState();
    i.selectedProject = fakeProject1;
    i.documentSpaces = [fakeDocumentSpace1];
    axios.get = jest.fn().mockResolvedValue({ data: [fakeDocumentSpace1] });
    axios.post = jest.fn();
    render(AD);
    await waitFor(() => { expect(useBindStore.getState().documentSpaces).toEqual([fakeDocumentSpace1]); });
    const addButton = screen.getAllByRole('button')[0];
    await act(async () => { fireEvent.click(addButton); });
    const spacename = screen.getByRole('textbox');
    await act(async () => { fireEvent.change(spacename, { target: { value: "testspacename" } }); });
    const okbutton = screen.getAllByRole('button')[3];
    await act(async () => { fireEvent.click(okbutton); });
  });
  it('should handle add document space w/ enter', async () => {
    AD = <MemoryRouter initialEntries={['/']}><Routes><Route path='/' element={<ProjectDocument />} /></Routes></MemoryRouter>;
    const i = useBindStore.getState();
    i.selectedProject = fakeProject1;
    i.documentSpaces = [fakeDocumentSpace1];
    axios.get = jest.fn().mockResolvedValue({ data: [fakeDocumentSpace1] });
    axios.post = jest.fn();
    render(AD);
    await waitFor(() => { expect(useBindStore.getState().documentSpaces).toEqual([fakeDocumentSpace1]); });
    const addButton = screen.getAllByRole('button')[0];
    await act(async () => { fireEvent.click(addButton); });
    const spacename = screen.getByRole('textbox');
    await act(async () => { fireEvent.change(spacename, { target: { value: "testspacename" } }); });
    await act(async () => { fireEvent.keyPress(spacename, { key: 'p', code: 112, charCode: 112 }); })
    await act(async () => { fireEvent.keyPress(spacename, { key: 'Enter', code: 13, charCode: 13 }); })
  });
});
