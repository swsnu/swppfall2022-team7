import MemberCard from '../components/MemberCard';
import TaskCard from '../components/TaskCard';

const ProjectIntro: React.FC = () => {
  return (
    <div className="project-intro">
      <div className="project-info">Summary of Thousands Brains: Scientific Tech and Writing</div>
      <div className="project-header">Description</div>
      <div className="project-description">Lorem Ipsum is simply dummy text of t
      he printing and typesetting industry. Lorem Ipsu
      m has been the industry&#39;s standard dum
      my text ever since the 1500s, when an unkno
      wn printer took a galley of type and scram
      bled it to make a type specimen book. It h
      as survived not only five centuries, but a
      lso the leap into electronic typesetting, rem
      aining essentially unchanged. It was popular
      ised in the 1960s with the release of Letras
      et sheets containing Lorem Ipsum passages, an
      d more recently with desktop publishing soft
      ware like Aldus PageMaker including vers
      ions of Lorem Ipsum.</div>
      <div className="project-header">Team Member</div>
      <div className="member-container">
        <MemberCard name="SangHun Kim" email="lpxp@gmail.com" />
        <MemberCard name="SangHyun Yi" email="brighthonor@gmail.com" />
        <MemberCard name="HyungJin Joo" email="hjjoo389@gmail.com" />
        <MemberCard name="SeokWo Choi" email="a42034523@gmail.com" />
      </div>
      <div className="project-header">Task List</div>
      <div className="member-container">
        <TaskCard name="Write First draft" assignee="SangHun Kim" />
        <TaskCard name="Write Second draft" assignee="SangHun Kim" />
        <TaskCard name="Write Final draft" assignee="SangHun Kim" />
      </div>
    </div>
  );
};

export default ProjectIntro;
