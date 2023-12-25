import mongoose from 'mongoose';

const { Schema } = mongoose;

export interface StadiumData {
  stadiumName?: string;
  numberOfRows?: number;
  numberOfSeatsPerRow?: number;
}

export interface IStadium extends mongoose.Document {
  stadiumName: string;
  numberOfRows: number;
  numberOfSeatsPerRow: number;
}

const stadiumSchema = new Schema<IStadium>({
  stadiumName: {
    type: String,
    required: true,
    unique: true,
  },
  numberOfRows: {
    type: Number,
    required: true,
  },
  numberOfSeatsPerRow: {
    type: Number,
    required: true,
  },
});

const stadium = mongoose.model<IStadium>('Stadium', stadiumSchema);
export default stadium;
