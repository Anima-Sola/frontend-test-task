import React from 'react';
import styled from 'styled-components';
import loading from './loading.gif';

//It shows until receiving data from server
const Spinner = () => {
    return (
        <div>
            <SpinnerTitle>
                <p>I'm getting an activity...</p>
            </SpinnerTitle>
            <SpinnerImage src={loading} alt="Loading" />
        </div>
    );
}

const SpinnerTitle = styled.div`
    //color: #115C9A;
    color: #fff;
    font-size: 30px;
    font-family: 'Nunito Sans', sans-serif;
    margin-bottom: 25px;
`;

const SpinnerImage = styled.img`
    display: block;
    margin: auto;
`;

export default Spinner;