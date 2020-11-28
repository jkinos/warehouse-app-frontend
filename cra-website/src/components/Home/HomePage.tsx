import React from 'react'
import {LoadingStatusAlert,AlertContainer} from './LoadingStatusNotification'
import {FetchResult} from '../../types'

interface HomeProps {
    jackets: FetchResult,
    shirts: FetchResult,
    accessories: FetchResult
}

const HomePage:React.FC<HomeProps> = ({jackets, shirts, accessories}) => {
    return(
        <AlertContainer>
        <LoadingStatusAlert content={jackets} category={'jackets'}/>
        <LoadingStatusAlert content={shirts} category={'shirts'}/>
        <LoadingStatusAlert content={accessories} category={'accessories'}/>
        </AlertContainer>
    )
}
export default HomePage