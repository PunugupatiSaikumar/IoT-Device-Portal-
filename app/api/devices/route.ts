import { NextRequest, NextResponse } from "next/server";
import { Device, DeviceFilters } from "@/types/device";
import { getDevicesData } from "@/lib/data/devices";

// Load devices from CSV dataset
let devices: Device[] | null = null;

function getDevices(): Device[] {
  if (!devices) {
    devices = getDevicesData();
  }
  return devices;
}

// GET /api/devices - Fetch all devices with optional filters
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const statusFilter = searchParams.get("status");
    const typeFilter = searchParams.get("type");
    const searchQuery = searchParams.get("search");

    const allDevices = getDevices();
    let filteredDevices = [...allDevices];

    // Filter by status
    if (statusFilter) {
      const statuses = statusFilter.split(",");
      filteredDevices = filteredDevices.filter((device) =>
        statuses.includes(device.status)
      );
    }

    // Filter by type
    if (typeFilter) {
      const types = typeFilter.split(",");
      filteredDevices = filteredDevices.filter((device) =>
        types.includes(device.type)
      );
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filteredDevices = filteredDevices.filter(
        (device) =>
          device.name.toLowerCase().includes(query) ||
          device.id.toLowerCase().includes(query) ||
          device.metadata.location?.address?.toLowerCase().includes(query) ||
          device.metadata.serialNumber?.toLowerCase().includes(query)
      );
    }

    return NextResponse.json({
      data: filteredDevices,
      message: "Devices fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching devices:", error);
    return NextResponse.json(
      { error: "Failed to fetch devices" },
      { status: 500 }
    );
  }
}

// POST /api/devices - Create a new device (optional, for future use)
export async function POST(request: NextRequest) {
  try {
    const allDevices = getDevices();
    const body = await request.json();
    const newDevice: Device = {
      id: String(allDevices.length + 1),
      ...body,
      lastSeen: new Date().toISOString(),
    };
    allDevices.push(newDevice);
    devices = allDevices; // Update cache

    return NextResponse.json(
      { data: newDevice, message: "Device created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating device:", error);
    return NextResponse.json(
      { error: "Failed to create device" },
      { status: 500 }
    );
  }
}

