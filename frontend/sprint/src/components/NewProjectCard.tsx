import { PlusOutlined } from '@ant-design/icons';
import { Col } from 'antd';
import { useNavigate } from 'react-router-dom';

const NewProjectCard: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Col xs={24} sm={12} md={8} lg={6}>
      <div className="new-project-card" onClick={() => navigate('new-project')}>
        Add a New Project!
        <PlusOutlined className="plus-icon" />
      </div>
    </Col>
  );
};

export default NewProjectCard;
