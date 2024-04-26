import { FC, MouseEvent, useCallback, useEffect, useState } from 'react';
import { Character, DefaultCharacter, CharacterElement } from '../../types/Character';

import Input from '../../components/Input/Input';
import { usePostGameEntity } from '../../hooks/useGameEntities';
import { GameEntityPath, GameEntityType } from '../../types/GameEntity';

interface NewCharacterFormProps {
  onCharacterCreated: (character?: Character) => void;
  closeModal: (e?: MouseEvent<HTMLButtonElement>) => void;
}

const NewCharacterForm: FC<NewCharacterFormProps> = (props: NewCharacterFormProps) => {
  const [newCharacter, setNewCharacter] = useState<Character>(DefaultCharacter);

  const [createButtonDisabled, setCreateButtonDisabled] = useState<boolean>(true);

  const { response: createdCharacter, isLoading, error: errorCreatingCharacter, invoke: createCharacter } = usePostGameEntity(GameEntityType.CHARACTER);

  const updateCharacter = useCallback((field: keyof Character, value?: any) => {
    const editedCharacter = {
      ...newCharacter,
      [field]: value,
    }

    if (field === 'name') {
      editedCharacter.id = value.toLowerCase().replace(/ /g, '');
    }

    setNewCharacter(editedCharacter);
  }, [newCharacter]);

  // input validation
  useEffect(() => {
    setCreateButtonDisabled(!newCharacter.name || !newCharacter.description || !newCharacter.thumbnail);
  }, [newCharacter, setCreateButtonDisabled]);

  const submitNewCharacter = useCallback(async () => {
    const formdata = new FormData();
    formdata.append('id', newCharacter.id);
    formdata.append('name', newCharacter.name);
    formdata.append('rarity', newCharacter.rarity.toString());
    formdata.append('path', newCharacter.path.toUpperCase().replace(/ /g, '_'));
    formdata.append('element', newCharacter.element.toUpperCase().replace(/ /g, '_'));
    formdata.append('description', newCharacter.description);
    formdata.append('thumbnail', new Blob([newCharacter.thumbnail!]), `${newCharacter.id}.webp`);
    createCharacter(formdata);
  }, [newCharacter, createCharacter]);

  useEffect(() => {
    if (createdCharacter) {
      console.log('created character', createdCharacter);
      props.onCharacterCreated();
      props.closeModal();
    }
  }, [createdCharacter]);

  useEffect(() => {
    if (errorCreatingCharacter) {
      console.error('error creating character', errorCreatingCharacter);
    }
  }, [errorCreatingCharacter]);

  return (
    <div className="new-character modal form">
      <h1>New Character</h1>
      <Input
        required={true}
        className="form-field"
        placeholder="Character Name"
        value={newCharacter?.name}
        onChange={(e) => updateCharacter('name', e.target.value)}
      />
      <div className="form-field">
        <span className="dropdown-label">Rarity:</span>
        <select
          value={newCharacter?.rarity}
          onChange={e => updateCharacter('rarity', e.target.value)}
        >
          <option key={4} value={4}>{4}</option>
          <option key={5} value={5}>{5}</option>
        </select>
      </div>
      <div className="form-field">
        <span className="dropdown-label">Path:</span>
        <select
          value={newCharacter?.path}
          onChange={e => updateCharacter('path', e.target.value)}
        >
          {Object.entries(GameEntityPath).map(([key, value]) => (
            <option key={key} value={key}>{value}</option>
          ))}
        </select>
      </div>
      <div className="form-field">
        <span className="dropdown-label">Element:</span>
        <select
          value={newCharacter?.element}
          onChange={e => updateCharacter('element', e.target.value)}
        >
          {Object.entries(CharacterElement).map(([key, value]) => (
            <option key={key} value={key}>{value}</option>
          ))}
        </select>
      </div>
      <Input
        required={true}
        className="form-field"
        placeholder="Description"
        value={newCharacter?.description}
        onChange={(e) => updateCharacter('description', e.target.value)}
      />
      {/* TODO: style thumbnail upload */}
      <input
        type="file"
        accept="image/webp"
        className="form-field"
        // value={newCharacter?.thumbnail || ''}
        onChange={(e) => updateCharacter('thumbnail', e.target.files ? e.target.files[0] : null)}
      />
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