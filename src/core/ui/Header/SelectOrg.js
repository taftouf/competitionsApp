import React, {useState} from 'react'
import { ToggleContentOrgs } from '../ToggleContentOrgs'

export const SelectOrg = ({values, setFilterValue}) => {
    const [activeValue, setActiveValue] = useState()

    return (
        <>
            <ToggleContentOrgs 
                setActiveValue={setActiveValue}  
                setFilterValue={setFilterValue} 
                values={values} 
                title={activeValue?activeValue:"--"}>
            </ToggleContentOrgs>
        </>
    )
}