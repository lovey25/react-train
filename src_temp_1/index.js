import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

function Hello(props) {
  const [name, setName] = useState("David");

  return <p>hello, {name}</p>;
}

function Counter() {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    console.log("only one");
    return () => {
      console.log("cleanup");
    };
  }, []);

  function Increment() {
    setCounter(counter + 1);
  }

  return (
    <div>
      <p>Number of clicks: {counter}</p>
      <button onClick={Increment}> Increment </button>
    </div>
  );
}

function AddForm() {
  const [sum, setSum] = useState(0);
  const [num, setNum] = useState(0);

  function handleChange(e) {
    setNum(e.target.value);
  }

  function handleSubmit(e) {
    setSum(sum + Number(num));
    e.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="number" value={num} onChange={handleChange} />
      <input type="submit" value="Add" />
      <p> Sum is {sum} </p>
    </form>
  );
}

ReactDOM.render(
  <div>
    <Hello />
    <Counter />
    <br />
    <AddForm />
  </div>,
  document.getElementById("root")
);
