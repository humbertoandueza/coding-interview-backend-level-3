import { Request, ResponseToolkit } from "@hapi/hapi";
import { IItem } from "../models/item.model";
import { ItemService } from "../services/item.service";

export class ItemController {
  private itemService: ItemService;

  constructor() {
    this.itemService = new ItemService();
  }

  async all(_: Request, h: ResponseToolkit) {
    try {
      const items = await this.itemService.getAllItems();
      return h.response(items).code(200);
    } catch (err) {
      return h.response({ error: 'Failed to fetch items' }).code(500);
    }
  }

  async post(request: Request, h: ResponseToolkit) {
    try {
      const newItem = await this.itemService.createItem(request.payload as IItem);
      return h.response(newItem).code(201);
    } catch (err) {
      return h.response({ error: 'Failed to create item' }).code(500);
    }
  }

  async get(request: Request, h: ResponseToolkit) {
    try {
      const item = await this.itemService.getItemById(request.params.id);
      if (!item) {
        return h.response({ error: 'Item not found' }).code(404);
      }
      return h.response(item).code(200);
    } catch (err) {
      return h.response({ error: 'Failed to fetch item' }).code(500);
    }
  }

  async put(request: Request, h: ResponseToolkit) {
    try {
      const updatedItem = await this.itemService.updateItem(request.params.id, request.payload as IItem);
      if (!updatedItem) {
        return h.response({ error: 'Item not found' }).code(404);
      }
      return h.response(updatedItem).code(200);
    } catch (err) {
      return h.response({ error: 'Failed to update item' }).code(500);
    }
  }

  async delete(request: Request, h: ResponseToolkit) {
    try {
      const deletedItem = await this.itemService.deleteItem(request.params.id);
      if (!deletedItem) {
        return h.response({ error: 'Item not found' }).code(404);
      }
      return h.response().code(204);
    } catch (err) {
      return h.response({ error: 'Failed to delete item' }).code(500);
    }
  }
}
