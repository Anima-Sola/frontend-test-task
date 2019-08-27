const archiveNewActivityAction = (activity) => {
    return {
        type: 'ARCHIVE_NEW_ACTIVITY',
        payload: activity
    };
};

const toggleFavouriteActivityAction = (key) => {
    return {
        type: 'TOGGLE_FAVOURITE_ACTIVITY',
        payload: key
    }
}

const removeActivityAction = (key) => {
    return {
        type: 'REMOVE_ACTIVITY',
        payload: key
    }
}

export {
    archiveNewActivityAction,
    toggleFavouriteActivityAction,
    removeActivityAction
}