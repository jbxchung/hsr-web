import { FC, useCallback, useEffect, useState } from 'react';
import { useGameEntities } from '../../hooks/useGameEntities';
import { GameEntityType } from '../../types/GameEntity';
import CardList from '../../components/Card/CardList';
import Loader from '../../components/Loader/Loader';

import { useDeleteItem, useItems, usePostItem } from '../../hooks/useItems';
import { useAuth } from '../../hooks/useAuth';
import { UserRole } from '../../types/User';
import { DefaultGameItem, GameItem } from '../../types/GameItem';
import DeleteIcon from '../../components/Icons/Delete';
import ItemRow from './ItemRow';

import './Items.scss';

const Items: FC = () => {
  const { user } = useAuth();

  const { response: itemsResponse, isLoading, error, invoke } = useItems();
  const { response: addedItem, isLoading: addItemLoading, error: addItemError, invoke: addItem } = usePostItem();
  const [itemList, setItemList] = useState<Array<GameItem>>([]);

  const [newItem, setNewItem] = useState<GameItem>(DefaultGameItem);

  const onItemDeleted = useCallback((deletedItem: GameItem) => {
    const index = itemList.findIndex(i => i === deletedItem);
    if (index !== -1) {
      const updatedItemList = [...itemList];
      updatedItemList.splice(index, 1);
      setItemList(updatedItemList);
    }
  }, [itemList]);

  // handle local component state with new entries
  useEffect(() => {
    if (itemsResponse?.length && !itemList.length) {
      // initial list
      setItemList(itemsResponse);
    } else {
      // with added items
      let updatedItemList = [...itemList];
        if (addedItem) {
          updatedItemList.unshift(addedItem);
        }
      setItemList(updatedItemList)
    }
  }, [itemsResponse, addedItem]);

  return (
    <div className="main-content items-page">
      <h4>Styling for this page has been deprioritized due to time constraints.</h4>

      {isLoading && (
        <div className="loading-overlay">
          <Loader />
        </div>
      )}
      {user?.role === UserRole.ADMIN && (
        <div className="add-new-item">
          <h2>Add New Item:</h2>
          <input onChange={(e) => setNewItem({
            id: e.target.value.toLowerCase().replace(/ /g, ''),
            name: e.target.value
          })} />
          <button className="primary add-item-button" onClick={() => {
            addItem(newItem);
          }} >
            Add New Item
          </button>
        </div>
      )}
      <div className="item-list">
        <h2>Item List:</h2>
        {itemList?.map(item => (
          <ItemRow item={item} onDelete={onItemDeleted} />
        ))}
      </div>
    </div>
  );
};

export default Items;
