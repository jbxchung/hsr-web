import { FC, useCallback, useEffect, useState } from 'react';
import { useGameEntities } from '../../hooks/useGameEntities';
import { GameEntityType } from '../../types/GameEntity';
import CardList from '../../components/Card/CardList';
import Loader from '../../components/Loader/Loader';

import { useDeleteItem, useItems, usePostItem } from '../../hooks/useItems';
import { useAuth } from '../../hooks/useAuth';
import { UserRole } from '../../types/User';
import { DefaultGameItem, GameItem, InventoryItem } from '../../types/GameItem';
import DeleteIcon from '../../components/Icons/Delete';
import ItemRow from './InventoryRow';

import './Inventory.scss';
import { useAddUserItem, useInventory } from '../../hooks/useInventory';
import InventoryRow from './InventoryRow';

const Inventory: FC = () => {
  const { user } = useAuth();

  const { response: itemsResponse } = useItems();

  const { response: inventoryResponse, isLoading } = useInventory();
  const { response: addedInventoryItem, invoke: addInventoryItem } = useAddUserItem();
  const [inventoryList, setInventoryList] = useState<Array<InventoryItem>>([]);

  const [newInventoryItem, setNewInventoryItem] = useState<InventoryItem>();

  // set options for new pull entry
  useEffect(() => {
    if (itemsResponse) {
      setNewInventoryItem({
        itemId: itemsResponse[0].id,
        itemName: itemsResponse[0].name,
        quantity: 1
      });
    }
  }, [itemsResponse, setNewInventoryItem]);

  // handle local component state with new entries
  useEffect(() => {
    if (inventoryResponse?.length && !inventoryList.length) {
      // initial list
      setInventoryList(inventoryResponse);
    } else {
      // with added items
      const updatedInventory = [...inventoryList];
        if (addedInventoryItem) {
          const existingItem = updatedInventory.find(i => i.itemId === addedInventoryItem.itemId);
          if (existingItem) {
            existingItem.quantity = addedInventoryItem.quantity;
          } else {
            updatedInventory.unshift(addedInventoryItem);
          }
        }
        setInventoryList(updatedInventory)
    }
  }, [inventoryResponse, addedInventoryItem]);

  const onInventoryItemDeleted = useCallback((deletedItem: InventoryItem) => {
    const index = inventoryList.findIndex(i => i === deletedItem);
    if (index !== -1) {
      const updatedInventoryList = [...inventoryList];
      updatedInventoryList.splice(index, 1);
      setInventoryList(updatedInventoryList);
    }
  }, [inventoryList]);

  return (
    <div className="main-content items-page">
      <h4>Styling for this page has been deprioritized due to time constraints.</h4>

      {isLoading && (
        <div className="loading-overlay">
          <Loader />
        </div>
      )}
      <div className="add-new-inventory-item">
        <h2>Add New Item to Inventory:</h2>
        {itemsResponse &&
          <select onChange={(e) => {
            setNewInventoryItem({
              ...newInventoryItem!,
              itemId: itemsResponse[Number.parseInt(e.target.value)].id,
              itemName: itemsResponse[Number.parseInt(e.target.value)].name,
            })
          }}>
            {itemsResponse.map((item, index) => (
              <option key={item.id} value={index}>{item.name}</option>
            ))}
          </select>
        }
        <input
          type='number'
          placeholder='Quantity'
          onChange={(e) => setNewInventoryItem({
          ...newInventoryItem!,
          quantity: Number.parseInt(e.target.value)
        })} />
        <button className="primary add-item-button" onClick={() => {
          addInventoryItem(newInventoryItem);
        }} >
          Add New Item
        </button>
      </div>
      <div className="inventory">
        <h2>Inventory:</h2>
        {inventoryList?.map(inventoryItem => (
          <InventoryRow key={inventoryItem.itemId} inventoryItem={inventoryItem} onDelete={onInventoryItemDeleted} />
        ))}
      </div>
    </div>
  );
};

export default Inventory;
