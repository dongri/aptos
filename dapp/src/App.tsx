import React, {useEffect, useState} from 'react';
import './App.css';

import { Types, AptosClient } from 'aptos';

const client = new AptosClient('https://fullnode.devnet.aptoslabs.com/v1');
const moduleAddress = '0xe651aa3a396ecc2cb787a45e4ab1facd4918b2cf1f789f41c7514e3654f692a1';

function App() {

  const [address, setAddress] = useState<string | null>(null);
  const [accountData, setAccountData] = React.useState<Types.AccountData | null>(null);
  const [hasModule, setHasModule] = React.useState<boolean | null>(true);

  const [isConnected, setIsConnected] = React.useState(false);
  const [message, setMessage] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState<string | null>(null);

  useEffect(() => {
    const init = async () => {
      const isConnected = await window.aptos.isConnected();
      setIsConnected(isConnected);
      if (isConnected) {
        window.aptos.account().then(async (data : {address: string}) => {
          setAddress(data.address);
          getMessage(data.address);
          loadAccountData(data.address);
        });
        loadModule();
      }
    }
    init();
    // eslint-disable-next-line
  }, []);

  const loadModule = async () => {
    const modules = await client.getAccountModules(moduleAddress);
    setHasModule(modules.some((m) => m.abi?.name === 'message'));
  }

  const loadAccountData = async (address: string) => {
    await client.getAccount(address).then(setAccountData);
  }

  const walletConnect = async () => {
    const result = await window.aptos.connect();
    if (result) {
      window.location.reload();
    }
  }
  const walletDisConnect = async () => {
    await window.aptos.disconnect();
    window.location.reload();
  }
  
  const getMessage = async (address: string) => {
    const resources = await client.getAccountResources(address);
    const resourceType = `${moduleAddress}::message::MessageHolder`;
    const resource = resources.find((r) => r.type === resourceType);
    const data = resource?.data as {message: string} | undefined;
    const chainMessage = data?.message as string;
    let newMessage = message;
    if (newMessage !== null) {
      newMessage += '\n↓\n' + chainMessage;
    } else {
      newMessage = chainMessage;
    }
    setMessage(newMessage);
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const inputMessage = state.inputMessage;
    const transaction = {
      type: "entry_function_payload",
      function: `${moduleAddress}::message::set_message`,
      arguments: [inputMessage],
      type_arguments: [],
    };

    try {
      window.aptos.signAndSubmitTransaction(transaction).then(async({hash}: any) => {
        setLoading('loading...');
        setState(({ ...state, inputMessage: '' }));
        await client.waitForTransaction(hash, { checkSuccess: true });
        loadAccountData(address as string);
        getMessage(address as string);
        setLoading('');
      });
    } catch (e) {
      console.error(e);
    } finally {
    }
  };

  interface Form {
    inputMessage: string;
  }

  const [state, setState] = useState<Form>({
    inputMessage: '',
  });

  const handleChange = async (event: any) => {
    if (event.target.type === "number") {
      setState({ ...state, [event.target.name]: Number(event.target.value) });
    } else {
      setState({ ...state, [event.target.name]: event.target.value });
    }
  };

  return (
    <div className='content'>
      {!hasModule && (
        <div className='module'>
          module not found, publish it with: aptos move pulish
        </div>
      )}
      <div className='account'>
        {isConnected ? (
          <div>
            <p><code>ACOUNT: { address }</code></p>
            <p><code>SEQUENCE NUMBER: { accountData?.sequence_number }</code></p>
            <button onClick={walletDisConnect}>Disconnect</button>
          </div>
        ) : (
          <div>
            <button onClick={walletConnect}>Connect Wallet</button>
          </div>
        )}
      </div>
      {isConnected ? (
        <div>
          <p>On chian Message</p>
          <div className='message'>
            <pre>{ message }</pre>
          </div>
          <form onSubmit={handleSubmit}>
            <input type="text" name="inputMessage" placeholder="Enter message" value={state.inputMessage} onChange={handleChange} />
            <input type="submit" value='change message'/>
          </form>
          <div className='loading'>{loading}</div>
        </div>
      ) : (
        <div>
          <p>Connect wallet to change message</p>
        </div>
      )}
    </div>
  );
}

export default App;
