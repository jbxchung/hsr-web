import { FC, useState } from 'react';
import { useGameEntities } from '../../hooks/useGameEntities';
import { GameEntityType } from '../../types/GameEntity';
import CardList from '../../components/Card/CardList';

import './Characters.scss';
import NewCharacterForm from './NewCharacterForm';

const Characters: FC = () => {
  const { response: characters, isLoading, error, invoke } = useGameEntities(GameEntityType.CHARACTER);

  const [showNewCharacterForm, setShowNewCharacterForm] = useState<boolean>(false);

  return (
    <div className="characters">
      <div className="filter-bar">
        todo: implement filter and search
      </div>
      {showNewCharacterForm && <NewCharacterForm onCharacterCreated={() => console.log('todo: add new character to state')}
        closeModal={() => setShowNewCharacterForm(false)} />
      }
      {characters && <CardList entities={characters} entityType={GameEntityType.CHARACTER} createNew={() => setShowNewCharacterForm(true)} />}
    </div>
  );
};

export default Characters;
