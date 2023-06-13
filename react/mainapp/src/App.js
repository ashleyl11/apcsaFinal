import logo from './logo.svg';
import underbot from './underbot.jpg';
import user from './user.jpg';
import { useState } from 'react';
import { useRef, useEffect } from 'react';
import './App.css';

function App() {
  const inputElement = document.getElementById('chatbotTextbox');

  const [text, setText] = useState();
  const [answer, setAnswer] = useState();
  const [messages, setMessages] = useState([]);

  const msgContainerRef = useRef(null);

  function onTextChange(event) {
    setText(event.target.value);
  }

  useEffect(() =>{
    setTimeout(() => {
      if (msgContainerRef.current) {
        msgContainerRef.current.scrollTop = msgContainerRef.current.scrollHeight;
      }
    }, 10);  }, [messages])

  async function onAsk() {  
    let msg = {
      type: "user",
      text: text
    };
      
    setMessages((messages) => [...messages, msg]);
    setText('');

    console.log('adding q');
    console.log([...messages, msg]);

    let waitMsg = {
      type:"bot",
      text: "Good question! Give me a few seconds while I sniff for your answer."
    }
    setMessages((prevMessages) => [...prevMessages, waitMsg]);

    

    var result = await fetch('https://cp-finalproject-api.azurewebsites.net/cp-backend/askquestion?website=NycSchools&question='+text);
    var data = await result.json();
    var answer = data.answer; 
   
    let ans = {
      type:"bot",
      text: answer
    };  
    
    setMessages((messages) => [...messages, ans]);
  }

  function handleKeyDown(event){
    if (event.key === 'Enter'){
      event.preventDefault();
      onAsk();
    }
  }

  function setQuestion(question){
    document.getElementById("chatbotTextbox").value = question;
    setText(question);
    // onAsk();
  }

  return (
    <div className="App">
      <header className="App-header">
        <div class="top-nav">
          <ul class="home">
            <a class="home-link" href="/">
              <div class="myschools-logo">
                <svg role = "presentation" xmlns="http://www.w3.org/2000/svg" width="51" height="17" viewBox="0 0 51 17">
                  <g fill="#4EE4B3">
                    <polygon points="47.096 0 36.604 0 33.48 3.113 33.48 13.627 36.604 16.74 47.096 16.74 50.22 13.627 50.22 10.455 49.159 9.398 43.913 9.398 43.913 10.455 39.728 10.455 39.728 6.285 43.913 6.285 43.913 7.342 49.159 7.342 50.22 6.285 50.22 3.113"></polygon>
                    <polygon points="15.683 0 11.512 0 10.455 1.057 10.455 5.228 5.228 0 1.057 0 0 1.057 0 15.683 1.057 16.74 5.228 16.74 6.285 15.683 6.285 11.512 11.512 16.74 15.683 16.74 16.74 15.683 16.74 1.057"></polygon>
                    <polygon points="23.025 16.74 27.195 16.74 28.253 15.683 28.253 12.57 33.48 7.342 33.48 1.057 32.423 0 28.253 0 27.195 1.057 27.195 3.113 25.081 5.228 23.025 3.113 23.025 1.057 21.968 0 17.797 0 16.74 1.057 16.74 7.342 21.968 12.57 21.968 15.683"></polygon>
                  </g>
                </svg>
                <span class="logo-text" role="presentation">MySchools ChatBot: UnderBot</span>
              </div>
            </a>
          </ul>
          <ul class="top-right-nav">
            <li class="go-home">
              <a class="go-to-home" href="https://www.myschools.nyc/en/">Leave Chatbot</a>
            </li>
          </ul>
        </div>
        <div class="main">
          
          <div class="background1">
            <img class="background" src="https://media.myschools.nyc/static/assets/img/background-sky.png?6ccced415723"/>
            <img class="moon" src="	https://media.myschools.nyc/static/assets/img/moon.png"/>
            <img class="earth" src="https://media.myschools.nyc/static/assets/img/planet%20earth%20layout.png"/>
          </div>

          <div className="boxes">
            <div class="faq">
              <div class="faq-header">
                <h1>FREQUENTLY ASKED QUESTIONS</h1>
              </div>
              <div class="faq-content">
                  <div className="message-item-dog">
                    <div><img className="bot-icon" src={underbot} alt="Bot Icon"></img></div>
                    <div className="bot">Here are some questions I get asked almost every day! Click on a question to have it automatically entered into your textbox.</div>
                  </div>
                <div class="question-list">
                  <ul class="vertical-menu">
                    <li class="faqs">
                      <a href="#" onClick={() => setQuestion('How can I apply to 3K?')}>How can I apply to 3K?</a>
                    </li>
                    {/* <li class="faqs">
                      <a href="https://schoolsearch.schools.nyc/" target="_blank">How can I find schools near me?</a>
                    </li> */}
                    {/* <li class="faqs">
                      <a href="#" onClick={() => setQuestion('How can I find the zone schools near me?')}>How can I find the zone schools near me?</a>
                    </li> */}
                    <li class="faqs">
                      <a href="#" onClick={() => setQuestion('What are the various special education programs available for my child?')}>What are the various special education programs available for my child?</a>
                    </li>
                    <li class="faqs">
                      <a href="#" onClick={() => setQuestion('How do I initiate the transferring process for my child?')}>How do I initiate the transferring process for my child?</a>
                    </li>
                    <li class="faqs">
                      <a href="#" onClick={() => setQuestion('How do I check eligibility for a student MetroCard?')}>How do I check eligibility for a student MetroCard?</a>
                    </li>
                    <li class="faqs">
                      <a href="#" onClick={() => setQuestion('What summer opportunities are available to NYC students?')}>What summer opportunities are available to NYC students?</a>
                    </li>
                  </ul>
                </div>
                <div class="faq-content-title"></div>
                <div class="faq-content-text"></div>
              </div>
            </div>

            <div class="chatbox">
              <div class="chatbox-header">
                <h1>ASK UNDERBOT</h1>
              </div>
              <div ref={msgContainerRef} class="messages" id="msgs">
                <div className="messages-list">
                  <div className="message-item-dog">
                    <div><img className="bot-icon" src={underbot} alt="Bot Icon"></img></div>
                    <div className="bot">Hello! My name is UnderBot. I'm here to personally answer any of your questions you may have about MySchools!</div>
                  </div>
                  {messages.map((message, index) => {
                    return (
                      <div key={index} className={( message.type === 'user' ? "message-item-cat" : "message-item-dog")}>                     
                        <div>
                          {message.type === 'user' ? (
                            <img className="user-icon" src={user} alt="User Icon" />
                          ) : (
                            <img className="bot-icon" src={underbot} alt="Bot Icon" />
                          )}
                        </div>
                        <div className={message.type}>
                          {message.text}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
              <div class="chatbox-bottom">
                <div class="textbox">
                  <input type="text" id="chatbotTextbox" name="textbox" placeholder="Enter your message here" value={text} onChange={onTextChange} onKeyDown={handleKeyDown}/>
                </div>
                <div class="send-button">
                  <button className="button1" type="button" onClick={onAsk}>
                    <svg className="magnifying-glass" viewBox="0 0 69 69">
                      <path className="glass" d="M9 29C9 17.972 17.972 9 29 9s20 8.972 20 20-8.972 20-20 20S9 40.028 9 29m44.645 15.44a28.864 28.864 0 004.436-15.4C58.081 13.028 45.054 0 29.041 0 13.027 0 0 13.027 0 29.04c0 16.013 13.027 29.041 29.04 29.041 5.655 0 10.932-1.63 15.4-4.436l13.448 13.449a6.51 6.51 0 009.206-9.205L53.645 44.44z" fill-rule="evenodd"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
