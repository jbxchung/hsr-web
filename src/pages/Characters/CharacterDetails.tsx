import { FC, MouseEvent, useCallback, useEffect, useState } from 'react';
import { Character, DefaultCharacter, CharacterElement } from '../../types/Character';

import Input from '../../components/Input/Input';
import { usePostGameEntity } from '../../hooks/useGameEntities';
import { GameEntityPath, GameEntityType } from '../../types/GameEntity';

interface NewCharacterFormProps {
  character: Character;
  closeModal: (e?: MouseEvent<HTMLButtonElement>) => void;
}

const CharacterDetails: FC<NewCharacterFormProps> = (props: NewCharacterFormProps) => {
  // for admin only
  const [editedCharacter, setEditedCharacter] = useState<Character>(DefaultCharacter);

  const { response: updatedCharacter, isLoading, error: errorCreatingCharacter, invoke: updateCharacter } = usePostGameEntity(GameEntityType.CHARACTER);

  return (
    <div className="modal-overlay">
      <div className="modal character-details">
        {JSON.stringify(props.character)}
      </div>
    </div>
  );
}

export default CharacterDetails;