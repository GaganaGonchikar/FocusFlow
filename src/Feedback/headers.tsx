import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
// import logo from '../../src/Logo.png';

function StickyHeader(): JSX.Element {
  return (
    <>
      <Navbar bg="white" >
        <Container>
          {/* <img src={logo} alt="Logo" className="ml-auto" width={250} height={70} /> */}
        </Container>
      </Navbar>
      <br />
    </>
  );
}

export default StickyHeader;
