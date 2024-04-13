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
      <div className={`card-thumbnail rarity-${character.rarity}`}>
        {thumbnail &&
          <img src={thumbnail} />
        }
      </div>
      <div className="card-title">{character.name}</div>
    </div>
  );
};

export default CharacterCard;
