import MenuRouter from './MenuRouter';
import ReactRouter from 'react-router';
import { render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

const mockNavigate = jest.fn();
jest.mock('react-router', () => ({ ...jest.requireActual('react-router'), useNavigate: () => mockNavigate }));

jest.mock('../pages/TaskDetail', () => ()=> {
  return <div>TaskDetail</div>;
});

jest.mock('../pages/AddTask', () => () => {
  return <div>AddTask</div>;
});

jest.mock('../pages/ProjectDocument', () => () => {
  return <div>ProjectDocument</div>;
});

jest.mock('../pages/ProjectContribution', () => () => {
  return <div>ProjectContribution</div>;
});

jest.mock('../pages/ProjectCalendar', () => () => {
  return <div>ProjectCalendar</div>;
});

jest.mock('../pages/ProjectManage', () => () => {
  return <div>ProjectManage</div>;
});

describe('<MenuRouter />', () => {
  let AD: JSX.Element;
  beforeAll(() => {
    AD = <MenuRouter />;
    global.matchMedia = global.matchMedia ?? function () {
      return {
        addListener: jest.fn(),
        removeListener: jest.fn()
      };
    };
  });
  it('should show menu router addTask', async () => {
    jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ menuId: 'add_task' });
    await act(async () => { render(AD); });
  });
  it('should show menu router docs', async () => {
    jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ menuId: 'docs' });
    await act(async () => { render(AD); });
  });
  it('should show menu router contrib', async () => {
    jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ menuId: 'contrib' });
    await act(async () => { render(AD); });
  });
  it('should show menu router cal', async () => {
    jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ menuId: 'cal' });
    await act(async () => { render(AD); });
  });
  it('should show menu router settings', async () => {
    jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ menuId: 'settings' });
    await act(async () => { render(AD); });
  });
  it('should show menu router task undefined', async () => {
    jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ menuId: 'asdf', taskId: undefined });
    await act(async () => { render(AD); });
  });
  it('should show menu router task', async () => {
    jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ menuId: 'asdf', taskId: "1" });
    await act(async () => { render(AD); });
  });
});
