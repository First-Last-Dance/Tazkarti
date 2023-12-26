import mongoose from 'mongoose';

const { Schema } = mongoose;

export interface MatchData {
  homeTeam?: string;
  awayTeam?: string;
  matchVenue?: string;
  date?: Date;
  time?: string;
  mainReferee?: string;
  firstLinesman?: string;
  secondLinesman?: string;
  matchID?: string;
  seats?: Array<Array<string>>;
}

export interface IMatch extends mongoose.Document {
  homeTeam: string;
  awayTeam: string;
  matchVenue: string;
  date: Date;
  time: string;
  mainReferee: string;
  firstLinesman: string;
  secondLinesman: string;
  seats: Array<Array<string>>;
}

const matchSchema = new Schema<IMatch>({
  homeTeam: {
    type: String,
    required: true,
  },
  awayTeam: {
    type: String,
    required: true,
  },
  matchVenue: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  mainReferee: {
    type: String,
    required: true,
  },
  firstLinesman: {
    type: String,
    required: true,
  },
  secondLinesman: {
    type: String,
    required: true,
  },
  seats: {
    type: [],
    required: true,
  },
});

const match = mongoose.model<IMatch>('Match', matchSchema);
export default match;
