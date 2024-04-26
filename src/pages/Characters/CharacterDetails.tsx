import { FC, MouseEvent, useCallback, useEffect, useState } from 'react';
import { Character, DefaultCharacter, CharacterElement } from '../../types/Character';

import Input from '../../components/Input/Input';
import { useGameEntity, usePostGameEntity, useThumbnail } from '../../hooks/useGameEntities';
import { GameEntityPath, GameEntityType } from '../../types/GameEntity';
import Loader from '../../components/Loader/Loader';
import pathIcons from '../../assets/paths';
import elementIcons from '../../assets/elements';
import { useParams } from 'react-router-dom';

const CharacterDetails: FC = () => {
  const { entityId } = useParams();

  const { response: characterDetail, isLoading: characterLoading } = useGameEntity(entityId!, GameEntityType.CHARACTER);
  const { thumbnail, isLoading: thumbnailLoading } = useThumbnail(entityId!, GameEntityType.CHARACTER);
  
  const character = {
    ...characterDetail as Character,
    thumbnail
  };

  // for admin only
  const [editedCharacter, setEditedCharacter] = useState<Character>(DefaultCharacter);
  const { response: updatedCharacter, isLoading, error: errorCreatingCharacter, invoke: updateCharacter } = usePostGameEntity(GameEntityType.CHARACTER);
  
  return (
    <div className="main-content character-details">
      {characterLoading && 
        <Loader />
      }
      {characterDetail && <>
        <div className="summary">
          <div className="summary-details">
            <h1>{character.name}</h1>
            <p>{character.path}</p>
            <p>{character.element}</p>
            <p>{character.rarity}</p>
            <p>{character.description}</p>
          </div>
          <div className={`entity-portrait rarity-${character.rarity}`}>
            {thumbnailLoading &&
              <Loader />
            }
            {character.thumbnail &&
              <img className="character-portrait" src={character.thumbnail} />
            }
          </div>
        </div>
        <p>
          Coming Soon: Additional details on stats and upgrades
        </p>
      </>}
    </div>
  );
}

export default CharacterDetails;