import classNames from "classnames";
import './Message.scss';

export const Message = ({message, userName}) => {
  return (
    <div
      className={classNames(
        "Message",
        { "Message--outcoming": message.name === userName },
      )}
      key={message.id}
    >
      {message.name !== userName && (
        <span className="Message__user">
          {message.name}
        </span>
      )}


      <p className="Message__text">
        {message.text}
      </p>

      <span className="Message__time">
        {message.time.slice(0, -3)}
      </span>
    </div>
  );
};