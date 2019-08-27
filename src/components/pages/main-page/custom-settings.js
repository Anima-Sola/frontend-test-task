import React, { useContext } from 'react';
import styled from 'styled-components';
import StoreContext from '../../store-context';
import tick from './tick.png';
import plus from './plus.png';
import minus from './minus.png';
import { 
    setSelectedTypeOfAction,
    setSelectedCustomActivity,
    incValueAction,
    decValueAction,
    incLowerValueAction,
    decLowerValueAction,
    incHigherValueAction,
    decHigherValueAction
} from '../../../actions';

//The component which handles events on Select element and changes state
const SelectSetting = ({ activityId }) => {
    const { customSettingsState, customSettingsDispatch } = useContext(StoreContext);
    const { selectedActivityId, activities, activityTypes } = customSettingsState;
    const { customSetting, CustomSettingTitle, value } = activities[activityId];

    const isChecked = (selectedActivityId === activityId);
    const opacity = isChecked ? {opacity: 1} : {};
    
    const getActivityTypeList = () => {
        let key = 0;
        return activityTypes.map(( type ) => {
            return <option key={key++} >{ type }</option>
        });
    }
    
    const doAction = (action) => {
        customSettingsDispatch(action(activityId));
    }

    const setSelectedType = () => {
        const select = document.getElementById('activity_type_select');
        customSettingsDispatch(setSelectedTypeOfAction(select.value));
    }
    
    return (
        <CustomSettingsItem style={opacity}>
            <RadioSwitcher id={customSetting} type="radio" name="setting" onClick={() => doAction(setSelectedCustomActivity)} checked={isChecked} readOnly />
            <label htmlFor={customSetting}><span></span>{CustomSettingTitle}</label>
            <Select disabled={!isChecked} id="activity_type_select" onChange={setSelectedType} value={value}>
                {getActivityTypeList()}
            </Select>
        </CustomSettingsItem>
    );
}

//The component which handles events on single value block and changes state
const SingleValueSetting = ({ activityId }) => {
    const { customSettingsState, customSettingsDispatch } = useContext(StoreContext);
    const { selectedActivityId, activities } = customSettingsState;
    const { value, customSetting, CustomSettingTitle } = activities[activityId];
    
    const isChecked = (selectedActivityId === activityId);
    const opacity = isChecked ? { opacity: 1 } : {};

    const doActivity = (activity) => {
        customSettingsDispatch(activity(activityId));
    }

    return (
        <CustomSettingsItem style={opacity}>
            <RadioSwitcher id={customSetting} type="radio" name="setting" onClick={() => doActivity(setSelectedCustomActivity)} checked={isChecked} readOnly />
            <label htmlFor={customSetting}><span></span>{CustomSettingTitle}</label>
            <ValueContainer>
                <ValueButton onClick={() => doActivity(decValueAction)} disabled={!isChecked}><img src={minus} alt='minus' /></ValueButton>
                <Value>{ value }</Value>
                <ValueButton onClick={() => doActivity(incValueAction)} disabled={!isChecked}><img src={plus} alt='plus' /></ValueButton>
            </ValueContainer>
        </CustomSettingsItem>
    );   
}

//The component which handles events on range value block and changes state
const RangeValuesSetting = ({ activityId }) => {
    const { customSettingsState, customSettingsDispatch } = useContext(StoreContext);
    const { selectedActivityId, activities } = customSettingsState;
    const { lowerValue, higherValue, customSetting, CustomSettingTitle } = activities[activityId];

    const isChecked = (selectedActivityId === activityId);
    const opacity = isChecked ? { opacity: 1 } : {};

    const doAction = (action) => {
        customSettingsDispatch(action(activityId));
    }
    
    return (
        <CustomSettingsItem style={opacity}>
            <RadioSwitcher id={customSetting} type="radio" name="setting" onClick={() => doAction(setSelectedCustomActivity)} checked={isChecked} readOnly />
            <label htmlFor={customSetting}><span></span>{CustomSettingTitle}</label>
            <ValueContainer>
                <ValueButton onClick={() => doAction(decLowerValueAction)} disabled={!isChecked}><img src={minus} alt='minus' /></ValueButton>
                <Value>{ lowerValue }</Value>
                <ValueButton onClick={() => doAction(incLowerValueAction)} disabled={!isChecked}><img src={plus} alt='plus' /></ValueButton>
                <ValueButton onClick={() => doAction(decHigherValueAction)} disabled={!isChecked}><img src={minus} alt='minus' /></ValueButton>
                <Value>{ higherValue }</Value>
                <ValueButton onClick={() => doAction(incHigherValueAction)} disabled={!isChecked}><img src={plus} alt='plus' /></ValueButton>
            </ValueContainer>
        </CustomSettingsItem>
    );
}

const CustomSettings = () => {    
    return (
        <div>
            <CustomTitle><span>Custom activity settings</span></CustomTitle>
            <CustomSettingsContainer>   
                <CustomSettingsColumn>
                    <CustomSettingsItemBorderBottomRight>
                        <SelectSetting activityId={0} />
                    </CustomSettingsItemBorderBottomRight>
                    <CustomSettingsItemBorderBottomRight>
                        <SingleValueSetting activityId={1} />
                    </CustomSettingsItemBorderBottomRight>
                    <CustomSettingsItemBorderRight>
                        <RangeValuesSetting activityId={2} />
                    </CustomSettingsItemBorderRight>
                </CustomSettingsColumn>
                <CustomSettingsColumn>
                    <CustomSettingsItemBorderBottom>
                        <SingleValueSetting activityId={3} />
                    </CustomSettingsItemBorderBottom>
                    <CustomSettingsItemBorderBottom>
                        <SingleValueSetting activityId={4} />
                    </CustomSettingsItemBorderBottom>
                    <RangeValuesSetting activityId={5} />
                </CustomSettingsColumn>
            </CustomSettingsContainer>
        </div>
    );
}

const CustomTitle = styled.span`
    width: 100%;
    text-align: center;
    color: #fff;
    font-family: 'Nunito Sans', sans-serif;
    font-size: 35px;
    display: block;
    margin-bottom: 30px;
`;

const CustomSettingsContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    user-select: none;
    margin-bottom: 20px;
    
    @media (max-width: 576px) {
        display: block;
    }    

`;

const CustomSettingsColumn = styled.div`
    width: 50%;
    color: #fff;
    font-family: 'Nunito Sans', sans-serif;
    font-size: 20px;

    @media (max-width: 768px) {
        font-size: 18px;
    }
    
    @media (max-width: 576px) {
        width: 100%;
        font-size: 20px; 
    }  
`;

const CustomSettingsItemBorderBottomRight = styled.div`
    border-bottom: 1px dashed #fff;
    border-right: 1px dashed #fff;

    @media (max-width: 576px) {
        border-right: none;
    }  

`;

const CustomSettingsItemBorderRight = styled.div`
    border-right: 1px dashed #fff;

    @media (max-width: 576px) {
        border-right: none;
        border-bottom: 1px dashed #fff;
    }  

`;

const CustomSettingsItemBorderBottom = styled.div`
    border-bottom: 1px dashed #fff;
`;

const CustomSettingsItem = styled.div`
    width: 100%;
    padding: 14px 10px;
    opacity: 0.5;
`;

const RadioSwitcher = styled.input`
    display: none;

    & + label {
        cursor:pointer;
    }

    & + label span {
        display:inline-block;
        width:35px;
        height:35px;
        margin: -3px 10px 0 0;
        vertical-align:middle;
        border: 1px solid #fff;
        border-radius: 2px;
    }
    
    :checked + label span {
        background: url(${tick}) no-repeat;
    }

`;

const Select = styled.select`
    width: 100%;
    font-family: 'Nunito Sans', sans-serif;
    font-size: 20px;
    color: #fff;
    background: none;
    margin: 14px 0 0 0;
    border-radius: 3px;
    outline: none;

    :hover:enabled {
        cursor: pointer;
    }

    option {
        background: #242527;
        color: #fff;
        border: 1px solid #fff;
    }

`;

const ValueContainer = styled.div`
    margin-top: 14px;
    width: 80%;
    display: flex;
    align-items: center;
`;

const Value = styled.div`
    font-family: 'Nunito Sans', sans-serif;
    font-size: 25px;
    color: #fff;
    margin: 4px 10px 0 10px;
    min-width: 60px;
    text-align: center;
    user-select: none;
`;

const ValueButton = styled.button`
    width: 40px;
    height: 30px;
    background: none;
    border-radius: 3px;
    border: 1px solid #fff;
    
    :hover:enabled {
        background-color: black;
        cursor: pointer;
    }

    img {
        margin: -2px -9px;
    }
`;

export default CustomSettings;