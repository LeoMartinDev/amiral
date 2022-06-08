import { useEffect, useState } from 'react'
import { invoke } from '@tauri-apps/api/tauri'
import './App.css'

function App() {
  const [version, setVersion] = useState('Loading...')

  useEffect(() => {
    const init = async () => {
      const version = await invoke('get_version');
      const images = await invoke('list_images');

      setVersion(JSON.stringify(images, null, 2));
    };

    init();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>{ version }</p>
      </header>
    </div>
  )
}

export default App
