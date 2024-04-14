import { FC, useCallback } from 'react';
import { Character } from '../../types/Character';
import { useThumbnail } from '../../hooks/useGameEntities';

import elementIcons from '../../assets/elements';
import pathIcons from '../../assets/paths';
import { useNavigate } from 'react-router-dom';
import { LightCone } from '../../types/LightCone';
import { GameEntityType } from '../../types/GameEntity';

interface LightConeCardProps {
  lightCone: LightCone
}

const LightConeCard: FC<LightConeCardProps> = ({ lightCone }) => {
  const navigate = useNavigate();
  const { thumbnail } = useThumbnail(lightCone, GameEntityType.LIGHT_CONE);

  return (
    <div className="card" onClick={() => {
      if (lightCone) {
        navigate(lightCone.id);
      }
    }} >
      <div className={`card-thumbnail rarity-${lightCone.rarity}`}>
        {thumbnail &&
          <img className="portrait" src={thumbnail} />
        }
        <div className="icons">
          <img className="path" src={pathIcons[lightCone.path]} title={lightCone.path} />
        </div>
      </div>
      <div className="card-title">{lightCone.name}</div>
    </div>
  );
};

export default LightConeCard;
