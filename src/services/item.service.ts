import { IItemResponse } from '../interfaces/Item.interface';
import { IItem, Item } from "../models/item.model";


export class ItemService {
  private mapItem(item: IItem): IItemResponse {
    return {
      id: parseInt(item.id.toString()),
      name: item.name,
      price: item.price,
    };
  }

  async getAllItems(): Promise<IItemResponse[]> {
    const items = await Item.find();
    return items.map(this.mapItem);
  }

  async getItemById(id: string): Promise<IItemResponse | null> {
    const item = await Item.findById(id);
    return item ? this.mapItem(item) : null;
  }

  private async getNextId(): Promise<number> {
    const lastItem = await Item.findOne().sort({ _id: -1 });
    return lastItem && typeof lastItem._id === 'number' ? lastItem._id + 1 : 1;
  }

  async createItem(itemData: Omit<IItem, '_id'>): Promise<IItemResponse> {
    const newId = await this.getNextId();
    const newItem = new Item({ _id: newId, ...itemData });
    const item = await newItem.save();
    return this.mapItem(item);
  }

  async updateItem(id: string, itemData: Partial<IItem>): Promise<IItemResponse | null> {
    const item = await Item.findByIdAndUpdate(id, itemData, { new: true });
    return item ? this.mapItem(item) : null;
  }

  async deleteItem(id: string): Promise<IItem | null> {
    const item = await Item.findByIdAndDelete(id);
    return item;
  }
}
