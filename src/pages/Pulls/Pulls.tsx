import { FC, useCallback, useEffect, useState } from 'react';

import Loader from '../../components/Loader/Loader';
import PullRecord from './PullRecord';

import { useGameEntities } from '../../hooks/useGameEntities';
import { useAddPull, usePulls } from '../../hooks/usePulls';

import { GameEntity, GameEntityType } from '../../types/GameEntity';
import { GachaPull } from '../../types/GachaPull';

import './Pulls.scss';

const PullRecords: FC = () => {
  const { response: characters} = useGameEntities(GameEntityType.CHARACTER);
  const { response: lightcones } = useGameEntities(GameEntityType.LIGHT_CONE);

  const { response: pullResponse, isLoading: pullsLoading } = usePulls();
  const { response: newPull, invoke: addPull } = useAddPull();
  const [pullList, setPullList] = useState<Array<GachaPull>>([]);

  const [newPullType, setNewPullType] = useState<GameEntityType>(GameEntityType.CHARACTER);
  const [newPullOptions, setNewPullOptions] = useState<Array<GameEntity>>([]);
  const [newPullSelection, setNewPullSelection] = useState<string>();

  // set options for new pull entry
  useEffect(() => {
    if (characters && newPullType === GameEntityType.CHARACTER) {
      setNewPullOptions(characters);
      setNewPullSelection(characters[0].id);
    } else if (lightcones && newPullType === GameEntityType.LIGHT_CONE) {
      setNewPullOptions(lightcones);
      setNewPullSelection(lightcones[0].id);
    }
  }, [newPullType, characters, lightcones, setNewPullOptions]);

  // handle local component state with new entries
  useEffect(() => {
    if (pullResponse?.length && !pullList.length) {
      // initial list
      setPullList(pullResponse);
    } else {
      // with added characters
      let updatedPullList = [...pullList];
        if (newPull) {
          updatedPullList.unshift(newPull);
        }
      setPullList(updatedPullList)
    }
  }, [pullResponse, newPull])

  return (
    <div className="main-content pull-records">
      {pullsLoading && 
        <Loader />
      }
      {pullList &&
        <div className="pull-summary">
          {/* {JSON.stringify(pullSummary)} */}
        </div>
      }
      <div className="add-new-pull">
        <h2>Add New:</h2>
        <select onChange={(e) => setNewPullType(e.target.value as GameEntityType)}>
          <option value={GameEntityType.CHARACTER}>Character</option>
          <option value={GameEntityType.LIGHT_CONE}>Light Cone</option>
        </select>
        <select onChange={(e) => setNewPullSelection(e.target.value)} value={newPullSelection}>
          {newPullOptions?.map(e => (
            <option key={e.id} value={e.id}>
              {e.name}
            </option>
          ))}
        </select>
        <button className="primary add-pull-button" onClick={() => {
          addPull({
            entityType: newPullType,
            entityId: newPullSelection,
          });
        }} >
          {/* <PlusCircle /> */}
          Add New Pull
        </button>
      </div>
      {pullList &&
        <div className="pull-list">
          {pullList.map(pull => (
            <PullRecord key={pull.timestamp} pullResult={pull} />
          ))}
        </div>
      }
    </div>
  );
}

export default PullRecords;