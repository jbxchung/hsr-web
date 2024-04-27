import { FC } from 'react';
import { GachaPull } from '../../types/GachaPull';
import { useThumbnail } from '../../hooks/useGameEntities';

import pathIcons from '../../assets/paths';
import elementIcons from '../../assets/elements';
import { GameEntityType } from '../../types/GameEntity';
import { Character } from '../../types/Character';

interface PullRecordProps {
  pullResult: GachaPull;
}

const PullRecord: FC<PullRecordProps> = ({ pullResult }) => {
  const { thumbnail } = useThumbnail(pullResult.entity.id, pullResult.entityType);

  const formattedTimestamp = new Date(pullResult.timestamp).toLocaleString().replace(/,/, '');

  let element = null;
  if (pullResult.entityType === GameEntityType.CHARACTER) {
    element = (pullResult.entity as Character).element;
  }

  return (
    <div className={`pull-record rarity-${pullResult.entity.rarity}`}>
      <div className="timestamp">
        {formattedTimestamp}
      </div>
      <div className="pull-entity-name">
        {pullResult.entity.name}
      </div>
      <div className="pull-thumbnail">
      {thumbnail &&
        <img src={thumbnail} />
      }
      </div>
      <div className="pull-entity-icons">
        {element &&
        <img className="element" src={elementIcons[element]} title={element} />
        }
        <img className="path" src={pathIcons[pullResult.entity.path]} title={pullResult.entity.path} />
      </div>
    </div>
  );
}

export default PullRecord;
