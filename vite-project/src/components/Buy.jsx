
import { ethers } from "ethers";
import "./Buy.css";
const Buy=({state})=>{
     
    const buychaii=async(event)=>{
        event.preventDefault();
        //console.log("hello");
        //console.log(state);
        const {contract}=state;
       // console.log(contract);
        const name=document.querySelector("#name").value;
        const message=document.querySelector("#message").value;

        const amount={value:ethers.utils.parseEther("0.00001")}
        
        const transactions=await contract.buyChai(name,message,amount);
        await transactions.wait();
        console.log(name,message);

        console.log("transactions is successful");


    }
    return (
        <div className="center">
       <h1>Thanks</h1>
        <form onSubmit={buychaii}>
          <div className="inputbox">
            <input type="text" required="required" id="name"/>
           {/* // <span>Name</span> */}
          </div>
          <div className="inputbox">
            <input type="text" required="required" id="message" />
            {/* <span>Message</span> */}
          </div>
          <div className="inputbox">
            <input type="submit" value="Pay"  disabled={!state.contract}/>
          </div>
        </form>
          
        </div>
      );
    
}

export default Buy;