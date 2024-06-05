import React, { useState } from 'react';
import AnalysisService from '../../services/AnalysisService';

const TextAnalysis = () => {
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);

  const handleAnalyze = async () => {
    try {
      const response = await AnalysisService.analyzeText(text);
      setResult(response.data);
    } catch (error) {
      alert('Analysis failed');
    }
  };

  return (
    <div>
      <h2>Text Analysis</h2>
      <textarea placeholder="Enter text" onChange={(e) => setText(e.target.value)} />
      <button onClick={handleAnalyze}>Analyze</button>
      {result && <div>Result: {result}</div>}
    </div>
  );
};

export default TextAnalysis;
