let id = 0;

function ChatMessage (props) {
  const { messages, currentMember } = props;
  const generateKey = () => { 
    return id++;
  }

  const renderMessage = (message) => {
    const {member, text} = message; 
    const myMessage = member.id === currentMember.id;
    
    const className = myMessage ?
      "mnb-messages currentMember" : "mnb-messages-message";
    return (
      <li key={generateKey()} className={className}>
      <span
        className="avatar"
        style={{backgroundColor: member.clientData.color}}
      />
        <div className="mnb-message-content">
          <div className="username">
            {member.clientData.username}
          </div>
          <div className="text">{text}</div>
        </div>
      </li>
      );
  }
  const createListOfMessages = (messages) =>
  {
    return(
    messages.map((message) => renderMessage(message))
    );
  }
  return (
      <ul className="mnb-messages-list">
        {createListOfMessages(messages)}
      </ul>
    );
}
export default ChatMessage;