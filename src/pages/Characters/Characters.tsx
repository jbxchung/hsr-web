import { FC, useEffect, useState } from 'react';
import { useGameEntities } from '../../hooks/useGameEntities';
import { GameEntityType } from '../../types/GameEntity';
import CardList from '../../components/Card/CardList';
import Loader from '../../components/Loader/Loader';

import './Characters.scss';
import NewCharacterForm from './NewCharacterForm';
import { useLocation, useNavigate } from 'react-router-dom';
import { Character } from '../../types/Character';
import CharacterDetails from './CharacterDetails';

const Characters: FC = () => {
  const { response: characters, isLoading, error, invoke: refreshCharacterList } = useGameEntities(GameEntityType.CHARACTER);
  const [showNewCharacterForm, setShowNewCharacterForm] = useState<boolean>(false);
  
  // decide if we should show a modal of a specific character based on url path
  const location = useLocation();
  const navigate = useNavigate();
  let characterDetail = null;
  const splitPath = location.pathname.split('/').filter(pathSegment => !!pathSegment);
  if (splitPath[1]) {
    characterDetail = characters?.find(c => c.id === splitPath[1]) as Character;
  }

  return (
    <div className="characters">
      <div className="filter-bar">
        todo: implement filter and search
      </div>
      {isLoading && (
        <div className="loading-overlay">
          <Loader />
        </div>
      )}
      {showNewCharacterForm &&
        <NewCharacterForm
          onCharacterCreated={refreshCharacterList}
          closeModal={() => setShowNewCharacterForm(false)}
        />
      }
      {characterDetail &&
        <CharacterDetails
          character={characterDetail}
          closeModal={() => navigate('/characters')}
        />
      }
      {characters && <CardList entities={characters} entityType={GameEntityType.CHARACTER} createNew={() => setShowNewCharacterForm(true)} />}
    </div>
  );
};

export default Characters;
