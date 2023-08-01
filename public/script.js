const ABI = [
     {
          inputs: [
               {
                    internalType: "string",
                    name: "side1",
                    type: "string",
               },
               {
                    internalType: "string",
                    name: "side2",
                    type: "string",
               },
               {
                    internalType: "string",
                    name: "sport",
                    type: "string",
               },
          ],
          name: "addFixture",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
     },
     {
          inputs: [
               {
                    internalType: "uint256",
                    name: "id",
                    type: "uint256",
               },
               {
                    internalType: "uint256",
                    name: "result",
                    type: "uint256",
               },
          ],
          name: "endFixture",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
     },
     {
          inputs: [
               {
                    internalType: "uint256",
                    name: "id",
                    type: "uint256",
               },
               {
                    internalType: "uint256",
                    name: "option",
                    type: "uint256",
               },
          ],
          name: "placeBet",
          outputs: [],
          stateMutability: "payable",
          type: "function",
     },
     {
          inputs: [],
          name: "withdraw",
          outputs: [],
          stateMutability: "payable",
          type: "function",
     },
     {
          inputs: [
               {
                    internalType: "address",
                    name: "",
                    type: "address",
               },
          ],
          name: "accounts",
          outputs: [
               {
                    internalType: "uint256",
                    name: "",
                    type: "uint256",
               },
          ],
          stateMutability: "view",
          type: "function",
     },
     {
          inputs: [],
          name: "betCount",
          outputs: [
               {
                    internalType: "uint256",
                    name: "",
                    type: "uint256",
               },
          ],
          stateMutability: "view",
          type: "function",
     },
     {
          inputs: [
               {
                    internalType: "uint256",
                    name: "",
                    type: "uint256",
               },
          ],
          name: "bets",
          outputs: [
               {
                    internalType: "uint256",
                    name: "id",
                    type: "uint256",
               },
               {
                    internalType: "address",
                    name: "better",
                    type: "address",
               },
               {
                    internalType: "uint256",
                    name: "option",
                    type: "uint256",
               },
               {
                    internalType: "uint256",
                    name: "payment",
                    type: "uint256",
               },
               {
                    internalType: "uint256",
                    name: "balance",
                    type: "uint256",
               },
          ],
          stateMutability: "view",
          type: "function",
     },
     {
          inputs: [],
          name: "fixtureCount",
          outputs: [
               {
                    internalType: "uint256",
                    name: "",
                    type: "uint256",
               },
          ],
          stateMutability: "view",
          type: "function",
     },
     {
          inputs: [
               {
                    internalType: "uint256",
                    name: "",
                    type: "uint256",
               },
          ],
          name: "fixtures",
          outputs: [
               {
                    internalType: "uint256",
                    name: "id",
                    type: "uint256",
               },
               {
                    internalType: "string",
                    name: "side1",
                    type: "string",
               },
               {
                    internalType: "string",
                    name: "side2",
                    type: "string",
               },
               {
                    internalType: "string",
                    name: "sport",
                    type: "string",
               },
               {
                    internalType: "bool",
                    name: "results_announced",
                    type: "bool",
               },
               {
                    internalType: "uint256",
                    name: "result",
                    type: "uint256",
               },
               {
                    internalType: "uint256",
                    name: "side1pool",
                    type: "uint256",
               },
               {
                    internalType: "uint256",
                    name: "side2pool",
                    type: "uint256",
               },
               {
                    internalType: "bool",
                    name: "active",
                    type: "bool",
               },
          ],
          stateMutability: "view",
          type: "function",
     },
     {
          inputs: [],
          name: "getBalance",
          outputs: [
               {
                    internalType: "uint256",
                    name: "",
                    type: "uint256",
               },
          ],
          stateMutability: "view",
          type: "function",
     },
];
let account;
const connectMetamask = async () => {
     if (window.ethereum !== "undefined") {
          const accounts = await ethereum.request({
               method: "eth_requestAccounts",
          });
          account = accounts[0];
          document.getElementById("accountArea").innerHTML = account;
     }
};

//2- connect to smart contract
const connectContract = async () => {
     
     const Address = "0xFAF1232e69e6c2B2437d14baFc6832950478D76d";
     window.web3 = await new Web3(window.ethereum);
     window.contract = await new window.web3.eth.Contract(ABI, Address);
     document.getElementById("contractArea").innerHTML =
          "connected to smart contract";
};

//3-read data from smart contract
const getFixtures = async () => {
     const fixtureCount = await window.contract.methods.fixtureCount().call();
     console.log("Fixture Count is " + fixtureCount);
     var fixturesDiv = document.getElementById("fixtures");
     for (var i = 0; i < fixtureCount; i++) {
          var fixture = await window.contract.methods.fixtures(i).call();
          var fixtureDiv = document.createElement("div");
          fixtureDiv.innerHTML = `${fixture.side1} vs ${fixture.side2}`;
          fixturesDiv.append(fixtureDiv);
          var button1 = document.createElement("button");
          var button2 = document.createElement("button");
          button1.innerHTML = "BET";
          button2.innerHTML = "BET";
          async function placeBet(id, option) {
               await window.contract.methods.placeBet(id, option).send({
                    from: account,
                    value: 1000000000000000000,
               });
          }
          button1.addEventListener("click", () => {
               placeBet(i, 1);
          });
          button2.addEventListener("click", () => {
               placeBet(i, 2);
          });
          fixtureDiv.append(button1);
          fixtureDiv.append(button2);
     }
     ``;
};

const withdraw = async () => {
     await window.contract.methods.withdraw().call();
};
