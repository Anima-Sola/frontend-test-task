import React from 'react';
import styled from 'styled-components';
import cat from './cat.jpg';

const AboutPage = () => {
    return (
        <div>
            <H1>What to do if you are bored?</H1>
            <P>
                You life lost all colors and has a taste of spoiled burger? Or maybe you boyfried/girfried/wife/husband went to visit the parents and you absolutely alone?
                Or you often remember that then you were young the grass was greener and the Sun shined brighter?
            </P>
            <P>
                Everything is clear... You are bored and don't know how to fill your free time. You imagination has broken and you can't decide that to do instead of
                watching TV/Youtube or stupid serfing on the Internet without any aim.
            </P>
            <P>
                This service will help you. At the main page it suggests you an activity which you can do or take part. I'm sure your dreams will come true...
            </P>
            <H1>Used tecnologies.</H1>
            <P>
                The service is using the <a href="https://www.boredapi.com/">Bored API</a>
            </P>
            <H1>And now just smile :)</H1>
            <P>
                <img src={cat} alt="A pretty cat" />
            </P>

        </div>
    );
}

const H1 = styled.h1`
    font-family: 'Satisfy', cursive;
    font-size: 30px;
    //color: #115C9A;
    color: #fff;
    margin-top: 25px;
`;

const P = styled.p`
    font-family: 'Nunito Sans', sans-serif;
    font-size: 20px;
    //color: #115C9A;
    color: #fff;
    margin-top: 15px;

    img {
        border: 1px solid #fff;
        margin-bottom: 25px;
    }

`;

export default AboutPage;