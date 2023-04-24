import './App.css';
import ChatMessage from "./components/ChatMessage";
import Input from "./components/Input"
import { useState, useEffect } from "react";
const CHANNEL_ID ="ZZsSfYTe1oungzyF"; 

function getRandomName() {
  const adjectives = ["autumn", "hidden", "bitter", "misty", "silent", "empty", "dry", "dark", "summer", "icy", "delicate", "quiet", "white", "cool", "spring", "winter", "patient", "twilight", "dawn", "crimson", "wispy", "weathered", "blue", "billowing", "broken", "cold", "damp", "falling", "frosty", "green", "long", "late", "lingering", "bold", "little", "morning", "muddy", "old", "red", "rough", "still", "small", "sparkling", "throbbing", "shy", "wandering", "withered", "wild", "black", "young", "holy", "solitary", "fragrant", "aged", "snowy", "proud", "floral", "restless", "divine", "polished", "ancient", "purple", "lively", "nameless"];
  const nouns = ["waterfall", "river", "breeze", "moon", "rain", "wind", "sea", "morning", "snow", "lake", "sunset", "pine", "shadow", "leaf", "dawn", "glitter", "forest", "hill", "cloud", "meadow", "sun", "glade", "bird", "brook", "butterfly", "bush", "dew", "dust", "field", "fire", "flower", "firefly", "feather", "grass", "haze", "mountain", "night", "pond", "darkness", "snowflake", "silence", "sound", "sky", "shape", "surf", "thunder", "violet", "water", "wildflower", "wave", "water", "resonance", "sun", "wood", "dream", "cherry", "tree", "fog", "frost", "voice", "paper", "frog", "smoke", "star"];
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  return adjective + noun;
}

function getRandomColor() {
  return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
}

function App () {
    const [messages, setMessages]= useState([]); 
    const [member, setMember] = useState ({
        username : getRandomName(),
        color : getRandomColor()
    })
    const [drone, setDrone] = useState(null); 
    useEffect(() => {
      if (member.username) { 
        const drone = new window.Scaledrone(CHANNEL_ID, {
          data: member
        });
        setDrone(drone);
        setMember(member);
      }
    }, [member]);
    useEffect(() => {
      const triggerDroneEvents = () => {
        drone.on("open", (error) => {
          if (error) {
            return console.error(error);
          } else {
            console.log("Successfully opened."); 
          }
          member.id = drone.clientId;
          triggerRoomEvents();
        });
        drone.on("error", (error) => console.error(error));
      };
      const triggerRoomEvents = () => {
        const room = drone.subscribe("observable-room");
        room.on("open", (error) => {
          if (error) {
            console.error(error);
          } else {
            console.log("Connected to room");
          }
        });
        room.on("data", (data, member) => {
          setMessages(messages => [...messages, {member, text: data}]);
        });
      };
      if (drone) {
        triggerDroneEvents();
      }
    }, [drone, member]);
    const sendMessage = (message) => {
        drone.publish({
          room: "observable-room",
          message
        });
    }
    return (
        <div className="mnbApp">
         <div className="mnbApp-header">
          <h1>Talktopia</h1>
        </div>
        <ChatMessage
          messages={messages}
          currentMember={member}
        />
        <Input
            sendMessage={sendMessage}
        />
        </div>
      );
}
export default App;
