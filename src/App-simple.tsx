import React, { useState } from 'react';

function App() {
  const [options, setOptions] = useState(['Pizza', 'Burger', 'Sushi', 'Tacos']);
  const [newOption, setNewOption] = useState('');
  const [winner, setWinner] = useState('');
  const [isSpinning, setIsSpinning] = useState(false);

  const addOption = () => {
    if (newOption.trim() && !options.includes(newOption.trim())) {
      setOptions([...options, newOption.trim()]);
      setNewOption('');
    }
  };

  const removeOption = (index: number) => {
    if (options.length > 2) {
      setOptions(options.filter((_, i) => i !== index));
    }
  };

  const spin = () => {
    if (options.length < 2 || isSpinning) return;
    
    setIsSpinning(true);
    setWinner('');
    
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * options.length);
      setWinner(options[randomIndex]);
      setIsSpinning(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          🎯 Decision Spinner
        </h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Spinner Section */}
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="w-80 h-80 mx-auto mb-6 relative">
              {/* Simple Spinner Visualization */}
              <div 
                className={`w-full h-full rounded-full border-8 border-gray-300 relative transition-transform duration-3000 ease-out ${
                  isSpinning ? 'animate-spin' : ''
                }`}
                style={{
                  background: `conic-gradient(${options.map((_, i) => 
                    `hsl(${(i * 360) / options.length}, 70%, 60%) ${(i * 100) / options.length}% ${((i + 1) * 100) / options.length}%`
                  ).join(', ')})`
                }}
              >
                {/* Options Display */}
                {options.map((option, index) => (
                  <div
                    key={index}
                    className="absolute text-white font-bold text-sm"
                    style={{
                      top: '50%',
                      left: '50%',
                      transform: `rotate(${(index * 360) / options.length}deg) translateY(-120px) rotate(-${(index * 360) / options.length}deg)`,
                      transformOrigin: '0 120px'
                    }}
                  >
                    {option}
                  </div>
                ))}
                
                {/* Center dot */}
                <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-gray-800 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                
                {/* Pointer */}
                <div className="absolute top-0 left-1/2 w-0 h-0 border-l-4 border-r-4 border-b-8 border-transparent border-b-red-500 transform -translate-x-1/2 -translate-y-2"></div>
              </div>
            </div>
            
            <button
              onClick={spin}
              disabled={isSpinning || options.length < 2}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSpinning ? 'Spinning...' : 'Spin the Wheel!'}
            </button>
            
            {winner && (
              <div className="mt-6 p-4 bg-green-100 border border-green-300 rounded-lg">
                <h3 className="text-xl font-bold text-green-800">🎉 Winner: {winner}!</h3>
              </div>
            )}
          </div>
          
          {/* Options Management */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">Manage Options</h2>
            
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={newOption}
                onChange={(e) => setNewOption(e.target.value)}
                placeholder="Enter new option..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onKeyPress={(e) => e.key === 'Enter' && addOption()}
              />
              <button
                onClick={addOption}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
              >
                Add
              </button>
            </div>
            
            <div className="space-y-2">
              {options.map((option, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span>{option}</span>
                  <button
                    onClick={() => removeOption(index)}
                    disabled={options.length <= 2}
                    className="text-red-500 hover:text-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
            
            <p className="text-sm text-gray-600 mt-4">
              {options.length} options ({options.length >= 2 ? 'Ready to spin!' : 'Need at least 2 options'})
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;