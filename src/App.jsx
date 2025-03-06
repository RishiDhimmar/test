import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Scene from './Components/Model'; // your component that uses useDrop

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Scene />
    </DndProvider>
  );
}

export default App;
