import mongoose, { Document } from 'mongoose';

export interface IItem extends Document {
    id: number;
    name: string;
    price: number;
}

const ItemSchema = new mongoose.Schema<IItem>({
    _id: { type: Number, required: true }, 
    name: { type: String, required: true },
    price: { type: Number, required: true },
});


export const Item = mongoose.model<IItem>('Item', ItemSchema);
