import React, { useState } from 'react';
import readerService from '../services/meterService';
import { MeterData } from '../services/meterService';
import { meterIds } from '../constants';

function SubmitMeter() {
  const [selectedMeter, setSelectedMeter] = useState<string>('');
  const [meterData, setMeterData] = useState<MeterData[] | null>(null);

  const handleMeterChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const meterId = event.target.value;
    setSelectedMeter(meterId);

    if (meterId) {
      try {
        const data = await readerService.readMeter(meterId);
        setMeterData(data);
      } catch (error) {
        console.error("Error fetching meter data:", error);
        setMeterData(null);
      }
    }
  };

  return (
    <div>
      <h2>Submit a Meter</h2>
      <select value={selectedMeter} onChange={handleMeterChange}>
        <option value="">-- Select Meter --</option>
        {Object.entries(meterIds).map(([key, id]) => (
          <option key={key} value={id}>
            {key}
          </option>
        ))}
      </select> <br />
      {selectedMeter && (
        <div>
            <strong>Time:</strong>
            <input></input><br/>
            <strong>Reading:</strong>
            <input></input>
        </div>)}
    </div>
  );
}

export default SubmitMeter;
