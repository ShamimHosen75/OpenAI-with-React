import { Configuration, OpenAIApi } from 'openai';
import { useState } from 'react';
import './App.css';

function App() {
  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  });
  const openai = new OpenAIApi (configuration);

  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState("");

  const handleClick = async () => {
    setLoading(true);
    try{
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        temperature: 0.5,
        max_tokens: 100,
      });
      setResult(response.data.choices[0].text);
    }catch(error){
      console.error(error);
    }
    setLoading(false);
  };


  return (
    <div className="main">
      <div className="w-2/4 mx-auto">

        <textarea 
        type='text'
        value={prompt}
        onChange={(e) => setPrompt (e.target.value)}
        placeholder="Write your question.." 
        className="textarea">

        </textarea>

        <button
        onClick={handleClick}
        disabled={loading || prompt.length === 0}
        className="btn">
        {loading ? "Generating..." : "Generate"}
        </button>
        
        <pre className="result">{result}</pre>
      </div>
    </div>
  );
}

export default App;
