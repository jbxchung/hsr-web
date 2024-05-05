import { FC, MouseEvent, useCallback, useEffect, useState } from 'react';
import { Character, DefaultCharacter, CharacterElement } from '../../types/Character';

import Input from '../../components/Input/Input';
import { usePostGameEntity } from '../../hooks/useGameEntities';
import { GameEntityPath, GameEntityType } from '../../types/GameEntity';
import Modal from '../../components/Modal/Modal';
import { LightCone } from '../../types/LightCone';

interface NewLightConeFormProps {
  onLightConeCreated: (lightCone?: LightCone) => void;
  closeModal: (e?: MouseEvent<HTMLButtonElement>) => void;
}

const NewLightConeForm: FC<NewLightConeFormProps> = (props: NewLightConeFormProps) => {
  const [newLightCone, setNewLightCone] = useState<LightCone>(DefaultCharacter);

  const [createButtonDisabled, setCreateButtonDisabled] = useState<boolean>(true);

  const { response: createdLightCone, isLoading, error: errorCreatingLightCone, invoke: createLightCone } = usePostGameEntity(GameEntityType.LIGHT_CONE);

  const updateLightCone = useCallback((field: keyof LightCone, value?: any) => {
    const editedLightCone = {
      ...newLightCone,
      [field]: value,
    }

    if (field === 'name') {
      editedLightCone.id = value.toLowerCase().replace(/ /g, '');
    }

    setNewLightCone(editedLightCone);
  }, [newLightCone]);

  // input validation
  useEffect(() => {
    setCreateButtonDisabled(!newLightCone.name || !newLightCone.description || !newLightCone.thumbnail);
  }, [newLightCone, setCreateButtonDisabled]);

  const submitNewLightCone = useCallback(async () => {
    const formdata = new FormData();
    formdata.append('id', newLightCone.id);
    formdata.append('name', newLightCone.name);
    formdata.append('rarity', newLightCone.rarity.toString());
    formdata.append('path', newLightCone.path.toUpperCase().replace(/ /g, '_'));
    formdata.append('description', newLightCone.description);
    formdata.append('thumbnail', new Blob([newLightCone.thumbnail!]), `${newLightCone.id}.webp`);
    createLightCone(formdata);
  }, [newLightCone, createLightCone]);

  useEffect(() => {
    if (createdLightCone) {
      console.log('created light cone', createdLightCone);
      props.onLightConeCreated();
      props.closeModal();
    }
  }, [createdLightCone]);

  useEffect(() => {
    if (errorCreatingLightCone) {
      console.error('error creating light cone', errorCreatingLightCone);
    }
  }, [errorCreatingLightCone]);

  return (
    <Modal closeModal={props.closeModal}>
      <div className="new-light-cone form">
        <h1>New Light Cone</h1>
        <Input
          required={true}
          className="form-field"
          placeholder="Light Cone Name"
          value={newLightCone?.name}
          onChange={(e) => updateLightCone('name', e.target.value)}
        />
        <div className="form-field">
          <span className="dropdown-label">Rarity:</span>
          <select
            value={newLightCone?.rarity}
            onChange={e => updateLightCone('rarity', e.target.value)}
          >
            <option key={3} value={3}>{3}</option>
            <option key={4} value={4}>{4}</option>
            <option key={5} value={5}>{5}</option>
          </select>
        </div>
        <div className="form-field">
          <span className="dropdown-label">Path:</span>
          <select
            value={newLightCone?.path}
            onChange={e => updateLightCone('path', e.target.value)}
          >
            {Object.entries(GameEntityPath).map(([key, value]) => (
              <option key={key} value={key}>{value}</option>
            ))}
          </select>
        </div>
        <Input
          required={true}
          className="form-field"
          placeholder="Description"
          value={newLightCone?.description}
          onChange={(e) => updateLightCone('description', e.target.value)}
        />
        {/* TODO: style thumbnail upload */}
        <input
          type="file"
          accept="image/webp"
          className="form-field"
          // value={newCharacter?.thumbnail || ''}
          onChange={(e) => updateLightCone('thumbnail', e.target.files ? e.target.files[0] : null)}
        />
        <div className="form-buttons">
          <button className="primary" disabled={createButtonDisabled} onClick={submitNewLightCone}>
            Create
          </button>
          <button className="danger"  onClick={props.closeModal}>
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default NewLightConeForm;