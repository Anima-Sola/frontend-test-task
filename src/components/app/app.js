import React, { useReducer, useEffect } from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import StoreContext from '../store-context';
import { 
    customSettingsInitialState, 
    updateCustomSettingsReducer, 
    archiveInitialState, 
    updateArchiveReducer 
} from '../../store';

import Header from '../header/header';
import Footer from '../footer/footer';
import MainPage from '../pages/main-page/main-page';
import Archive from '../pages/archive/archive';
import AboutPage from '../pages/about-page/about-page';
import Page404 from '../pages/page-404/page-404';

const App = () => {
  const [ customSettingsState, customSettingsDispatch ] = useReducer(updateCustomSettingsReducer, customSettingsInitialState);
  const [ archiveState, archiveDispatch ] = useReducer(updateArchiveReducer, archiveInitialState);

  useEffect(() => {

      localStorage.setItem('customSettingsState', JSON.stringify(customSettingsState));
      localStorage.setItem('archiveState', JSON.stringify(archiveState));

  });

  return (
    <StoreContext.Provider value={{ customSettingsState, customSettingsDispatch, archiveState, archiveDispatch }}>
      <Router>
        <Main>
            <Header />
            <Wrapper>

              <Switch>
                <Route path="/" component={MainPage} exact />
                <Route path="/archive" component={Archive} exact />
                <Route path="/about" component={AboutPage} exact />
                <Route component={Page404} />
              </Switch>

            </Wrapper>
            <Footer />
        </Main>
      </Router>
    </StoreContext.Provider>
  );
};

const Main = styled.main`
    max-width: 1200px;
    min-width: 510px;
    margin: auto;
    display: flex;
    min-height: 100vh;
    flex-direction: column;
`;

const Wrapper = styled.section`
    flex: 1;
    padding: 0 43px;
`;

export default App;