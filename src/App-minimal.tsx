import React, { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);
  const [options, setOptions] = useState(['Pizza', 'Burger', 'Sushi']);
  const [winner, setWinner] = useState('');

  const spin = () => {
    const randomIndex = Math.floor(Math.random() * options.length);
    setWinner(options[randomIndex]);
  };

  return (
    <div style={{ 
      padding: '20px', 
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f0f8ff',
      minHeight: '100vh'
    }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>
        🎯 Decision Spinner
      </h1>
      
      <div style={{ 
        maxWidth: '800px', 
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '20px'
      }}>
        {/* Spinner */}
        <div style={{ 
          backgroundColor: 'white', 
          padding: '20px', 
          borderRadius: '10px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <div style={{
            width: '200px',
            height: '200px',
            border: '5px solid #333',
            borderRadius: '50%',
            margin: '20px auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px',
            fontWeight: 'bold',
            backgroundColor: '#e6f3ff'
          }}>
            {winner ? `🎉 ${winner}` : 'Click Spin!'}
          </div>
          
          <button 
            onClick={spin}
            style={{
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '5px',
              fontSize: '16px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Spin the Wheel!
          </button>
        </div>
        
        {/* Options */}
        <div style={{ 
          backgroundColor: 'white', 
          padding: '20px', 
          borderRadius: '10px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
          <h2>Options:</h2>
          {options.map((option, index) => (
            <div key={index} style={{
              padding: '10px',
              margin: '5px 0',
              backgroundColor: '#f8f9fa',
              borderRadius: '5px',
              border: '1px solid #dee2e6',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              {option}
              <button
                onClick={() => setOptions(options.filter((_, i) => i !== index))}
                style={{
                  backgroundColor: '#dc3545',
                  color: 'white',
                  border: 'none',
                  padding: '4px 8px',
                  borderRadius: '3px',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                Remove
              </button>
            </div>
          ))}
          
          <div style={{ marginTop: '20px' }}>
            <p>Counter test: {count}</p>
            <button 
              onClick={() => setCount(count + 1)}
              style={{
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              Count: {count}
            </button>
          </div>
        </div>
      </div>
      
      <div style={{ 
        textAlign: 'center', 
        marginTop: '40px',
        color: '#666'
      }}>
        <p>✅ React app is working!</p>
        <p>Server running on localhost:5173</p>
      </div>
    </div>
  );
}

export default App;