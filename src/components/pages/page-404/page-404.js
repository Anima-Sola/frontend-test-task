import React from 'react';
import styled from 'styled-components';

const Page404 = () => {
    return (
        <div>
            <H1>404</H1>
            <H2>Oops:) Sorry, the page doesn't exist!</H2>
        </div>
    );
}

const H1 = styled.h1`
    font-size: 100px;
    margin-top: 100px;
    text-align: center;
    color: #fff;
    font-family: 'Satisfy', cursive;
`;

const H2 = styled.h2`
    font-size: 50px;
    margin-top: 20px;
    text-align: center;
    color: #fff;
    font-family: 'Satisfy', cursive;
`;

export default Page404;