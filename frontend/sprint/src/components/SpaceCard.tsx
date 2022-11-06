interface SpaceCardProps {
  name: string
  email: string
}

const SpaceCard: React.FC<SpaceCardProps> = ({ name, email }: SpaceCardProps) => {
  return (
    <div className="member-card-container">
      <a href="https://google.com" target="_blank" rel="noreferrer">
          <img
            className="member-picture"
            src="https://bobbyhadz.com/images/blog/react-prevent-page-refresh-on-form-submit/thumbnail.webp"
            alt="example"
          />
        </a>
        <div className="member-description-container">
          <div className="member-name">{name}</div>
          <div className="member-email">{email}</div>
        </div>
    </div>
  );
};

export default SpaceCard;
