import { Device, ApiResponse, DeviceFilters } from "@/types/device";

// Use Next.js API routes by default, or external API if configured
const getApiBaseUrl = () => {
  // If external API URL is set, use it
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }
  // Otherwise, use Next.js API routes (same origin)
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  return "http://localhost:3000";
};

const API_BASE_URL = getApiBaseUrl();
const USE_NEXTJS_API = !process.env.NEXT_PUBLIC_API_URL; // Use /api/devices if no external API

/**
 * Fetches all devices with optional filters
 */
export async function fetchDevices(filters?: DeviceFilters): Promise<Device[]> {
  try {
    const params = new URLSearchParams();
    
    if (filters?.status && filters.status.length > 0) {
      params.append("status", filters.status.join(","));
    }
    
    if (filters?.type && filters.type.length > 0) {
      params.append("type", filters.type.join(","));
    }
    
    if (filters?.search) {
      params.append("search", filters.search);
    }

    // Use /api/devices for Next.js API routes, or /devices for external APIs
    const endpoint = USE_NEXTJS_API ? '/api/devices' : '/devices';
    const url = `${API_BASE_URL}${endpoint}${params.toString() ? `?${params.toString()}` : ""}`;
    
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch devices: ${response.statusText}`);
    }

    const result: ApiResponse<Device[]> = await response.json();
    return result.data || [];
  } catch (error) {
    console.error("Error fetching devices:", error);
    throw error;
  }
}

/**
 * Fetches a single device by ID
 */
export async function fetchDeviceById(id: string): Promise<Device | null> {
  try {
    // Use /api/devices for Next.js API routes, or /devices for external APIs
    const endpoint = USE_NEXTJS_API ? '/api/devices' : '/devices';
    const response = await fetch(`${API_BASE_URL}${endpoint}/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`Failed to fetch device: ${response.statusText}`);
    }

    const result: ApiResponse<Device> = await response.json();
    return result.data || null;
  } catch (error) {
    console.error("Error fetching device:", error);
    throw error;
  }
}

