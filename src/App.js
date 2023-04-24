import React from 'react';
import Header from './components/Header';
import Main from './components/Main';
import Nav from './components/Nav';
import Footer from './components/Footer';
import './index.css';

export default function App() {
  return (
    <div className="App">
      <Header />
      <div className="main-nav">
        <Main />
        <Nav className="pr-3" />
      </div>
      <Footer />
    </div>
  );
}