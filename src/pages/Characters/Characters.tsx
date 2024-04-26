import { FC, useState } from 'react';
import { useGameEntities } from '../../hooks/useGameEntities';
import { GameEntityType } from '../../types/GameEntity';
import CardList from '../../components/Card/CardList';
import Loader from '../../components/Loader/Loader';

import './Characters.scss';
import NewCharacterForm from './NewCharacterForm';

const Characters: FC = () => {
  const { response: characters, isLoading, error, invoke: refreshCharacterList } = useGameEntities(GameEntityType.CHARACTER);

  const [showNewCharacterForm, setShowNewCharacterForm] = useState<boolean>(false);

  return (
    <div className="characters">
      <div className="filter-bar">
        todo: implement filter and search
      </div>
      {showNewCharacterForm && <NewCharacterForm onCharacterCreated={refreshCharacterList}
        closeModal={() => setShowNewCharacterForm(false)} />
      }
      {isLoading && (
        <div className="loading-overlay">
          <Loader />
        </div>
      )}
      {characters && <CardList entities={characters} entityType={GameEntityType.CHARACTER} createNew={() => setShowNewCharacterForm(true)} />}
    </div>
  );
};

export default Characters;
