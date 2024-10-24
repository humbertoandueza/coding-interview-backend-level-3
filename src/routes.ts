import { Server } from "@hapi/hapi";
import { ItemController } from "./controllers/items.controller";
import { createRoute } from "./utils/createRoute.utils";
import { createItemSchema, updateItemSchema } from "./validations/item.validation";


export const defineRoutes = (server: Server) => {

    const itemController = new ItemController();

    createRoute(server, 'GET', '/ping', async (request, h) => ({
        ok: true
    }));

    createRoute(server, 'GET', '/items', (request, h) => itemController.all(request, h));

    createRoute(server, 'POST', '/items', (request, h) => itemController.post(request, h), createItemSchema);
    
    createRoute(server, 'GET', '/items/{id}', (request, h) => itemController.get(request, h));
    
    createRoute(server, 'PUT', '/items/{id}', (request, h) => itemController.put(request, h), updateItemSchema);

    createRoute(server, 'DELETE', '/items/{id}', (request, h) => itemController.delete(request, h));


};
