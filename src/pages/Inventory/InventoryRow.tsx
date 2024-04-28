import { FC } from 'react';

import { useDeleteItem } from '../../hooks/useItems';
import { useAuth } from '../../hooks/useAuth';
import { UserRole } from '../../types/User';
import { GameItem, InventoryItem } from '../../types/GameItem';
import DeleteIcon from '../../components/Icons/Delete';
import { useRemoveUserItem } from '../../hooks/useInventory';

interface InventoryRowProps {
  inventoryItem: InventoryItem;
  onDelete: (item: InventoryItem) => void;
}

const InventoryRow: FC<InventoryRowProps> = ({ inventoryItem, onDelete }) => {
  const { user } = useAuth();

  const { response: deletedItem, isLoading: deleteItemLoading, error: deleteItemError, invoke: deleteItem } = useRemoveUserItem();

  return (
    <div className="item-row">
      <div className="item-name">
        {inventoryItem.itemName}
      </div>
      <div className="item-quantity">
        {inventoryItem.quantity}
      </div>
      <span
        className={`action-icon delete`}
        title={'Delete'}
        onClick={() => {
          deleteItem({
            itemId: inventoryItem.itemId,
            quantity: inventoryItem.quantity,
          });
          onDelete(inventoryItem);
        }}
      >
        <DeleteIcon />
      </span>
    </div>
  );
};

export default InventoryRow;
