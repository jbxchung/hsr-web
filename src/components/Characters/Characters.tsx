import { FC, useEffect, useState } from 'react';
// import { getCharacters } from '../../api/Character';
import { useAuth } from '../../hooks/useAuth';
import { UserRole } from '../../types/User';

import './Characters.scss';
import PlusCircle from '../Icons/PlusCircle';
import { useGameEntities } from '../../hooks/useGameEntities';
import { GameEntityType } from '../../types/GameEntity';
import { Character } from '../../types/Character';
import Card from '../Card/Card';

const Characters: FC = () => {
  const { user } = useAuth();
  const { response: characters, isLoading, error, invoke } = useGameEntities(GameEntityType.CHARACTER);

  return (
    <div className="characters">
      <div className="filter-bar">
        todo: implement filter and search
      </div>
      <div className="card-list">
        {user?.role === UserRole.ADMIN && (
          <div className="card new-character" onClick={() => alert('todo: open form to add new character')}>
            <PlusCircle />
          </div>
        )}
        {characters && Object.values(characters).map(c => <Card key={c.id} entity={c} entityType={GameEntityType.CHARACTER} />)}
          {/* {"id":"testcharacter","name":"test character","rarity":5,"path":"Erudition","element":"Fire","description":"test description"} */}
      </div>
    </div>
  );
};

export default Characters;
