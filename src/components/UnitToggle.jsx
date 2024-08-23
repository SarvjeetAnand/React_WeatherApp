import React from 'react';

export default function UnitToggle({ unit, setUnit }){
  return (
    <div className="unit-toggle">
      <label>
        <input
          type="radio"
          name="unit"
          value="metric"
          checked={unit === 'metric'}
          onChange={() => setUnit('metric')}
        />
        °C
      </label>
      <label>
        <input
          type="radio"
          name="unit"
          value="imperial"
          checked={unit === 'imperial'}
          onChange={() => setUnit('imperial')}
        />
        °F
      </label>
    </div>
  );
};
