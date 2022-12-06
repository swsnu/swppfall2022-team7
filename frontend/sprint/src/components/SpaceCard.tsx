import { useNavigate } from 'react-router-dom';

interface SpaceCardProps {
  name: string
  email: string
}

const SpaceCard: React.FC<SpaceCardProps> = ({ name, email }: SpaceCardProps) => {
  const navigate = useNavigate();
  return (
    <div className="member-card-container" onClick={() => navigate('docs')}>
        <img
          className="member-picture"
          src="https://bobbyhadz.com/images/blog/react-prevent-page-refresh-on-form-submit/thumbnail.webp"
          alt="example"
        />
        <div className="member-description-container">
          <div className="member-name">{name}</div>
          <div className="member-email">{email}</div>
        </div>
    </div>
  );
};

export default SpaceCard;
