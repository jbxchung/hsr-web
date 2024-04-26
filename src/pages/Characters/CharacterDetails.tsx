import { FC, MouseEvent, useCallback, useEffect, useState } from 'react';
import { Character, DefaultCharacter, CharacterElement } from '../../types/Character';

import Input from '../../components/Input/Input';
import { usePostGameEntity, useThumbnail } from '../../hooks/useGameEntities';
import { GameEntityPath, GameEntityType } from '../../types/GameEntity';
import Modal from '../../components/Modal/Modal';
import Loader from '../../components/Loader/Loader';
import GameEntityCard from '../../components/Card/Card';
import pathIcons from '../../assets/paths';
import elementIcons from '../../assets/elements';
interface NewCharacterFormProps {
  character: Character;
  closeModal: (e?: MouseEvent<HTMLButtonElement>) => void;
}

const CharacterDetails: FC<NewCharacterFormProps> = (props: NewCharacterFormProps) => {
  const { thumbnail, isLoading: thumbnailLoading } = useThumbnail(props.character, GameEntityType.CHARACTER);
  // for admin only
  const [editedCharacter, setEditedCharacter] = useState<Character>(DefaultCharacter);

  const { response: updatedCharacter, isLoading, error: errorCreatingCharacter, invoke: updateCharacter } = usePostGameEntity(GameEntityType.CHARACTER);
  console.log(props.character);
  return (
    <Modal closeModal={props.closeModal}>
      <div className="character-details">
        <div className="summary">
          <div className="summary-details">
            <h1>{props.character.name}</h1>
            <p>{props.character.path}</p>
            <p>{props.character.element}</p>
            <p>{props.character.rarity}</p>
          </div>
          <div className={`entity-portrait rarity-${props.character.rarity}`}>
            {thumbnailLoading &&
              <Loader />
            }
            {thumbnail &&
              <img className="character-portrait" src={thumbnail} />
            }
          </div>
        </div>
        <div className="description">
          {props.character.description}
        </div>
      </div>
    </Modal>
  );
}

export default CharacterDetails;