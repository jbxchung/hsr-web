import { FC } from 'react';
import { useGameEntities } from '../../hooks/useGameEntities';
import { GameEntityType } from '../../types/GameEntity';
import CardList from '../Card/CardList';

import './Characters.scss';

const Characters: FC = () => {
  const { response: characters, isLoading, error, invoke } = useGameEntities(GameEntityType.CHARACTER);

  return (
    <div className="characters">
      <div className="filter-bar">
        todo: implement filter and search
      </div>
      {characters && <CardList entities={characters} entityType={GameEntityType.CHARACTER} />}
    </div>
  );
};

export default Characters;
