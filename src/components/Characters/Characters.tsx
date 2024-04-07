import { FC, useEffect, useState } from 'react';
import { getCharacters } from '../../api/Character';
import { useAuth } from '../../hooks/useAuth';
import { UserRole } from '../../types/User';

const Characters: FC = () => {
  const { user } = useAuth();
  const [characterList, setCharacterList] = useState([]);

  useEffect(() => {
    (async () => {
      const characters = await getCharacters();
      console.log(characters);
      setCharacterList(characters);
    })();
  }, [setCharacterList]);

  return (
    <div className="characters">
      {user?.role === UserRole.ADMIN && (
        <div className="admin-action-panel">
          <h2>Admin Actions</h2>
          <button className="button primary" onClick={() => alert('todo: open new character form')}>Add New Character</button>
        </div>
      )}
      <div className="card-list">
        {characterList.map(c => JSON.stringify(c))}
          {/* {"id":"testcharacter","name":"test character","rarity":5,"path":"Erudition","element":"Fire","description":"test description"} */}
        <div className="card">
          <h3>Character Name</h3>
          placeholder
        </div>
      </div>
    </div>
  );
};

export default Characters;
