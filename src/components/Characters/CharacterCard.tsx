import { FC, useCallback } from 'react';
import { Character } from '../../types/Character';
import { useThumbnail } from '../../hooks/useCharacters';

import elementIcons from '../../assets/elements';
import pathIcons from '../../assets/paths';
import { useNavigate } from 'react-router-dom';

interface CharacterCardProps {
  character: Character
}

const CharacterCard: FC<CharacterCardProps> = ({ character }) => {
  const navigate = useNavigate();
  const { thumbnail } = useThumbnail(character);

  return (
    <div className="card" onClick={() => {
      if (character) {
        navigate(character.id);
      }
    }} >
      <div className={`card-thumbnail rarity-${character.rarity}`}>
        {thumbnail &&
          <img className="portrait" src={thumbnail} />
        }
        <div className="icons">
          <img className="path" src={pathIcons[character.path]} title={character.path} />
          <img className="element" src={elementIcons[character.element]} title={character.element} />
        </div>
      </div>
      <div className="card-title">{character.name}</div>
    </div>
  );
};

export default CharacterCard;
