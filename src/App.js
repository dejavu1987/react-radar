import { useState } from 'react';
import './App.css';
import Radar from './components/Radar/Radar';

function App() {
  const [radarConfig, setRadarConfig] = useState({
    totalAngle: Math.PI * 2,
    padding: 20,
    minPlotRadius: 120,
  });
  const [radarSegments] = useState([
    { label: 'Fruit', slug: 'fruit', color: '#fa9' },
    { label: 'Vegetable', slug: 'vegetable', color: '#ad0' },
    {
      label: 'Framework',
      slug: 'framework',
      color: '#7dc',
    },
    { label: 'Technology', slug: 'technology', color: '#caf' },
  ]);
  const [radarRings] = useState([
    { label: 'High', slug: 'high' },
    { label: 'Medium', slug: 'medium' },
    { label: 'Low', slug: 'low' },
  ]);
  const [radarElements] = useState([
    { label: 'Apple', segment: 'technology', ring: 'high' },
    { label: 'Red Hat', segment: 'technology', ring: 'high' },
  ]);
  const handleTotalAngleChange = (e) => {
    setRadarConfig({ ...radarConfig, totalAngle: parseFloat(e.target.value) });
  };
  return (
    <div className="App">
      <section>
        <fieldset>
          <legend>Radar Config</legend>
          <div>
            <select onChange={handleTotalAngleChange}>
              <option value={Math.PI * 2}>Full</option>
              <option value={Math.PI}>Half</option>
              <option value={Math.PI / 2}>Quarter</option>
            </select>
          </div>
        </fieldset>
      </section>
      <Radar
        options={radarConfig}
        segments={radarSegments}
        rings={radarRings}
        elements={radarElements}
      ></Radar>
    </div>
  );
}

export default App;
