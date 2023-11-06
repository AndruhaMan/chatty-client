import { Route, Routes, useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import { LoginPage } from './components/LoginPage';
import { ChatPage } from './components/ChatPage';
import { Header } from './components/Header';
import { useEffect, useState } from 'react';
import './App.scss';

export const App = () => {
  const [socket, setSocket] = useState(null);
  const navigate = useNavigate();

  const openSocket = () => {
    const sessionId = sessionStorage.getItem('sessionId');

    if (!sessionId) {
      navigate('/login');
    }

    if (sessionId && !socket) {
      const newSocket = io('http://localhost:4000', {
        query: {
          sessionId,
        }
      });

      setSocket(newSocket);

      newSocket.on('connect', () => {
        setSocket(newSocket);
        console.log('connected');
        navigate('/chat');
      });

      newSocket.on("connect_error", (err) => {
        console.log(err.message);
        setSocket(null);
        navigate('/login')
      });

      newSocket.on('disconnect', () => {
        setSocket(null);
        console.log('disconnected');
      });
    }
  }

  const closeSocket = () => {
    if (socket) {
      socket.disconnect();
    }
  }

  useEffect(() => {
    openSocket()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  return (
    <div className="App">
      <Header closeSocket={closeSocket}/>

      <main className='main'>
        <Routes>
          <Route path="/login" element={<LoginPage openSocket={openSocket} />} />
          <Route path="/signup" element={<LoginPage openSocket={openSocket} />} />
          <Route path="/chat" element={<ChatPage socket={socket} />} />
        </Routes>
      </main>
    </div>
  );
}
