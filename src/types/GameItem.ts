export interface GameItem {
  id: string;
  name: string;
}

export const DefaultGameItem = {
  id: '',
  name: ''
};

export interface InventoryItem {
  itemId: string;
  itemName: string;
  quantity: number;
}