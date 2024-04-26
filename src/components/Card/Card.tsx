import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { useThumbnail } from '../../hooks/useGameEntities';

import { Character } from '../../types/Character';
import { GameEntity, GameEntityType } from '../../types/GameEntity';

import elementIcons from '../../assets/elements';
import pathIcons from '../../assets/paths';

interface GameEntityCardProps {
  entity: GameEntity,
  entityType: GameEntityType
}

const GameEntityCard: FC<GameEntityCardProps> = ({ entity, entityType }) => {
  const navigate = useNavigate();
  const { thumbnail } = useThumbnail(entity, entityType);

  let element = null;
  if (entityType === GameEntityType.CHARACTER) {
    element = (entity as Character).element;
  }

  return (
    <div className="card" onClick={() => {
      if (entity) {
        navigate(entity.id);
      }
    }} >
      <div className={`entity-portrait card-thumbnail rarity-${entity.rarity}`}>
        {thumbnail &&
          <img className="portrait" src={thumbnail} />
        }
        <div className="icons">
          <img className="path" src={pathIcons[entity.path]} title={entity.path} />
          {element &&
          <img className="element" src={elementIcons[element]} title={element} />
          }
        </div>
      </div>
      <div className="card-title" title={entity.name}>
        <span>{entity.name}</span>
      </div>
    </div>
  );
};

export default GameEntityCard;
