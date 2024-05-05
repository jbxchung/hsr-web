import { FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useAuth } from '../../hooks/useAuth';
import { useDeleteGameEntity, useGameEntity, useThumbnail } from '../../hooks/useGameEntities';

import { GameEntityType } from '../../types/GameEntity';
import { UserRole } from '../../types/User';
import { LightCone } from '../../types/LightCone';

import Loader from '../../components/Loader/Loader';

const LightConeDetails: FC = () => {
  const { entityId } = useParams();
  const { user } = useAuth();

  const navigate = useNavigate();

  const { response: lcDetail, isLoading: lcLoading } = useGameEntity(entityId!, GameEntityType.LIGHT_CONE);
  const { thumbnail, isLoading: thumbnailLoading } = useThumbnail(entityId!, GameEntityType.LIGHT_CONE);
  
  const lightCone = {
    ...lcDetail as LightCone,
    thumbnail
  };

  // for admin only
  const { response: deletedLightCone, invoke: deleteLightCone } = useDeleteGameEntity(entityId || '', GameEntityType.LIGHT_CONE);
  const onDeleteClicked = () => {
    if (window.confirm(`Are you sure you want to delete ${entityId}? This will require a page refresh to be reflected in the list.`)) {
      deleteLightCone();
      navigate('/lightcones');
    }
  };
  
  return (
    <div className="main-content lc-details">
      {lcLoading && 
        <Loader />
      }
      {lcDetail && <>
        <div className="summary">
          <div className="summary-details">
            <h1>{lightCone.name}</h1>
            <p>{lightCone.path}</p>
            <p>{lightCone.rarity}</p>
            <p>{lightCone.description}</p>
          </div>
          <div className={`entity-portrait rarity-${lightCone.rarity}`}>
            {thumbnailLoading &&
              <Loader />
            }
            {lightCone.thumbnail &&
              <img className="lc-portrait" src={lightCone.thumbnail} />
            }
          </div>
        </div>
        <p>
          Coming Soon: Additional details on stats and upgrades
        </p>
        {user?.role === UserRole.ADMIN && (
          <div className="admin-actions">
            <button className="danger" onClick={onDeleteClicked}>Delete Light Cone</button>
          </div>
        )}
      </>}
    </div>
  );
}

export default LightConeDetails;