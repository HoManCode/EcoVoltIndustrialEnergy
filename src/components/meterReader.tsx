import React, { useState } from 'react';
import readerService from '../services/meterService';
import { MeterData } from '../services/meterService';

function MeterReader() {
  const [selectedMeter, setSelectedMeter] = useState<string>('');
  const [meterData, setMeterData] = useState<MeterData[] | null>(null);

  const meterIds = {
    METER0: "smart-meter-0",
    METER1: "smart-meter-1",
    METER2: "smart-meter-2",
    METER3: "smart-meter-3",
    METER4: "smart-meter-4",
  };

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
      <h2>Select a Meter</h2>
      <select value={selectedMeter} onChange={handleMeterChange}>
        <option value="">-- Select Meter --</option>
        {Object.entries(meterIds).map(([key, id]) => (
          <option key={key} value={id}>
            {key}
          </option>
        ))}
      </select>

      {meterData && (
        <div>
          <h3>Meter Readings</h3>
          <ul>
            {meterData.map((reading, index) => (
              <li key={index}>
                <strong>Time:</strong> {new Date(reading.time * 1000).toLocaleString()} <br />
                <strong>Reading:</strong> {reading.reading.toFixed(4)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default MeterReader;
