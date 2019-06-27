import React from 'react';
import './App.css';

// import EndSection from './components/EndSection/EndSection'
import QuestPool from './components/QuestPool/QuestPool'

function App() {
  return (
    <div className="app">
        <QuestPool />
       {/* <EndSection 
          questId={1}
        /> */}
    </div>
  );
}

export default App;
