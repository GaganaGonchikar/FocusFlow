import React from 'react';
import engagelogo from './engagelogo.png';
import './Header.css';

type HeaderProps = {
  title: string;
};

function Header({ title }: HeaderProps) {
  return (
    <header className="headerfile">
      <link href="https://fonts.googleapis.com/css?family=Proxima+Nova&display=swap" rel="stylesheet"></link>
      <a href="http://localhost:3000/">
        <img src={engagelogo} alt="Engage Logo" className="engagelogo" />
      </a>
      <h1 className="headerheading">{title}</h1>
      {/* other header content here */}
    </header>
  );
}

export default Header;


