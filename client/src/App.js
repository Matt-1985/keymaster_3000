import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import { getPassword } from "./api/passwords";

function App() {
  const [password, setPassword] = useState(null);

  useEffect(() => {
    const doFetch = async () => {
      const newPassword = await getPassword("merci");
      setPassword(newPassword);
    };
    doFetch();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {password}
      </header>
    </div>
  );
}

export default App;
