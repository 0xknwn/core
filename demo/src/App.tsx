import "./App.css";

import { connect } from "starknetkit";
import { InjectedConnector } from "starknetkit/injected";
import { injectSmartr } from "@smartr-network/wallet";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    injectSmartr();
  }, []);

  const connectWallet = async () => {
    const { wallet } = await connect({
      connectors: [
        new InjectedConnector({
          options: { id: "smartr" },
        }),
      ],
    });

    console.log(wallet);
  };

  return (
    <>
      <h1>smartr wallet</h1>
      <div className="card">
        <button onClick={() => connectWallet()}>connect</button>
      </div>
    </>
  );
}

export default App;
