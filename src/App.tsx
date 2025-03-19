import { useState } from 'react';
import './App.css';
import HeroSection from './components/HeroSection';
import Navigation from './components/Navigation';
import { AssistantButton } from './components/navigation/AssistantButton';

function App() {
  const [showAssistant, setShowAssistant] = useState(false);

  return (
    <>
      <Navigation />
      <HeroSection />
      <AssistantButton 
        showAssistant={showAssistant} 
        onToggleAssistant={() => setShowAssistant(!showAssistant)} 
      />
    </>
  )
}

export default App
