import { BrowserRouter, Route, Routes } from 'react-router-dom';
import socketIO from 'socket.io-client';
import { Login } from './components/Login';
import './App.scss';
import { ChatPage } from './components/ChatPage';
import { Header } from './components/Header';

const socket = socketIO.connect('http://localhost:4000');


export const App = () => {
  return (
    <>
      <Header />

      <main className='main'>
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/chat" element={<ChatPage socket={socket} />} />
        </Routes>
      </BrowserRouter>
      </main>
    </>
  );
}
