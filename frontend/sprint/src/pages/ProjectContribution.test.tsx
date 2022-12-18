import { render } from '@testing-library/react';
import ProjectContribution from './ProjectContribution';
import ReactRouter from 'react-router';
import useBindStore from '@store/zustand';
import { fakeProject1, fakeQuest1, fakeTimeline1 } from '@utils/testDummy';
import axios from 'axios';

const mockNavigate = jest.fn();
jest.mock('react-router', () => ({ ...jest.requireActual('react-router'), useNavigate: () => mockNavigate }));

describe('<ProjectContribution />', () => {
  let AD: JSX.Element;
  beforeAll(() => {
    jest.spyOn(global.console, 'error').mockImplementation(() => {});
    AD = <ProjectContribution />;
    global.matchMedia = global.matchMedia ?? function () {
      return {
        addListener: jest.fn(),
        removeListener: jest.fn()
      };
    };
  });
  it('should render', () => {
    jest.spyOn(ReactRouter, 'useParams');
    axios.get = jest.fn().mockResolvedValueOnce({ data: [fakeQuest1] }).mockResolvedValueOnce({ data: [fakeTimeline1] });
    const i = useBindStore.getState();
    i.selectedProject = fakeProject1;
    i.quest = [fakeQuest1];
    render(AD);
  });
});
