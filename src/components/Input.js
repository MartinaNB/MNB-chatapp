import { useState } from "react";

function Input (props) {

  const [text, setText] = useState("");

  const onChange = (e) => {
    setText(e.target.value);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    props.sendMessage(text);
    setText("");
  }
    return (
      <div className="Input">
        <form onSubmit={onSubmit}>
          <input
            onChange={onChange}
            value={text}
            type="text"
            placeholder="Enter your message"
            autoFocus={true}
          />
          <button>Send</button>
        </form>
      </div>
    );
};
export default Input;