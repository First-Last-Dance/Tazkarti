import * as Stadium from './service';
import stadium, { StadiumData } from './model';
import { CodedError, ErrorCode, ErrorMessage } from '../shared/error';

export async function Add(
  stadiumName: string,
  numberOfRows: number,
  numberOfSeatsPerRow: number,
): Promise<void> {
  const vaildStadium = await Stadium.checkAvailableStadiumName(stadiumName);
  if (!vaildStadium) {
    throw new CodedError(
      ErrorMessage.StadiumAlreadyExist,
      ErrorCode.StadiumAlreadyExist,
    );
  }
  if (numberOfRows <= 0) {
    throw new CodedError(
      ErrorMessage.InvalidNumberOfRows,
      ErrorCode.InvalidParameter,
    );
  }
  if (numberOfSeatsPerRow <= 0) {
    throw new CodedError(
      ErrorMessage.InvalidNumberOfSeatsPerRow,
      ErrorCode.InvalidParameter,
    );
  }
  const stadiumData: StadiumData = {};
  stadiumData.stadiumName = stadiumName;
  stadiumData.numberOfRows = numberOfRows;
  stadiumData.numberOfSeatsPerRow = numberOfSeatsPerRow;
  await Stadium.addStadium(stadiumData).catch((err) => {
    throw err;
  });
}

export async function getStadium(stadiumName: string): Promise<StadiumData> {
  const stadium = await Stadium.getStadium(stadiumName).catch((err) => {
    throw err;
  });
  return stadium;
}

export async function deleteStadium(stadiumName: string): Promise<void> {
  await Stadium.deleteStadium(stadiumName).catch((err) => {
    throw err;
  });
}
export async function updateStadium(
  stadiumName: string,
  numberOfRows: number,
  numberOfSeatsPerRow: number,
): Promise<void> {
  if (numberOfRows <= 0) {
    throw new CodedError(
      ErrorMessage.InvalidNumberOfRows,
      ErrorCode.InvalidParameter,
    );
  }
  if (numberOfSeatsPerRow <= 0) {
    throw new CodedError(
      ErrorMessage.InvalidNumberOfSeatsPerRow,
      ErrorCode.InvalidParameter,
    );
  }
  await Stadium.updateStadium(
    stadiumName,
    numberOfRows,
    numberOfSeatsPerRow,
  ).catch((err) => {
    throw err;
  });
}

export async function getAllStadiums(): Promise<StadiumData[]> {
  return Stadium.getAllStadiums();
}

export async function isAvailable(stadiumName: string): Promise<Boolean> {
  return await Stadium.checkAvailableStadiumName(stadiumName);
}
