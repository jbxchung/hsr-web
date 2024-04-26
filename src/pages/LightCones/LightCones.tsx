import { FC } from 'react';
import { useGameEntities } from '../../hooks/useGameEntities';
import { GameEntityType } from '../../types/GameEntity';
import CardList from '../../components/Card/CardList';
import Loader from '../../components/Loader/Loader';

import './LightCones.scss';

const LightCones: FC = () => {
  const { response: lightCones, isLoading, error, invoke } = useGameEntities(GameEntityType.LIGHT_CONE);

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
      {lightCones && <CardList entities={lightCones} entityType={GameEntityType.LIGHT_CONE} />}
    </div>
  );
};

export default LightCones;
