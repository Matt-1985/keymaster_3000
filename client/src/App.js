import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import { getPassword } from "./api/passwords";
import useAsync from "./api/hooks/useAsync";
import Form from "../src/components/Form";

function App() {
  const [InputValue, setInputValue] = useState("");
  const { data, loading, error, doFetch } = useAsync(() =>
    getPassword("merci")
  );

  useEffect(() => {
    doFetch();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {data}
        {loading && <div>loading...</div>}
        {error && <div>{error.message}</div>}
        <Form
          onSubmit={(event) => {
            event.preventDefault();
            doFetch();
            setInputValue();
          }}
        >
          <input
            value={InputValue}
            onChange={(event) => setInputValue(event.target.value)}
          />
        </Form>
      </header>
    </div>
  );
}

export default App;
