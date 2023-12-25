import { CodedError, ErrorCode, ErrorMessage } from '../shared/error';
import Stadium, { StadiumData } from './model';

export async function getStadium(stadiumName: string): Promise<StadiumData> {
  const stadium = await Stadium.find({ stadiumName: stadiumName }).exec();
  if (stadium.length === 0) {
    throw new CodedError(
      ErrorMessage.StadiumNotFound,
      ErrorCode.StadiumNotFound,
    );
  }
  const stadiumData: StadiumData = {
    stadiumName: stadium[0].stadiumName,
    numberOfRows: stadium[0].numberOfRows,
    numberOfSeatsPerRow: stadium[0].numberOfSeatsPerRow,
  };
  return stadiumData;
}

export async function addStadium(stadiumData: StadiumData): Promise<boolean> {
  const stadium = new Stadium(stadiumData);
  await stadium.save().catch((err) => {
    throw err;
  });
  return true;
}

export async function checkAvailableStadiumName(stadiumName: string) {
  return (await Stadium.find({ stadiumName: stadiumName }).exec()).length === 0;
}

export async function deleteStadium(stadiumName: string): Promise<void> {
  const stadium = await Stadium.find({ stadiumName: stadiumName }).exec();
  if (stadium.length === 0) {
    throw new CodedError(
      ErrorMessage.StadiumNotFound,
      ErrorCode.StadiumNotFound,
    );
  }
  await Stadium.deleteOne({ stadiumName: stadiumName }).catch((err) => {
    throw err;
  });
}

export async function updateStadium(
  stadiumName: string,
  numberOfRows?: number,
  numberOfSeatsPerRow?: number,
): Promise<void> {
  const newData: StadiumData = {};
  if (numberOfRows !== undefined) {
    newData.numberOfRows = numberOfRows;
  }
  if (numberOfSeatsPerRow !== undefined) {
    newData.numberOfSeatsPerRow = numberOfSeatsPerRow;
  }
  await Stadium.updateOne({ stadiumName: stadiumName }, newData).catch(
    (err) => {
      throw err;
    },
  );
}

export async function getAllStadiums(): Promise<StadiumData[]> {
  const stadiums = await Stadium.find().catch((err) => {
    throw err;
  });
  const userDataList: StadiumData[] = [];
  stadiums.forEach((stadium) => {
    userDataList.push({
      stadiumName: stadium.stadiumName,
      numberOfRows: stadium.numberOfRows,
      numberOfSeatsPerRow: stadium.numberOfSeatsPerRow,
    });
  });
  return userDataList;
}
