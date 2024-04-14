import { FC } from 'react';
import { Character } from '../../types/Character';
import { useThumbnail } from '../../hooks/useCharacters';

import elementIcons from '../../assets/elements';
import pathIcons from '../../assets/paths';

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
          <img className="portrait" src={thumbnail} />
        }
        <div className="icons">
          <img className="element" src={elementIcons[character.element]} />
        </div>
      </div>
      <div className="card-title">{character.name}</div>
    </div>
  );
};

export default CharacterCard;
