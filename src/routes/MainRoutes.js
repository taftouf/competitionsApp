import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

// Pages
import { Dashboard } from '../core/modules/Dashboard'
import { Discover } from '../core/modules/Discover'
import { OrgsAll } from '../core/modules/OrgsAll'
import { OrgsFollowed } from '../core/modules/OrgsFollowed'
import { DiscoverTeam } from '../core/modules/DiscoverTeam'
import { DiscoverOrg } from '../core/modules/DiscoverOrg'
import { DiscoverMenu } from '../core/modules/DiscoverMenu'
import { Team } from '../core/modules/Team'
import { Org } from '../core/modules/Org'
import { League } from '../core/modules/League'
import { LeagueGame } from '../core/modules/LeagueGame'
import { NotFound } from '../core/status/NotFound'
import { Tourney } from '../core/modules/Tourney'
import { TourneyGame } from '../core/modules/TourneyGame'
import { CreateTourney } from '../core/modules/CreateTourney'
import { CreateLeague } from '../core/modules/CreateLeague'
import { CreateOrg } from '../core/modules/CreateOrg'
import { CreateTeam } from '../core/modules/CreateTeam'
import { Player } from '../core/modules/Player'
import { Cgu } from '../core/modules/Cgu'
import {PolitiqueDeConfidentialite} from '../core/modules/PolitiqueDeConfidentialite'

export const MainRoutes = () => {
    return (
        <Routes>
            <Route path='/dashboard' element={<Dashboard/>} exact/>
            <Route path='/discover' element={<Discover/>} exact/>
            <Route path='/discover-menu' element={<DiscoverMenu/>} exact/>
            <Route path='/teams/:id/competitions' element={<DiscoverTeam/>} exact/>
            <Route path='/organizations/:id/competitions' element={<DiscoverOrg/>} exact/>
            <Route path='/organizations' element={<OrgsAll/>} exact/>
            <Route path='/organizations/followed' element={<OrgsFollowed/>} exact/>
            <Route path='/teams/:id' element={<Team/>} exact/>
            <Route path='/team/:teamID/player/:playerID' element={<Player/>} exact/>
            <Route path='/organizations/:id' element={<Org/>} exact/>
            <Route path='/competitions/:type/league/:id' element={<League/>} exact/>
            <Route path='/competitions/:type/league/:leagueID/game/:gameID' element={<LeagueGame/>} exact/>
            <Route path='/competitions/:type/league/:leagueID/game/:gameID/:round' element={<LeagueGame/>} exact/>
            <Route path='/competitions/:type/tournament/:id' element={<Tourney/>} exact/>
            <Route path='/competitions/:type/tournament/:tourneyID/game/:gameID' element={<TourneyGame/>} exact/>
            <Route path='/competitions/:type/tournament/:tourneyID/game/:gameID/:round' element={<TourneyGame/>} exact/>
            <Route path='/new-tournament/:orgID' element={<CreateTourney/>} exact/>
            <Route path='/new-league/:orgID' element={<CreateLeague/>} exact/>
            <Route path='/new-org' element={<CreateOrg/>} exact/>
            <Route path='/new-team' element={<CreateTeam/>} exact/>
            <Route path='/cgu' element={<Cgu />}/>
            <Route path='/politique-de-confidentialite' element={<PolitiqueDeConfidentialite/>}/>

            <Route path='/404' element={<NotFound/>} exact/>
            <Route path='*' element={<Navigate to='/dashboard' replace/>}/>
        </Routes>
    )
}
