import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import StoreContext from '../../store-context';
import Spinner from '../../spinner';
import ModalWindow from '../../modal-window';
import BoredApiService from '../../../services/bored-api-service';
import { archiveNewActivityAction } from '../../../actions';

const boredApiService = new BoredApiService();

//Shows result of loading activity from server
const ShowResultInfo = ({ info }) => {
    return (<ResultInfo>{info}</ResultInfo>);
}

//Shows loaded activity
const ShowLoadedActivity = ({ loadedActivity }) => {
    return (
        <div>
            <ShowResultInfo info={loadedActivity.activity} />
            <ActivityDetails>
                <span>Accessibility: {loadedActivity.accessibility}</span>
                <span>Participants: {loadedActivity.participants}</span>
                <span>Price: {loadedActivity.price}</span>
                <span>Type: {loadedActivity.type}</span>
            </ActivityDetails>
        </div>
    );
}

//The component which loads activities from server
const LoadedActivityContainer = () => {
    const [state, setState] = useState({  //state of the component
        isLoading: true,
        isActivityExists: false,
        noServerReply: false,
        serviceMethod: boredApiService.getRandomActivity(),
        data: {},
        isArchiveAdding: false,
        archiveAddingResultMessage: ''
    });

    const { customSettingsState, archiveState, archiveDispatch } = useContext(StoreContext);
    const { selectedActivityId, activities } = customSettingsState;

    useEffect(() => {
        if (state.isLoading) {
            state.serviceMethod
                .then((data) => {
                    if (data.error === undefined) {
                        setState({ ...state, isLoading: false, isActivityExists: true, data: data });
                    } else {
                        setState({ ...state, isLoading: false, isActivityExists: false, data: undefined });
                    }
                }).catch(() => {
                    setState({ ...state, isLoading: false, isActivityExists: false, data: undefined, noServerReply: true });
                });
        }
    });

    const getRandomActivity = () => {
        setState({ ...state, isLoading: true, serviceMethod: boredApiService.getRandomActivity() });
    }

    const getCustomActivity = () => {
        const { value, lowerValue, higherValue, customSetting } = activities[selectedActivityId];

        if (value !== undefined) {
            setState({ ...state, isLoading: true, serviceMethod: boredApiService[customSetting](value) });
        }

        if ((lowerValue !== undefined) && (higherValue !== undefined)) {
            setState({ ...state, isLoading: true, serviceMethod: boredApiService[customSetting](lowerValue, higherValue) });
        }
    }

    const addActivityToArchive = () => {
        if (state.data !== undefined) {
            const key = state.data.key;
            const inArray = archiveState.activities.find((currentValue) => {
                return currentValue.key === key;
            })

            if (inArray === undefined) {
                archiveDispatch(archiveNewActivityAction(state.data));
                localStorage.setItem('archiveState', JSON.stringify(archiveState));
                setState({ ...state, isArchiveAdding: true, archiveAddingResultMessage: 'The activity has been added to the archive' });
            } else {
                setState({ ...state, isArchiveAdding: true, archiveAddingResultMessage: 'Such activity is in the archive already' });
            }
        }
    }

    //Shows result
    const loadingResult = () => {
        if (state.isLoading) return <Spinner />;
        if (state.noServerReply) return <ShowResultInfo info="Sorry, but the server doesn't respond" />;
        if (state.isActivityExists) return <ShowLoadedActivity loadedActivity={state.data} />;
        return <ShowResultInfo info="No activities found with the specified parameters" />;
    }

    const closeModalWindow = () => {
        setState({ ...state, isArchiveAdding: false });
    }

    const showModalWindow = () => {

        if (state.isArchiveAdding) {
            return <ModalWindow width="400" height="200" measureType="px" content={state.archiveAddingResultMessage} onWindowHide={closeModalWindow} />;
        }

        return '';
    }

    return (
        <div>
            <ResultContainer>
                {loadingResult()}
            </ResultContainer>
            <ResultButtonsContainer>
                <ResultButton onClick={getRandomActivity}>Random activity</ResultButton>
                <ResultButton onClick={getCustomActivity}>Custom activity</ResultButton>
                <ResultButton onClick={addActivityToArchive} disabled={!state.isActivityExists} >Archive activity</ResultButton>
                {showModalWindow()}
            </ResultButtonsContainer>
        </div>
    );
}

const ResultContainer = styled.div`
    margin: 20px 10%;
    height: 150px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
    @media (max-width: 576px) { 
        height: 170px;
    }
`;

const ResultInfo = styled.span`
    font-family: 'Nunito Sans', sans-serif;
    color: #fff;
    font-size: 40px;
    text-align: center;
    display: block;
    width: 100%;
`;

const ActivityDetails = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-family: 'Nunito Sans', sans-serif;
    color: #fff;
    font-size: 16px;
    text-align: center;
    margin-top: 10px;

    span {
        padding: 0 10px;
    }
`;

const ResultButtonsContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-bottom: 70px;
`;

const ResultButton = styled.button`
    border: 1px solid #fff;
    padding: 10px;
    margin: 0 10px;
    font-family: 'Nunito Sans', sans-serif;
    font-size: 20px;
    background: transparent;
    color: #fff;
    border-radius: 7px;
    width: 200px;
    outline: none;

    :hover:enabled {
        font-weight: bold;
        background-color: black;
        cursor: pointer;
    }

    :disabled {
        opacity: 0.5;
    }

`;

export default LoadedActivityContainer;