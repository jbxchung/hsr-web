import { FC } from 'react';
import { useAuth } from '../../hooks/useAuth';

import { UserRole } from '../../types/User';
import { GameEntity, GameEntityType } from '../../types/GameEntity';

import Card from '../Card/Card';
import PlusCircle from '../Icons/PlusCircle';

import './Card.scss';

interface CardListProps {
  entities: Array<GameEntity>;
  entityType: GameEntityType;
  createNew?: Function;
}

const CardList: FC<CardListProps> = ({ entities, entityType, createNew }) => {
  const { user } = useAuth();

  return (
    <div className="card-list">
      {user?.role === UserRole.ADMIN && (
        <div className="card new-entity" onClick={() => createNew && createNew()}>
          <PlusCircle />
        </div>
      )}
      {Object.values(entities).map(e => <Card key={e.id} entity={e} entityType={entityType} />)}
    </div>
  );
};

export default CardList;
