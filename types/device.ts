export type DeviceStatus = "online" | "offline" | "maintenance" | "error";

export type DeviceType = "sensor" | "actuator" | "gateway" | "controller";

export interface DeviceMetadata {
  manufacturer?: string;
  model?: string;
  firmwareVersion?: string;
  serialNumber?: string;
  location?: {
    latitude: number;
    longitude: number;
    address?: string;
  };
  installedDate?: string;
  lastMaintenance?: string;
}

export interface Subscription {
  id: string;
  plan: string;
  status: "active" | "expired" | "pending" | "cancelled";
  startDate: string;
  endDate: string;
  features: string[];
}

export interface Device {
  id: string;
  name: string;
  type: DeviceType;
  status: DeviceStatus;
  metadata: DeviceMetadata;
  subscription: Subscription;
  lastSeen: string;
  batteryLevel?: number;
  signalStrength?: number;
}

export interface DeviceFilters {
  status?: DeviceStatus[];
  type?: DeviceType[];
  search?: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  error?: string;
}

