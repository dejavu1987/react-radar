import { useState } from 'react';
import './App.css';
import Radar from './components/Radar/Radar';
import elements from './data/elements.json';
import segments from './data/segments.json';
import rings from './data/rings.json';
function App() {
  const [radarConfig, setRadarConfig] = useState({
    totalAngle: Math.PI * 2,
    padding: 20,
    minPlotRadius: 120,
  });
  const [radarSegments] = useState(segments);
  const [radarRings] = useState(rings);
  const [radarElements] = useState(elements);
  const handleTotalAngleChange = (e) => {
    setRadarConfig({ ...radarConfig, totalAngle: parseFloat(e.target.value) });
  };
  const handleMinPlotRadius = (e) => {
    setRadarConfig({ ...radarConfig, minPlotRadius: parseInt(e.target.value) });
  };
  const handlePaddingChange = (e) => {
    setRadarConfig({
      ...radarConfig,
      padding: parseInt(e.target.value),
    });
  };
  return (
    <div className="App">
      <section>
        <fieldset>
          <legend>Radar Config</legend>
          <div className="configs">
            <div>
              <label htmlFor="totalAngle">Total Angle</label>
              <select id="totalAngle" onChange={handleTotalAngleChange}>
                <option value={Math.PI * 2}>Full Circle</option>
                <option value={Math.PI}>Half circle</option>
                <option value={Math.PI / 2}>Quarter of a circle</option>
              </select>
            </div>
            <div>
              <label htmlFor="minPlotRadius">Minimum plot radius</label>
              <input
                id="minPlotRadius"
                onChange={handleMinPlotRadius}
                type="range"
                min="50"
                max="250"
              />
            </div>
            <div>
              <label htmlFor="outwardPadding">Outer Padding</label>
              <input
                id="outwardPadding"
                onChange={handlePaddingChange}
                type="range"
                min="0"
                max="50"
              />
            </div>
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
