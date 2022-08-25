import React, {useState,useEffect} from 'react';
import grapesjs from "grapesjs";
import gjsPresetWebpage from 'grapesjs-preset-webpage'
import './styles/main.scss'

function App() {
  const [editor,setEditor] = useState(null)

  useEffect(() => {
    loadGrapesjs()
  },[])

  const loadGrapesjs = () => {
    const editor = grapesjs.init({
      container:'#editor',
      plugins:[gjsPresetWebpage],
      pluginsOpts:{
        gjsPresetWebpage:{}
      }
    });
    setEditor(editor)
  }

  return (
    <div className="App">
     <div id="editor"></div>
    </div>
  );
}

export default App;
