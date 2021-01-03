import React, { useState } from 'react';
import { Menu, Container, Button } from 'semantic-ui-react';
import { NavLink, useHistory } from 'react-router-dom';
import SignedOutMenu from './SignedOutMenu';
import SignedInMenu from './SignedInMenu';

export default function Navbar(props) {
  const history = useHistory();
  const [authenticated, setAuthenticated] = useState(false);

  function handleSignOut() {
    setAuthenticated(false);
    history.push('/');
  }

  return (
    <Menu secondary inverted fixed='top'>
      <Container>
        <Menu.Item as={NavLink} exact to='/' header>
          <img src="/assets/logo.png" alt="logo" style={{'marginRight': '15px'}}/>
          Event Social
        </Menu.Item>
        <Menu.Item as={NavLink} exact to='/events'>Events</Menu.Item>
        { authenticated &&
          <Menu.Item as={NavLink} exact to='/createEvent'>
            <Button basic inverted color='red' icon='add' content='Create Event' />
          </Menu.Item>
        }
        { authenticated ? <SignedInMenu signOut={handleSignOut}/> : <SignedOutMenu setAuthenticated={setAuthenticated}/>}
      </Container>
    </Menu>
  )
}
