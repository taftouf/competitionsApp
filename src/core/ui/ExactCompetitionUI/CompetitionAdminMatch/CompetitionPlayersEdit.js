import React, { useEffect, useState } from 'react'

// Styles
import styles from './index.module.scss'

// Components
import { CompetitionPlayersItem } from './CompetitionPlayersItem'

export const CompetitionPlayersEdit = ({data, stats, setEditedPlayers}) => {
    const [players, setPlayers] = useState([])

    const editPlayer = editedPlayer => {
        const tempPlayers = [...players]

        if (tempPlayers.find(player => player.player_id === editedPlayer.player_id)) {
            tempPlayers.forEach((player, idx) => {
                if (player.player_id === editedPlayer.player_id) {
                    tempPlayers[idx] = {...tempPlayers[idx], ...editedPlayer}
                }
            })
        } else {
            if (Object.keys(editedPlayer).length > 0) tempPlayers.push({...editedPlayer})
        }

        setPlayers([...tempPlayers])
    }

    useEffect(() => {
        setEditedPlayers([...players])
    }, [players])

    return (
        <ul className={styles.matchPlayersList}>
            {
                data.map((player, idx) => (
                    <CompetitionPlayersItem
                        player={player}
                        stats={stats}
                        key={player.id}
                        editPlayer={editPlayer}
                        idx={idx}
                    />
                ))
            }
        </ul>
    )
}
