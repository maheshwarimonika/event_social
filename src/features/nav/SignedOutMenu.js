import React from 'react';
import { Menu, Button } from 'semantic-ui-react';

export default function SignedOutMenu({setAuthenticated}) {
  return (
    <Menu.Item position='right'>
      <Button onClick={() => setAuthenticated(true)} basic inverted icon='sign-in' content='Login' style={{'marginRight': '1rem'}}/>
      <Button basic inverted icon='signup' content='Signup'/>
    </Menu.Item>
  );
}
