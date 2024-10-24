import { Server } from '@hapi/hapi'
import { initializeServer } from '../src/server'
import { ItemService } from '../src/services/item.service'

describe('E2E Tests Item', () => {
    let server: Server

    beforeEach(async () => {
        server = await initializeServer()
    })

    describe('Error handling', () => {
        it('should return 404 when trying to get a non-existing item', async () => {
            const response = await server.inject({
                method: 'GET',
                url: '/items/9999'
            });

            expect(response.statusCode).toBe(404);
            expect(response.result).toEqual({
                error: 'Item not found'
            });
        });

        it('should return 404 when trying to update a non-existing item', async () => {
            const response = await server.inject({
                method: 'PUT',
                url: '/items/9999', 
                payload: {
                    name: 'Updated Item',
                    price: 20
                }
            });

            expect(response.statusCode).toBe(404);
            expect(response.result).toEqual({
                error: 'Item not found'
            });
        });

        it('should return 404 when trying to delete a non-existing item', async () => {
            const response = await server.inject({
                method: 'DELETE',
                url: '/items/9999'
            });

            expect(response.statusCode).toBe(404);
            expect(response.result).toEqual({
                error: 'Item not found'
            });
        });

        it('should return 500 if there is an internal error while fetching items', async () => {
            jest.spyOn(ItemService.prototype, 'getAllItems').mockImplementationOnce(() => {
                throw new Error('Internal error');
            });

            const response = await server.inject({
                method: 'GET',
                url: '/items'
            });

            expect(response.statusCode).toBe(500);
            expect(response.result).toEqual({
                error: 'Failed to fetch items'
            });
        });
    });

    describe('Additional Success Tests', () => {
        it('should return empty array when no items exist', async () => {
            const response = await server.inject({
                method: 'GET',
                url: '/items'
            });

            expect(response.statusCode).toBe(200);
            expect(response.result).toEqual([]); 
        });

        it('should handle multiple items creation and fetching', async () => {
            await server.inject({
                method: 'POST',
                url: '/items',
                payload: {
                    name: 'Item 1',
                    price: 10
                }
            });

            await server.inject({
                method: 'POST',
                url: '/items',
                payload: {
                    name: 'Item 2',
                    price: 15
                }
            });

            const response = await server.inject({
                method: 'GET',
                url: '/items'
            });

            expect(response.statusCode).toBe(200);
            expect(response.result).toEqual([
                {
                    id: expect.any(Number),
                    name: 'Item 1',
                    price: 10
                },
                {
                    id: expect.any(Number),
                    name: 'Item 2',
                    price: 15
                }
            ]);
        });
    });

  
    afterAll(() => {
        return server.stop()
    })
})