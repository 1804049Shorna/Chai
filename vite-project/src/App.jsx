import { useState, useEffect } from "react";
import {ethers} from "ethers";
import abi from "./contractJson/chai.json";
import Memos from "./components/Memos";
import Buy from "./components/Buy";
import chai from "./chai.png";
import "./App.css";

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });

  const [account, setAccount] = useState("");

  //here using useeffect to fetch automatically contract instance

  useEffect(() => {
    const teamplate = async () => {
      const contractAddress = "0x7B74845DD0291BF6032D386C30cC9f9D9a59D4a9";
      const contactABI = abi.abi;
      //Metamask part
      //1. In order do transactions on goerli testnet
      //2. Metmask consists of infura api which actually help in connectig to the blockhain
      try {
        const { ethereum } = window;
        const account = await ethereum.request({
          method: "eth_requestAccounts",
        });

         window.ethereum.on("accountsChanged",()=>{
          window.location.reload()
         })
        setAccount(account);

        const provider = new ethers.providers.Web3Provider(ethereum); //read the Blockchain
        const signer = provider.getSigner();

        const contract = new ethers.Contract(
          contractAddress,
          contactABI,
          signer
        );
        console.log(contract);
        setState({ provider, signer, contract });
        console.log(state);
      } catch (error) {
        alert(error);
      }
    }
    teamplate();
  }, []);

 

  return (
    
    <div >
    <img src={chai} className="img-fluid" alt=".." width="100%" />
    <p style={{ marginTop: "10px", marginLeft: "5px" }}>
      <small>Connected Account - {account}</small>
    </p>
   
      <Buy state={state} />
      <Memos state={state} />
   
  </div>
  )
}

export default App;
