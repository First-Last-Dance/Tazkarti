import * as Match from './service';
import match, { MatchData } from './model';
import { CodedError, ErrorCode, ErrorMessage } from '../shared/error';

function isDateString(input: string): boolean {
  // Regular expression for a simple date format (YYYY-MM-DD)
  const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;

  // Check if the input string matches the date format
  if (!dateFormatRegex.test(input)) {
    return false;
  }

  // Parse the input string as a Date object and check if it's a valid date
  const parsedDate = new Date(input);
  return !Number.isNaN(parsedDate.getTime());
}

export async function Add(
  homeTeam: string,
  awayTeam: string,
  matchVenue: string,
  date: string,
  time: string,
  mainReferee: string,
  firstLinesman: string,
  secondLinesman: string,
): Promise<void> {
  //   const vaildMatch = await Match.checkValidMatchData(matchID);
  //   if (!vaildMatch) {
  //     throw new CodedError(
  //       ErrorMessage.MatchAlreadyExist,
  //       ErrorCode.MatchAlreadyExist,
  //     );
  //   }
  if (homeTeam == awayTeam) {
    throw new CodedError(
      ErrorMessage.InvalidTeamCompensations,
      ErrorCode.InvalidParameter,
    );
  }
  if (!isDateString(date)) {
    throw new CodedError(
      ErrorMessage.InvalidBirthDate,
      ErrorCode.InvalidParameter,
    );
  } else {
    const parsedDate: Date = new Date(date);
    await Match.checkValidMatch(
      homeTeam,
      awayTeam,
      matchVenue,
      parsedDate,
      time,
      mainReferee,
      firstLinesman,
      secondLinesman,
    )
      .then(async (isValid) => {
        if (isValid) {
          const matchData: MatchData = {};
          matchData.homeTeam = homeTeam;
          matchData.awayTeam = awayTeam;
          matchData.matchVenue = matchVenue;
          matchData.date = parsedDate;
          matchData.time = time;
          matchData.mainReferee = mainReferee;
          matchData.firstLinesman = firstLinesman;
          matchData.secondLinesman = secondLinesman;
          await Match.addMatch(matchData).catch((err) => {
            throw err;
          });
        }
      })
      .catch((err) => {
        throw err;
      });
  }
}

export async function getMatch(matchID: string): Promise<MatchData> {
  const match = await Match.getMatch(matchID).catch((err) => {
    throw err;
  });
  return match;
}

export async function deleteMatch(matchID: string): Promise<void> {
  await Match.deleteMatch(matchID).catch((err) => {
    throw err;
  });
}
export async function updateMatch(
  matchID: string,
  homeTeam: string,
  awayTeam: string,
  matchVenue: string,
  date: string,
  time: string,
  mainReferee: string,
  firstLinesman: string,
  secondLinesman: string,
): Promise<void> {
  const match = await Match.getMatch(matchID);
  let parsedDate: Date = new Date();
  if (date !== undefined) {
    if (!isDateString(date)) {
      throw new CodedError(
        ErrorMessage.InvalidDate,
        ErrorCode.InvalidParameter,
      );
    }
    parsedDate = new Date(date);
  } else {
    parsedDate = date;
  }
  if (homeTeam === awayTeam) {
    throw new CodedError(
      ErrorMessage.InvalidTeamCompensations,
      ErrorCode.InvalidParameter,
    );
  }
  if (homeTeam === match.awayTeam || awayTeam === match.homeTeam) {
    throw new CodedError(
      ErrorMessage.InvalidTeamCompensations,
      ErrorCode.InvalidParameter,
    );
  }
  await Match.checkValidMatch(
    homeTeam,
    awayTeam,
    matchVenue,
    parsedDate,
    time,
    mainReferee,
    firstLinesman,
    secondLinesman,
  )
    .then(async (isValid) => {
      if (isValid) {
        await Match.updateMatch(
          matchID,
          homeTeam,
          awayTeam,
          matchVenue,
          parsedDate,
          time,
          mainReferee,
          firstLinesman,
          secondLinesman,
        ).catch((err) => {
          throw err;
        });
      }
    })
    .catch((err) => {
      throw err;
    });
}

export async function getAllMatchs(): Promise<MatchData[]> {
  return Match.getAllMatchs();
}

export async function getSeats(
  matchID: string,
  userName: string,
): Promise<Array<Array<number>>> {
  return Match.getSeats(matchID, userName);
}

export async function reserve(
  matchID: string,
  userName: string,
  reserveSeats: Array<Array<number>>,
) {
  Match.reserve(matchID, userName, reserveSeats);
}
