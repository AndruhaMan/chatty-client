import { useEffect, useRef, useState } from "react";
import { InputField } from "../InputField";
import { Message } from "../Message";
import './ChatPage.scss';

export const ChatPage = ({ socket }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [sessionId] = useState(sessionStorage.getItem('sessionId'));
  const [userName] = useState(sessionStorage.getItem('userName'));
  const lastMessageRef = useRef(null);

  useEffect(() => {
    fetch('http://localhost:4000/messages')
      .then(res => res.json())
      .then(fetchedMessages => setMessages(fetchedMessages));
  }, []);
  
  useEffect(() => {
    if (socket) {
      socket.once('messageResponse', (data) => setMessages([...messages, data]));
    }
  }, [socket, messages]);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (message.trim() && socket) {
      socket.emit('message', {
        text: message,
        sessionId,
      });
    }
    setMessage('');
  };

  return (
    <div className="ChatPage">
      <div className="ChatPage__messages">
        {messages.map(message => (
          <Message message={message} userName={userName}/>
        )
        )}
        <div ref={lastMessageRef} />
      </div>

      <div className="ChatPage__input">
        <form className="form" onSubmit={handleSendMessage}>
          <InputField
            currentValue={message}
            setValue={setMessage}

          />
          <button className="form__button"></button>
        </form>
      </div>
    </div >
  );
};