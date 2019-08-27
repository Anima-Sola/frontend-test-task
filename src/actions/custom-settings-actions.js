const setSelectedCustomActivity = (activityId) => {
    return {
        type: 'SET_SELECTED_CUSTOM_ACTIVITY',
        payload: activityId
    };
};

const setSelectedTypeOfAction = (type) => {
    return {
        type: 'SET_SELECTED_TYPE_OF_ACTION',
        payload: type
    };
};

const incValueAction = (activityId) => {
    return {
        type: 'INC_VALUE',
        payload: activityId
    };
};

const decValueAction = (activityId) => {
    return {
        type: 'DEC_VALUE',
        payload: activityId
    };
};

const incLowerValueAction = (activityId) => {
    return {
        type: 'INC_LOWER_VALUE',
        payload: activityId
    };
};

const decLowerValueAction = (activityId) => {
    return {
        type: 'DEC_LOWER_VALUE',
        payload: activityId
    };
};

const incHigherValueAction = (activityId) => {
    return {
        type: 'INC_HIGHER_VALUE',
        payload: activityId
    };
};

const decHigherValueAction = (activityId) => {
    return {
        type: 'DEC_HIGHER_VALUE',
        payload: activityId
    };
};

export {
    setSelectedTypeOfAction,
    setSelectedCustomActivity,
    incValueAction,
    decValueAction,
    incLowerValueAction,
    decLowerValueAction,
    incHigherValueAction,
    decHigherValueAction
};