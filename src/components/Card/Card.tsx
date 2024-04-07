import { FC } from 'react';

interface CardProps {
  title: string;
  bg: string;
}

const Card: FC<CardProps> = (props) => {

  return (
    <div className="card">
      <h3>{props.title}</h3>
      <img src={props.bg} />
    </div>
  );
};

export default Card;
