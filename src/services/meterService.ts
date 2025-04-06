import ajax from "./ajax";

export interface MeterData {
    time: number;
    reading: number;
  }

export interface MeterPostData {
  smartMeterId: string;
  electricityReadings: MeterData[];
}

const READER_API_BASE_URL = "/readings";

class meterService {
    async readMeter(meterId: string): Promise<MeterData[]> {
      const response = await ajax(`${READER_API_BASE_URL}/read/${meterId}`, "GET");
  
      if (Array.isArray(response)) {
        return response as MeterData[];
      } else {
        throw new Error("Invalid meter data format received");
      }
    }

    async storeMeter(meterPost: MeterPostData): Promise<MeterPostData> {
      const response = await ajax(`${READER_API_BASE_URL}/store`, "POST", meterPost);
      if (response) {
        return response as MeterPostData;
      } else {
        throw new Error("Meter data did not store");
      }
    }
  }

export default new meterService();