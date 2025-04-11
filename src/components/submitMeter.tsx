import React, { useState } from 'react';
import readerService from '../services/meterService';
import { MeterPostData } from '../services/meterService';
import { meterIds } from '../constants';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


function SubmitMeter() {
  const [selectedMeter, setSelectedMeter] = useState<string>('');
  const [time, setTime] = useState<Date | null>(new Date());
  const [reading, setReading] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const isNumeric = (value: string) => !isNaN(Number(value)) && value.trim() !== '';

  const isValidTime = (value: Date | null) => value instanceof Date && !isNaN(value.getTime());

  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.preventDefault();

    if (!time || !isValidTime(time)) {
      setErrorMessage("Please enter a valid date for Time.");
      return;
    }

    if (!reading || !isNumeric(reading)) {
      setErrorMessage("Please enter a valid numeric value for Reading.");
      setReading('');
      return;
    }

    const epochTime = time.getTime();

    const data: MeterPostData = {
      smartMeterId: selectedMeter,
      electricityReadings: [{
        time: Math.floor(epochTime / 1000),
        reading: parseFloat(reading)
      }]
    };

    try {
      const storedData = await readerService.storeMeter(data);
      if (storedData) {
        setSuccessMessage('Meter data posted successfully!');
        setTime(new Date());
        setReading('');
        setErrorMessage('');
      }
    } catch (error) {
      console.error('❌ Error posting meter data:', error);
      setErrorMessage('An error occurred while posting meter data.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">Submit a Meter</h2>

      {successMessage && (
        <div className="bg-green-100 text-green-800 p-2 rounded mb-4">{successMessage}</div>
      )}
      {errorMessage && (
        <div className="bg-red-100 text-red-800 p-2 rounded mb-4">{errorMessage}</div>
      )}

      <select
        value={selectedMeter}
        onChange={(e) => setSelectedMeter(e.target.value)}
      >
        <option value="">-- Select Meter --</option>
        {Object.entries(meterIds).map(([key, id]) => (
          <option key={key} value={id}>
            {key}
          </option>
        ))}
      </select>

      {selectedMeter && (
        <div className="flex flex-col space-y-4 w-full max-w-md mt-4">
          <div className="flex justify-between items-center">
            <label className="text-left w-1/2">Time</label>
            <DatePicker
              selected={time}
              onChange={(date) => setTime(date)}
              showTimeSelect
              dateFormat="dd/MM/yyyy, HH:mm:ss"
              timeFormat="HH:mm:ss"
              className="bg-white text-black border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex justify-between items-center">
            <label className="text-left w-1/2">Reading</label>
            <input
              type="text"
              value={reading}
              onChange={(e) => setReading(e.target.value)}
              className="bg-white text-black border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-600 text-white rounded px-4 py-2"
            disabled={!selectedMeter || !time || !reading }
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
}

export default SubmitMeter;
