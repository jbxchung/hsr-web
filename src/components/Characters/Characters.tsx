import { FC, useEffect, useState } from 'react';
// import { getCharacters } from '../../api/Character';
import { useAuth } from '../../hooks/useAuth';
import { UserRole } from '../../types/User';
import { useCharacters } from '../../hooks/useCharacters';
import CharacterCard from './CharacterCard';

import './Characters.scss';

const Characters: FC = () => {
  const { user } = useAuth();
  const { characters } = useCharacters();

  return (
    <div className="characters">
      {user?.role === UserRole.ADMIN && (
        <div className="admin-action-panel">
          <h2>Admin Actions</h2>
          <button className="button primary" onClick={() => alert('todo: open new character form')}>Add New Character</button>
        </div>
      )}
      <div className="card-list">
        {characters && Object.values(characters).map(c => <CharacterCard key={c.id} character={c} />)}
          {/* {"id":"testcharacter","name":"test character","rarity":5,"path":"Erudition","element":"Fire","description":"test description"} */}
      </div>
    </div>
  );
};

export default Characters;
