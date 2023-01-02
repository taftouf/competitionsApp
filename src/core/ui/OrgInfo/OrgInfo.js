import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import cn from 'classnames'

// Styles
import styles from './index.module.scss'

// Functions
import { getSquadCompetitions } from '../../functions/getSquadCompetitions'
import { getSoloCompetitions } from '../../functions/getSoloCompetitions'
import { fetchData } from '../../utils/fetchData'

// Components
import { Loader } from '../Loader'
import { MainInfo } from '../MainInfo'
import { MenuInfo } from '../MenuInfo'
import { Members } from '../Members'
import { Competitions } from '../CompetitionsUI/Competitions'
import { useSelector } from 'react-redux'

export const OrgInfo = ({templateData}) => {
    const navigate = useNavigate()

    const {id} = useParams()
    const [org, setOrg] = useState({})
    const [orgMembers, setOrgMembers] = useState([])
    const [content, setContent] = useState('competitions')
    const [template, setTemplate] = useState(false)
    const userOrgs = useSelector(state => state.orgs.orgs)
    const [isAdmin, setIsAdmin] = useState(false)
    const [menu, setMenu] = useState([
        {
            id: 1,
            icon: 'competitions',
            text: 'Compétitions',
            type: 'tab',
            content: 'competitions',
        },
        {
            id: 2,
            icon: 'info',
            text: 'À propos',
            type: 'info',
            content: 'info',
            active: false,
        },
        {
            id: 3,
            icon: 'members',
            text: 'Membres',
            type: 'tab',
            content: 'members',
        },
    ])

    const [competitionsFull, setCompetitionsFull] = useState([])

    const getOrg = async () => {
        const res = await fetchData(`/api/v3/organizations/${id}`)

        if (res.ok) {
            const data = await res.json()
            setIsAdmin(data.organization.role?.value === 'admin')
            
            setOrg(data.organization)
        }

        if (res.status === 404) {
            navigate('/404')
        }
    }

    const getOrgMembers = async () => {
        const res = await fetchData(`/api/v3/organizations/${id}/members`)

        if (res.ok) {
            const data = await res.json()

            setOrgMembers([...data.members])
        }
    }

    const getCompetitions = async () => {
        const squadCompetitions = await getSquadCompetitions(7, 0, id)
        const soloCompetitions = await getSoloCompetitions(7, 0, id)

        setCompetitionsFull([...squadCompetitions, ...soloCompetitions])
    }

    useEffect(() => {
        (async () => {
            await Promise.all([
                id && getOrg(),
                id && getOrgMembers(),
                id && getCompetitions(),
            ])

            if (!id) setTemplate(true)
        })()
    }, [])

    useEffect(() => {
        if (templateData) setOrg(templateData)
    }, [templateData])

    useEffect(() => {
        if (userOrgs.find(org => org.id === +id)) setIsAdmin(true)
    }, [userOrgs])
    useEffect(()=>{
        if(org.status){
            if(org.status != "approved" && !isAdmin)
                navigate('/404')
        }
       
    },[org, isAdmin])

    useEffect(()=>{
        if(templateData && templateData?.description?.length > 0){
            const updateMenu = menu.map(m => {
                if(m.id === 2){
                    return {...m,active:true}
                }else{return m}
            })
            setMenu(updateMenu)
        }else if(templateData && templateData?.description?.length === 0){
            const updateMenu = menu.map(m => {
                if(m.id === 2){
                    return {...m,active:false}
                }else{return m}
            })
            setMenu(updateMenu)
        }
    }, [templateData])

    return Object.keys(org).length > 0 || template ? (
        <div className={styles.container} style={{backgroundImage: `linear-gradient(${org.color}, transparent 50%)`}}>
            <div className={styles.org}>
                <MainInfo isAdmin={isAdmin} data={org} template={template} getTeam={getOrg} org/>
                <div className={cn(styles.orgContent, {
                    [styles.orgContentTemplate]: template,
                })}>
                    <MenuInfo content={content} setContent={setContent} menuInfo={menu} data={org} template={template}/>
                    {content === 'competitions' &&
                        <Competitions competitionsFull={competitionsFull} template={template}/>}
                    {content === 'members' && <Members
                        membersRole={orgMembers}
                        template={template}
                        org
                        admin={isAdmin}
                        status = {org.status}
                        getTeam={getOrgMembers}
                        id={id}
                    />}
                </div>
            </div>
        </div>
    ) : (
        <div className={styles.orgLoaderWrapper}>
            <Loader/>
        </div>
    )
}
