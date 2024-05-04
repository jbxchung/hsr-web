import { FC, useState } from 'react';
import { useGameEntities } from '../../hooks/useGameEntities';
import { GameEntityType } from '../../types/GameEntity';
import CardList from '../../components/Card/CardList';
import Loader from '../../components/Loader/Loader';
import NewLightConeForm from './NewLightConeForm';

import './LightCones.scss';

const LightCones: FC = () => {
  const { response: lightCones, isLoading, error, invoke: refreshLightConeList } = useGameEntities(GameEntityType.LIGHT_CONE);
  const [showNewLightConeForm, setShowNewLightConeForm] = useState<boolean>(false);

  return (
    <div className="light-cones">
      <div className="filter-bar">
        todo: implement filter and search
      </div>
      {isLoading && (
        <div className="loading-overlay">
          <Loader />
        </div>
      )}
      {showNewLightConeForm &&
        <NewLightConeForm
          onLightConeCreated={refreshLightConeList}
          closeModal={() => setShowNewLightConeForm(false)}
        />
      }
      {lightCones && <CardList entities={lightCones} entityType={GameEntityType.LIGHT_CONE} createNew={() => setShowNewLightConeForm(true)} />}
    </div>
  );
};

export default LightCones;
