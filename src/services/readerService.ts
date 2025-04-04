import ajax from "./ajax";

export interface MeterReading {
    time: number;
    reading: number;
  }

const READER_API_BASE_URL = "/readings/";

class Reader {
    async readMeter(meterId: string): Promise<MeterReading[]> {
      const response = await ajax(`${READER_API_BASE_URL}/read/${meterId}`, "GET");
  
      if (Array.isArray(response)) {
        return response as MeterReading[];
      } else {
        throw new Error("Invalid meter data format received");
      }
    }
  }

export default new Reader();