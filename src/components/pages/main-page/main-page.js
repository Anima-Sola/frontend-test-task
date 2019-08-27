import React from 'react';
import LoadedActivityContainer from './loaded-activity';
import CustomSettings from './custom-settings';

//The main page with loaded activity and custom settings
const MainPage = () => {
    return (
        <div>
            <LoadedActivityContainer />
            <CustomSettings />
        </div>
    );
}

export default MainPage;