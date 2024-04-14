import { FC, useEffect, useState } from 'react';
// import { getCharacters } from '../../api/Character';
import { useAuth } from '../../hooks/useAuth';
import { UserRole } from '../../types/User';
import Card from '../Card/Card';

import './LightCones.scss';
import PlusCircle from '../Icons/PlusCircle';
import { useGameEntities } from '../../hooks/useGameEntities';
import { GameEntityType } from '../../types/GameEntity';
import LightConeCard from './LightConeCard';

const LightCones: FC = () => {
  const { user } = useAuth();
  const { response: lightCones, isLoading, error, invoke } = useGameEntities(GameEntityType.LIGHT_CONE);

  return (
    <div className="light-cones">
      <div className="filter-bar">
        todo: implement filter and search
      </div>
      <div className="card-list">
        {user?.role === UserRole.ADMIN && (
          <div className="card new-entity" onClick={() => alert('todo: open form to add new light cone')}>
            <PlusCircle />
          </div>
        )}
        {lightCones && Object.values(lightCones).map(lc => <LightConeCard key={lc.id} lightCone={lc} />)}
          {/* {"id":"testcharacter","name":"test character","rarity":5,"path":"Erudition","element":"Fire","description":"test description"} */}
      </div>
    </div>
  );
};

export default LightCones;
