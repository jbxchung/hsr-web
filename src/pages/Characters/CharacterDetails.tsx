import { FC, MouseEvent, useCallback, useEffect, useState } from 'react';
import { Character, DefaultCharacter, CharacterElement } from '../../types/Character';

import Input from '../../components/Input/Input';
import { useGameEntities, useGameEntity, usePostGameEntity, useThumbnail } from '../../hooks/useGameEntities';
import { GameEntityPath, GameEntityType } from '../../types/GameEntity';
import Modal from '../../components/Modal/Modal';
import Loader from '../../components/Loader/Loader';
import GameEntityCard from '../../components/Card/Card';
import pathIcons from '../../assets/paths';
import elementIcons from '../../assets/elements';
import { useParams } from 'react-router-dom';
interface NewCharacterFormProps {
  character: Character;
  // closeModal: (e?: MouseEvent<HTMLButtonElement>) => void;
}

const CharacterDetails: FC = () => {
  const { entityId } = useParams();

  const { response: characterDetail, isLoading: characterLoading, error } = useGameEntity(entityId!, GameEntityType.CHARACTER);
  const { thumbnail, isLoading: thumbnailLoading } = useThumbnail(entityId!, GameEntityType.CHARACTER);
  
  const character = {
    ...characterDetail as Character,
    thumbnail
  };
  
  // for admin only
  const [editedCharacter, setEditedCharacter] = useState<Character>(DefaultCharacter);

  // const { response: updatedCharacter, isLoading, error: errorCreatingCharacter, invoke: updateCharacter } = usePostGameEntity(GameEntityType.CHARACTER);
  
  return (
    // <Modal closeModal={props.closeModal}>
      <div className="main-content character-details">
        <div className="summary">
          <div className="summary-details">
            <h1>{character.name}</h1>
            <p>{character.path}</p>
            <p>{character.element}</p>
            <p>{character.rarity}</p>
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
        <div className="description">
          {character.description}
        </div>
      </div>
    // </Modal>
  );
}

export default CharacterDetails;