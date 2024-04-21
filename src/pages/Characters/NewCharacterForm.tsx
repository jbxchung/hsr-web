import { FC, MouseEvent, useCallback, useEffect, useState } from 'react';
import { User, UserRole } from '../../types/User';
import { Character } from '../../types/Character';
import { usePostUser } from '../../hooks/useUsers';

import Input from '../../components/Input/Input';
import { usePostGameEntity } from '../../hooks/useGameEntities';
import { GameEntityPath, GameEntityType } from '../../types/GameEntity';

interface NewCharacterFormProps {
  onCharacterCreated: (character?: Character) => void;
  closeModal: (e?: MouseEvent<HTMLButtonElement>) => void;
}

const NewCharacterForm: FC<NewCharacterFormProps> = (props: NewCharacterFormProps) => {
  const [characterName, setCharacterName] = useState<string>('');
  const [characterPath, setCharacterPath] = useState<GameEntityPath>();

  const [createButtonDisabled, setCreateButtonDisabled] = useState<boolean>(true);

  const { gameEntity: createdCharacter, isLoading, error: errorCreatingCharacter, invoke: createCharacter } = usePostGameEntity(GameEntityType.CHARACTER);

  // todo: input validation
  // useEffect(() => {
  //   setCreateButtonDisabled(!username || !email || !password);
  // }, [username, email, password, setCreateButtonDisabled]);

  const submitNewCharacter = useCallback(async () => {
    createCharacter({
      
    });
  }, []);

  useEffect(() => {
    if (createdCharacter) {
      console.log('created character', createdCharacter);
      props.onCharacterCreated();
      props.closeModal();
    }
  }, [createdCharacter]);

  useEffect(() => {
    if (errorCreatingCharacter) {
      console.error('error creating user', errorCreatingCharacter);
    }
  }, [errorCreatingCharacter]);

  return (
    <div className="new-character modal form">
      <h1>New Character</h1>
      <Input
        required={true}
        className="form-field"
        placeholder="Character Name"
        value={characterName}
        onChange={(e) => setCharacterName(e.target.value)}
      />
      <div className="form-field">
        <select
          value={characterPath}
          onChange={e => setCharacterPath(e.target.value as GameEntityPath)}
        >
          {Object.entries(GameEntityPath).map(([key, value]) => (
            <option value={value}>{key}</option>
          ))}
        </select>
      </div>
      <div className="form-buttons">
        <button className="primary" disabled={createButtonDisabled} onClick={submitNewCharacter}>
          Create
        </button>
        <button className="danger"  onClick={props.closeModal}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default NewCharacterForm;