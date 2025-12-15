import { Device } from "@/types/device";
import { loadDevicesFromCSV } from "./csv-loader";

// Load devices from CSV dataset
let devicesDataCache: Device[] | null = null;

// Load devices from CSV (cached)
export function getDevicesData(): Device[] {
  if (!devicesDataCache) {
    try {
      devicesDataCache = loadDevicesFromCSV();
    } catch (error) {
      console.error("Failed to load CSV, using empty array:", error);
      devicesDataCache = [];
    }
  }
  return devicesDataCache;
}

// Export for backward compatibility
export const devicesData = getDevicesData();

