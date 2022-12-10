import moment from 'moment';
import ProjectCalendar from './ProjectCalendar';
import ReactRouter from 'react-router';
import { render } from '@testing-library/react';
import useBindStore from '@store/zustand';
import { fakeProject1 } from '@utils/testDummy';

const now = new Date();
const nowDate = moment(now).format('YYYY-MM-DD');

const mockNavigate = jest.fn();
jest.mock('react-router', () => ({ ...jest.requireActual('react-router'), useNavigate: () => mockNavigate }));

describe('<ProjectCalendar />', () => {
  let AD: JSX.Element;
  beforeAll(() => {
    AD = <ProjectCalendar />;
    global.matchMedia = global.matchMedia ?? function () {
      return {
        addListener: jest.fn(),
        removeListener: jest.fn()
      };
    };
  });
  it('should render', () => {
    const i = useBindStore.getState();
    i.selectedProject = fakeProject1;
    useBindStore.setState(i, true);
    render(AD);
  });
});
