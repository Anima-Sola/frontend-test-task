import React from 'react';
import styled from 'styled-components';

const Footer = () => {
    return (
        <FooterContainer>
            <p>Copyright © 2019</p>
        </FooterContainer>    
    );
};

const FooterContainer = styled.footer`
    width: 100%;
    border-top: 1px solid #fff;
    height: 60px;
    line-height: 60px;
    text-align: center;
    color: #fff;
    font-family: 'Nunito Sans', sans-serif;
`;

export default Footer;