import React from 'react';
import { Container } from 'semantic-ui-react';
import EventDashboard from '../../features/events/EventDashboard';
import HomePage from '../../features/home/HomePage';
import EventDetailedPage from '../../features/eventDetailed/EventDetailedPage';
import EventForm from '../../features/events/EventForm';
import Navbar from '../../features/nav/Navbar';
import { Route, useLocation } from 'react-router-dom';

function App() {
  const { key } = useLocation();
  return (
    <>
      <Route exact path='/' component={HomePage} />
      <Route path={'/(.+)'} render={() => (
        <React.Fragment>
          <Navbar />
          <Container className='main'>
            <Route exact path='/events' component={EventDashboard} />
            <Route exact path='/events/:id' component={EventDetailedPage} />
            <Route exact path={['/createEvent', '/manage/:id']} component={EventForm} key={key} />
          </Container>
        </React.Fragment>
      )}/>
    </>
  );
}

export default App;
