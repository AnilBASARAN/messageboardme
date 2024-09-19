import './App.css';
import { useState, useEffect } from "react";

const App = () => {
  const [messages, setMessages] = useState([]); // Ensure it's an array
  const [text, setText] = useState("");
  const [username, setUsername] = useState("guest");

  const fetchMessages = () => {
    fetch("https://api.react-formula.com/learning-api/demos/message-board/messages")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setMessages(data);
        } else {
          console.error("Unexpected data format:", data);
        }
      });
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("https://api.react-formula.com/learning-api/demos/message-board/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, message: text }),
    }).then(() => {
      setText("");
      fetchMessages(); // Re-fetch messages after posting
    });
  };

  console.log(messages);

  const messageItems = Array.isArray(messages)
    ? messages.map((message, idx) => (
        <div
          key={idx}
          className="p-6 m-4 border border-gray-300 rounded-md shadow-md"
        >
          <div className="mb-2 text-lg font-medium">{message.username}</div>
          <div>{message.message}</div>
        </div>
      ))
    : null;

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col w-full max-w-xl ">
        {messageItems}
      </div>

      <form onSubmit={handleSubmit}>
        <div>
          <input
            placeholder="enter a username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            className="border border-gray-200 p-2 m-2 w-20 rounded-lg"
          />

          <input
            placeholder="enter a text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            type="text"
            className="border border-gray-200 p-2 m-2 w-80 rounded-lg"
          />

          <button className="bg-blue-300 px-3 py-1 rounded-lg">Post</button>
        </div>
      </form>
    </div>
  );
};

export default App;
