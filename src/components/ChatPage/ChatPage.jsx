import { useEffect, useRef, useState } from "react";
import cn from 'classnames';

import './ChatPage.scss';

export const ChatPage = ({ socket }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const lastMessageRef = useRef(null);

  useEffect(() => {
    fetch('http://localhost:4000/messages')
      .then(res => res.json())
      .then(fetchedMessages => setMessages(current => [...fetchedMessages, ...current]))
      .then(() => console.log(messages));
  }, []);

  useEffect(() => {
    socket.once('messageHistory', (data) => setMessages(data));
  }, [socket]);
  
  useEffect(() => {
    socket.once('messageResponse', (data) => setMessages([...messages, data]));
  }, [socket, messages]);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      socket.emit('message', {
        text: message,
        time: new Date().toLocaleTimeString(),
        socketID: socket.id,
      });
    }
    setMessage('');
  };

  return (
    <div className="ChatPage">
      <div className="ChatPage__messages">
        {messages.map(message => (
          <div
            className={cn(
              "message",
              { "message--outcoming": message.socketID === socket.id },
            )}
            key={message.id}
          >
            {message.socketID !== socket.id && (
              <span className="message__user">
                {message.name}
              </span>
            )}


            <p className="message__text">
              {message.text}
            </p>

            <span className="message__time">
              {message.time.slice(0, -3)}
            </span>
          </div>
        )
        )}
        <div ref={lastMessageRef} />
      </div>

      <div className="ChatPage__input">
        <form className="form" onSubmit={handleSendMessage}>
          <input
            type="text"
            className="form__input"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className="form__button"></button>
        </form>
      </div>
    </div >
  );
};