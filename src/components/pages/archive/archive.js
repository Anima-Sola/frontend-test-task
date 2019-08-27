import React, { useState,  useContext } from 'react';
import styled from 'styled-components';
import StoreContext from '../../store-context';
import star from './star.png';
import solidstar from './solidstar.png';
import busket from './busket.png';
import { 
    toggleFavouriteActivityAction,
    removeActivityAction
} from '../../../actions';

//The component works with archive - it makes activity favourite/non favourite, removes activities, changes state
const Archive = () => {
    const { archiveState, archiveDispatch } = useContext(StoreContext);
    let activities = archiveState.activities;
    let [ forUpdatingFlag, updateComponent ] = useState(false);

    if(activities.length === 0) return <NoActivitiesWarning><h1>There are no activities in the list.</h1></NoActivitiesWarning>;

    const doAction = (key, action) => {
        archiveDispatch(action(key));
        localStorage.setItem('archiveState', JSON.stringify(archiveState));
        updateComponent(!forUpdatingFlag);
    }

    const styledActivities = activities.map( (value) => {
        const { accessibility, activity, key, participants, price, type, isFavourite } = value;
        const parameters = `Accessibility: ${accessibility} Participants: ${participants} Price: ${price} Type: ${type}`;
        const bold = (isFavourite) ? { fontWeight: 'bold', fontStyle: 'italic' } : {};
        const star = (isFavourite) ? 
            <SolidStar title="Make activity non favourite" onClick={() => doAction(key, toggleFavouriteActivityAction)} /> : 
            <Star title="Make activity favourite" onClick={() => doAction(key, toggleFavouriteActivityAction)}/>

        return (
            <ArchiveItem key={key}>
                <ArchiveData>
                    <ArchiveItemTitle style={bold} onClick={() => doAction(key, toggleFavouriteActivityAction)} >{activity}</ArchiveItemTitle>
                    <ArchiveItemParameters>{parameters}</ArchiveItemParameters>
                </ArchiveData>

                {star}
                <Busket title="Remove activity" onClick={() => doAction(key, removeActivityAction)}/>
            </ArchiveItem>
        );
    })

    return (
        <div>
            <ArchiveTitle>Archive of activities</ArchiveTitle>
            <ActivitiesContainer>
                {styledActivities}
            </ActivitiesContainer>
        </div>
    );

}

const NoActivitiesWarning = styled.h1`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    min-height: calc(100vh - 120px);

    h1 {
        color: #fff;
        font-family: 'Nunito Sans', sans-serif;
        font-size: 50px;

        @media (max-width: 992px) {
            font-size: 40px; 
        }
    
        @media (max-width: 768px) {
            font-size: 33px;
        }
    
        @media (max-width: 576px) {
            font-size: 25px; 
        } 
    }
`;

const ArchiveTitle = styled.span`
    width: 100%;
    text-align: center;
    color: #fff;
    font-family: 'Nunito Sans', sans-serif;
    font-size: 35px;
    display: block;
    margin: 10px 0;
`;

const ActivitiesContainer = styled.div`
    margin-bottom: 20px;
`;

const ArchiveItem = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 10px;

    @media (max-width: 768px) {
        padding: 5px 10px;
    }
`;

const ArchiveData = styled.div`
    width: calc(100% - 140px);
`;

const ArchiveItemTitle = styled.div`
    color: #fff;
    font-family: 'Nunito Sans', sans-serif;
    font-size: 27px;
    cursor: pointer;

    @media (max-width: 768px) {
        font-size: 22px;
    }
`;

const ArchiveItemParameters = styled.div`
    color: #fff;
    font-family: 'Nunito Sans', sans-serif;
    font-size: 15px;
    margin-top: 10px;

    @media (max-width: 768px) {
        font-size: 12px;
    }

    @media (max-width: 576px) {
        font-size: 9px; 
    } 

`;

const Star = styled.div`
    width: 70px;
    height: 70px
    background: url(${star}) no-repeat;
    cursor: pointer;
`;

const SolidStar = styled.div`
    width: 70px;
    height: 70px
    background: url(${solidstar}) no-repeat;
    cursor: pointer;
`;

const Busket = styled.div`
    width: 70px;
    height: 70px;
    background: url(${busket}) no-repeat;
    cursor: pointer;
`;

export default Archive;