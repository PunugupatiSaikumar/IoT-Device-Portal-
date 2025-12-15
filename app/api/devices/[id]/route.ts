import { NextRequest, NextResponse } from "next/server";
import { getDevicesData } from "@/lib/data/devices";

// GET /api/devices/[id] - Fetch a single device by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const devices = getDevicesData();
    const device = devices.find((d) => d.id === params.id);

    if (!device) {
      return NextResponse.json(
        { error: "Device not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      data: device,
      message: "Device fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching device:", error);
    return NextResponse.json(
      { error: "Failed to fetch device" },
      { status: 500 }
    );
  }
}

