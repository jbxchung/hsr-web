import { FC, useEffect } from 'react';

import './Items.scss';
import { useDeleteItem } from '../../hooks/useItems';
import { useAuth } from '../../hooks/useAuth';
import { UserRole } from '../../types/User';
import { GameItem } from '../../types/GameItem';
import DeleteIcon from '../../components/Icons/Delete';

interface ItemRowProps {
  item: GameItem;
  onDelete: (item: GameItem) => void;
}

const ItemRow: FC<ItemRowProps> = ({ item, onDelete }) => {
  const { user } = useAuth();

  const { response: deletedItem, isLoading: deleteItemLoading, error: deleteItemError, invoke: deleteItem } = useDeleteItem(item.id);

  useEffect(() => {
    if (deleteItemError) {
      alert(deleteItemError);
    } else if (deletedItem) {
      onDelete(item);
    }
  }, [deletedItem, deleteItemError]);

  return (
    <div className="item-row">
      <div className="item-name">
        {item.name}
      </div>
      {user?.role === UserRole.ADMIN && (
        <span
          className={`action-icon delete`}
          title={'Delete'}
          onClick={() => deleteItem()}
        >
          <DeleteIcon />
        </span>
      )}
    </div>
  );
};

export default ItemRow;
