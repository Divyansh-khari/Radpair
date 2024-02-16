import logo from './assets/chatgpt.svg';
import './App.css';
import './normal.css';
import React, { useState } from 'react';
function App() {


  //add state for input and Chat Logh
  const [input, setInput] = useState("");
  const [chatLog, setChatLog] = useState([{
    user: "gpt",
    message: "How can I help you?"
  },{
    user: "me",
    message: "I want to use Chat GPT today"
  }]);

  



  async function handleSubmit(e) {
    e.preventDefault();
    let chatLogNew= [...chatLog, { user: "me", message: `${input}` }];
    
    setInput("");
    setChatLog(chatLogNew)
    const messages= chatLogNew.map((message)=> message.message).join("\n");
    //fetch response to the api, combining the chat log array of messages& sending it as message to localhost: 3080 as POST
    
    const response= await fetch("http://localhost:3080",{
      method: "POST",
      headers: {
        "Content-Type" : "application/json",

      },
      body: JSON.stringify({
        message: messages
      })
    });
    const data= await response.json();
    setChatLog([...chatLogNew, {user: "gpt", message: `${data.message}`}])
    console.log(data.message);
  }



  return (
    <div className="App">
      <aside className="sidemenu">
        <div className="side-menu-button" ><span>+</span>New Chat</div>
      </aside>
      <section className="chatbox">
        <div className="chat-log">
          {chatLog.map((message, index)=>{
            return(
            <ChatMessage key={index} message={message}/>)
          })}
          
          <div className="chat-message chatgpt">
            

          </div>
        </div>
        <div className="chat-input-holder">
          <form id="form" onSubmit={handleSubmit}>
            <input value={input} onChange={(e) => setInput(e.target.value)} rows="1" className="chat-input-textarea" placeholder="Type your message here" />
          </form>
        </div>
      </section>


    </div>
  );
}


const ChatMessage = ({ message }) => {
  return (
    <div className="chat-message">
      <div className="chat-message-center">
        <div className="avatar">
        {message.user}
        </div>
        <div className="message">
          {message.message}
        </div>
      </div>

    </div>
  )
}

export default App;
