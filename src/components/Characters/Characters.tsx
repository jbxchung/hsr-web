import { FC, useEffect, useState } from 'react';
import { getCharacters } from '../../api/Character';

const Characters: FC = () => {
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
      characters page placeholder
      {characterList.toString()}
    </div>
  );
};

export default Characters;
