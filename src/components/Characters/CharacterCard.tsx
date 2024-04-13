import { FC } from 'react';
import { Character } from '../../types/Character';
import { useThumbnail } from '../../hooks/useCharacters';

interface CharacterCardProps {
  character: Character
}

const CharacterCard: FC<CharacterCardProps> = ({ character }) => {
  console.log(character);

  const { thumbnail } = useThumbnail(character);

  return (
    <div className="card">
      <h3>{character.name}</h3>
      <p>{character.description}</p>
      {thumbnail &&
        <img src={URL.createObjectURL(thumbnail)} />
      }
    </div>
  );
};

export default CharacterCard;
