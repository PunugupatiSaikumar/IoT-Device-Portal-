import { Device, DeviceStatus, DeviceType } from "@/types/device";
import fs from "fs";
import path from "path";
import Papa from "papaparse";

// CSV row interface
interface CSVRow {
  query_id: string;
  sensor_type: string;
  data_size_bytes: string;
  quantity: string;
  duration: string;
  energy_consumption: string;
  data_yield: string;
  hypervolume_value: string;
  transmission_efficiency: string;
}

// Map sensor type to device type
function mapSensorTypeToDeviceType(sensorType: string): DeviceType {
  const lower = sensorType.toLowerCase();
  if (lower.includes("gateway") || lower.includes("hub")) {
    return "gateway";
  }
  if (lower.includes("actuator") || lower.includes("controller")) {
    return lower.includes("actuator") ? "actuator" : "controller";
  }
  return "sensor"; // Default
}

// Generate status based on energy consumption and efficiency
function generateStatus(energyConsumption: number, transmissionEfficiency: number): DeviceStatus {
  if (energyConsumption > 0.8 || transmissionEfficiency < 0.5) {
    return Math.random() > 0.7 ? "error" : "maintenance";
  }
  if (energyConsumption > 0.6 || transmissionEfficiency < 0.7) {
    return Math.random() > 0.8 ? "offline" : "online";
  }
  return Math.random() > 0.1 ? "online" : "offline";
}

// Generate battery level
function generateBatteryLevel(energyConsumption: number): number {
  const base = 100 - (energyConsumption * 50);
  return Math.max(10, Math.min(100, Math.round(base + (Math.random() * 20 - 10))));
}

// Generate signal strength
function generateSignalStrength(transmissionEfficiency: number): number {
  const base = transmissionEfficiency * 100;
  return Math.max(30, Math.min(100, Math.round(base + (Math.random() * 20 - 10))));
}

// Convert CSV row to Device
function csvRowToDevice(row: CSVRow, index: number): Device {
  const sensorType = row.sensor_type;
  const energyConsumption = parseFloat(row.energy_consumption) || 0;
  const transmissionEfficiency = parseFloat(row.transmission_efficiency) || 0;
  const duration = parseInt(row.duration) || 0;
  
  const deviceType = mapSensorTypeToDeviceType(sensorType);
  const status = generateStatus(energyConsumption, transmissionEfficiency);
  const batteryLevel = generateBatteryLevel(energyConsumption);
  const signalStrength = generateSignalStrength(transmissionEfficiency);
  
  // Generate last seen time
  const hoursAgo = status === "online" 
    ? Math.random() * 2 
    : status === "offline" 
    ? 2 + Math.random() * 10 
    : 24 + Math.random() * 48;
  const lastSeen = new Date(Date.now() - hoursAgo * 60 * 60 * 1000).toISOString();
  
  // Generate location
  const locations = [
    { lat: 40.7128, lng: -74.0060, addr: "123 Main St, New York, NY 10001" },
    { lat: 40.7589, lng: -73.9851, addr: "456 Broadway, New York, NY 10013" },
    { lat: 40.7505, lng: -73.9934, addr: "789 Park Ave, New York, NY 10021" },
    { lat: 40.7614, lng: -73.9776, addr: "321 5th Ave, New York, NY 10016" },
    { lat: 40.7282, lng: -73.9942, addr: "555 Research Blvd, New York, NY 10012" },
  ];
  const location = locations[index % locations.length];
  
  // Generate subscription
  const plans = ["Basic", "Professional", "Enterprise"];
  const planIndex = transmissionEfficiency > 0.8 ? 2 : transmissionEfficiency > 0.6 ? 1 : 0;
  const plan = plans[planIndex];
  
  return {
    id: row.query_id,
    name: `${sensorType} Device #${row.query_id}`,
    type: deviceType,
    status: status,
    lastSeen: lastSeen,
    batteryLevel: batteryLevel,
    signalStrength: signalStrength,
    metadata: {
      manufacturer: `${sensorType} Solutions Inc.`,
      model: `${sensorType.replace(/\s+/g, "")}-${row.query_id}`,
      firmwareVersion: `v${(Math.random() * 3 + 1).toFixed(1)}.${Math.floor(Math.random() * 10)}.${Math.floor(Math.random() * 10)}`,
      serialNumber: `${sensorType.substring(0, 2).toUpperCase()}${row.query_id.padStart(6, "0")}`,
      location: {
        latitude: location.lat + (Math.random() * 0.01 - 0.005),
        longitude: location.lng + (Math.random() * 0.01 - 0.005),
        address: location.addr,
      },
      installedDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      lastMaintenance: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    },
    subscription: {
      id: `sub-${row.query_id.padStart(6, "0")}`,
      plan: plan,
      status: Math.random() > 0.1 ? "active" : "expired",
      startDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      endDate: new Date(Date.now() + Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      features: plan === "Enterprise" 
        ? ["Real-time monitoring", "Data analytics", "Priority support", "Custom integrations"]
        : plan === "Professional"
        ? ["Real-time monitoring", "Data analytics"]
        : ["Real-time monitoring"],
    },
  };
}

// Load devices from CSV file
export function loadDevicesFromCSV(): Device[] {
  try {
    const csvPath = path.join(process.cwd(), "cde_ipaas_dataset.csv");
    const csvContent = fs.readFileSync(csvPath, "utf-8");
    
    // Parse CSV using PapaParse
    const parseResult = Papa.parse<CSVRow>(csvContent, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: false,
    });
    
    const rows = parseResult.data;
    const devices = rows.map((row, index) => csvRowToDevice(row, index));
    return devices;
  } catch (error) {
    console.error("Error loading CSV:", error);
    throw error;
  }
}

