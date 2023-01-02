import { v4 as uuid } from 'uuid'
// Slices
import { addNotification } from  '../../store/slices/notificationsSlice'
import { removeNotifTimeout } from './removeNotifTimeout'

const popupError=(dispatch, text)=>{

    const errorID = uuid()

    dispatch(addNotification({id: errorID, type: 'error', text: text}))
    dispatch(removeNotifTimeout(errorID, 3000))
};

export const validateStats = (data, activeTeamID, editedPlayers, stats, dispatch) => {
    const score_1 = data.score_1 !=null ? data.score_1 : ( data.home_score_1 != null ? data.home_score_1 : data.visitors_score_1 )
    const score_2 = data.score_2 !=null ? data.score_2 : ( data.home_score_2!=null ? data.home_score_2 : data.visitors_score_2 )
    
    const scoreHome = data.home.id === activeTeamID? score_1 : score_2
    const scoreVisitore =  data.home.id === activeTeamID? score_2 : score_1
    var goals = 0
    var assists = {isAssists:false, nbr:0}
    var cleanSheet = {isClean:scoreVisitore === 0?true:false, nbr:0}
    var hommeDeMatch = {isMOfM:stats.find( player => player.man_of_the_match === true ), nbr:0}
    var validate = true
    editedPlayers.forEach(player=>{
            goals += player.goals
            assists.nbr  += player.assists
            cleanSheet.nbr += player.clean_sheet?1:0 
            hommeDeMatch.nbr += player.man_of_the_match?1:0
            assists.isAssists = !assists.isAssists && (player.assists + player.goals > scoreHome?true:false)
    })
  
    if(goals>scoreHome){
        validate = false
        popupError(dispatch, "Error Goals")
    }
    if(assists.nbr > scoreHome || assists.isAssists){
        validate = false
        popupError(dispatch, "Error assists")
    }
    if(hommeDeMatch.nbr != 1 && hommeDeMatch.nbr != 0 ){
        validate = false
        popupError(dispatch, "Error Homme de matche")
    }
    
    return validate
}
