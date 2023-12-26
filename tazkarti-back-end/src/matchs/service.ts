import { CodedError, ErrorCode, ErrorMessage } from '../shared/error';
import stadium from '../stadiums/model';
import Stadium from '../stadiums/model';
import Match, { MatchData } from './model';

export async function getMatch(matchID: string): Promise<MatchData> {
  const match = await Match.findById(matchID).exec();
  console.log(match);
  if (match === null) {
    throw new CodedError(ErrorMessage.MatchNotFound, ErrorCode.MatchNotFound);
  }
  const matchData: MatchData = {
    matchID: match._id,
    homeTeam: match.homeTeam,
    awayTeam: match.awayTeam,
    date: match.date,
    firstLinesman: match.firstLinesman,
    mainReferee: match.mainReferee,
    matchVenue: match.matchVenue,
    secondLinesman: match.secondLinesman,
    time: match.time,
  };
  return matchData;
}

export async function addMatch(matchData: MatchData): Promise<boolean> {
  const match = new Match(matchData);
  const stadium = await Stadium.find({ stadiumName: matchData.matchVenue });
  const seats = Array<Array<string>>(stadium[0].numberOfRows).fill(
    Array<string>(stadium[0].numberOfSeatsPerRow).fill(''),
  );
  match.seats = seats;
  await match.save().catch((err) => {
    throw err;
  });
  return true;
}

// WORK is Needed HERE
export async function checkValidMatch(
  homeTeam?: string,
  awayTeam?: string,
  matchVenue?: string,
  date?: Date,
  time?: string,
  mainReferee?: string,
  firstLinesman?: string,
  secondLinesman?: string,
  matchID?: string,
) {
  //   let homeTeamTemp = homeTeam;
  //   let awayTeamTemp = awayTeam;
  //   let matchVenueTemp = matchVenue;
  let dateTemp = date;
  //   let timeTemp = time;
  //   let mainRefereeTemp = mainReferee;
  //   let firstLinesmanTemp = firstLinesman;
  //   let secondLinesmanTemp = secondLinesman;
  if (matchID !== undefined) {
    const match = await Match.findById(matchID);
    // if (homeTeam === undefined) {
    //   homeTeamTemp = match[0].homeTeam;
    // }
    // if (awayTeam === undefined) {
    //   awayTeamTemp = match[0].awayTeam;
    // }
    // if (matchVenue === undefined) {
    //   matchVenueTemp = match[0].matchVenue;
    // }
    if (date === undefined && match !== null) {
      dateTemp = match.date;
    }
    // if (time === undefined) {
    //   timeTemp = match[0].time;
    // }
    // if (mainReferee === undefined) {
    //   mainRefereeTemp = match[0].mainReferee;
    // }
    // if (firstLinesman === undefined) {
    //   firstLinesmanTemp = match[0].firstLinesman;
    // }
    // if (secondLinesman === undefined) {
    //   secondLinesmanTemp = match[0].secondLinesman;
    // }
  }
  if (homeTeam !== undefined) {
    const matches = await Match.find({ homeTeam: homeTeam });
    matches.forEach((match) => {
      if (match.date === dateTemp) {
        throw new CodedError(ErrorMessage.HomeTeamBusy, ErrorCode.Conflict);
      }
    });
  }
  if (awayTeam !== undefined) {
    const matches = await Match.find({ awayTeam: awayTeam });
    matches.forEach((match) => {
      if (match.date === dateTemp) {
        throw new CodedError(ErrorMessage.AwayTeamBusy, ErrorCode.Conflict);
      }
    });
  }
  if (matchVenue !== undefined) {
    const matches = await Match.find({ matchVenue: matchVenue });
    matches.forEach((match) => {
      if (match.date === dateTemp) {
        throw new CodedError(ErrorMessage.matchVenueBusy, ErrorCode.Conflict);
      }
    });
  }
  if (mainReferee !== undefined) {
    const matches = await Match.find({ mainReferee: mainReferee });
    matches.forEach((match) => {
      if (match.date === dateTemp) {
        throw new CodedError(ErrorMessage.mainRefereeBusy, ErrorCode.Conflict);
      }
    });
  }
  if (firstLinesman !== undefined) {
    const matches = await Match.find({ firstLinesman: firstLinesman });
    matches.forEach((match) => {
      if (match.date === dateTemp) {
        throw new CodedError(
          ErrorMessage.firstLinesmanBusy,
          ErrorCode.Conflict,
        );
      }
    });
  }
  if (secondLinesman !== undefined) {
    const matches = await Match.find({ secondLinesman: secondLinesman });
    matches.forEach((match) => {
      if (match.date === dateTemp) {
        throw new CodedError(
          ErrorMessage.secondLinesmanBusy,
          ErrorCode.Conflict,
        );
      }
    });
  }
  return true;
}

export async function deleteMatch(matchID: string): Promise<void> {
  const match = await Match.findById(matchID).exec();
  if (match === null) {
    throw new CodedError(ErrorMessage.MatchNotFound, ErrorCode.MatchNotFound);
  }
  await Match.deleteOne({ _id: matchID }).catch((err) => {
    throw err;
  });
}

export async function updateMatch(
  matchID: string,
  homeTeam?: string,
  awayTeam?: string,
  matchVenue?: string,
  date?: Date,
  time?: string,
  mainReferee?: string,
  firstLinesman?: string,
  secondLinesman?: string,
): Promise<void> {
  const newData: MatchData = {};
  if (homeTeam !== undefined) {
    newData.homeTeam = homeTeam;
  }
  if (awayTeam !== undefined) {
    newData.awayTeam = awayTeam;
  }
  if (matchVenue !== undefined) {
    newData.matchVenue = matchVenue;
  }
  if (date !== undefined) {
    newData.date = date;
  }
  if (time !== undefined) {
    newData.time = time;
  }
  if (mainReferee !== undefined) {
    newData.mainReferee = mainReferee;
  }
  if (firstLinesman !== undefined) {
    newData.firstLinesman = firstLinesman;
  }
  if (secondLinesman !== undefined) {
    newData.secondLinesman = secondLinesman;
  }
  await Match.findByIdAndUpdate(matchID, newData).catch((err) => {
    throw err;
  });
}

export async function getAllMatchs(): Promise<MatchData[]> {
  const matchs = await Match.find().catch((err) => {
    throw err;
  });
  const userDataList: MatchData[] = [];
  matchs.forEach((match) => {
    userDataList.push({
      matchID: match._id,
      homeTeam: match.homeTeam,
      awayTeam: match.awayTeam,
      matchVenue: match.matchVenue,
      date: match.date,
      time: match.time,
      mainReferee: match.mainReferee,
      firstLinesman: match.firstLinesman,
      secondLinesman: match.secondLinesman,
    });
  });
  return userDataList;
}

export async function getSeats(
  matchID: string,
  userName: string,
): Promise<Array<Array<number>>> {
  const match = await Match.findById(matchID);
  if (match !== null) {
    const seats = [];
    for (let i = 0; i < match.seats.length; i++) {
      seats.push([...Array(match.seats[i].length).fill(-1)]);

      for (let j = 0; j < match.seats[i].length; j++) {
        if (match.seats[i][j] === userName) {
          seats[i][j] = 0;
        } else if (match.seats[i][j] !== '') {
          seats[i][j] = 1;
        }
      }
    }
    return seats;
  }
  return [];
}

// export async function reserve(
//   matchID: string,
//   userName: string,
//   reserveSeats: Array<Array<number>>,
// ): Promise<Array<Array<number>>> {
//   const match = await Match.findById(matchID);
//   if (match !== null) {
//     const seats = match.seats;
//     for (let i = 0; i < match.seats.length; i++) {
//       seats.push([...Array(match.seats[i].length).fill(-1)]);

//       for (let j = 0; j < match.seats[i].length; j++) {
//         if (reserveSeats[i][j] === -1) {
//           seats[i][j] = '';
//         } else if (match.seats[i][j] !== '') {
//           seats[i][j] = 1;
//         }
//       }
//     }
//     return seats;
//   }
//   return [];
// }
