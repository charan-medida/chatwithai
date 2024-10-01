import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { ScaleLoader } from 'react-spinners';
import './App.css';

function App() {

  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/generate', { prompt });
      setResponse(res.data.response);
    } catch (error) {
      console.error('Error calling the server:', error);
    }
    finally {
      setLoading(false);
    }
  };



  return (
    <div className="App">
      <img className="fullscreen-image" src="./images/ae.jpg" alt='' />
      <h2 style={{ textAlign: 'left' }}>Chat With AI</h2><br/>
      <form onSubmit={handleSubmit}>
        <input className='inputdesign'
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt"
          required
        /><br/><br/>
        <button className="btn btn-primary" type="submit">Send</button>
      </form><br/>

      {loading && (
        <center>
          <ScaleLoader color={"#123abc"} loading={loading} />
        </center>
      )}
      
      {response && (
        <center><div>
          <h2>Response from AI:</h2>
        
          <div className="response-box" dangerouslySetInnerHTML={{ __html: response }} />
          
        </div></center>
      )}
    </div>
  );
}

export default App;
