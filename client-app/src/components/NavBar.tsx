import axios from 'axios';
import { useState, useEffect, useCallback } from 'react';

import { List, Header, Menu, Container, Button } from 'semantic-ui-react';


interface Props {
  create: () => void;
}

const NavBar = ({ create }: Props) => {

  return (
    <>
     <Menu inverted fixed='top'>
        <Container>
            <Menu.Item >
                <img src="/assets/logo.png" alt="logo" className="mr-3"  />
                Reactivities
            </Menu.Item>
            <Menu.Item name='Activities' />
            <Menu.Item name='Activities'>
                <Button positive content="Create activity" onClick={create}></Button>
            </Menu.Item>
                
        </Container>
     </Menu>
    </>
  )
}

export default NavBar;
