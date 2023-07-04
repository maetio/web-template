# API Endpoints

API endpoints for our application. Primarily used for reading data.
* `competitions/all`: fetch all competitions, sorted by timestamp. **UNIMPLEMENTED**
* `competitions/all/[startTime]/[endTime]`: fetch all competitions, sorted by timestamp within a certain timeframe. **UNIMPLEMENTED**
* `competitions/[id]`: fetch the competition with the specific id. **UNIMPLEMENTED**
* `games/all`: fetch all the games, sorted by timestamp. **UNIMPLEMENTED**
* `games/all/[startTime]/[endTime]`: fetch all the games, sorted by timestamp within a certain date. **UNIMPLEMENTED**
* `games/[compID]`: fetch all the games for a certain competition. **UNIMPLEMENTED**
* `games/[compID]/[startTime]/[endTime]`: fetch all the games for a certain competition, for a certain date. **UNIMPLEMENTED**
* `players/all`: fetch all players, sorted by rating. **UNIMPLEMENTED**
* `players/[compID]`: fetch all players in a certain competition, sorted by rating. **UNIMPLEMENTED**
* `players/[compID]/[num]`: fetch the top few number of players in a competition. **UNIMPLEMENTED**
* `teams/all`: fetch all teams, sorted by rating. **UNIMPLEMENTED**
* `teams/[compID]`: fetch all teams in a certain competition, sorted by rating. **UNIMPLEMENTED**
* `teams/[compID]/[num]`: fetch the top few number of teams in a competition. **UNIMPLEMENTED**
* `team-players/[teamID]`: fetch all the players within a certain team, sorted by rating. **UNIMPLEMENTED**


## Resources
Video on API Routing [here](https://www.youtube.com/watch?v=J4pdHM-oG-s&t=0s).
[Link](https://nextjs.org/docs/app/building-your-application/routing/router-handlers) to NEXT documentation on API route handling.