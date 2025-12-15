"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Device } from "@/types/device";
import { fetchDeviceById } from "@/lib/api";
import { Header } from "@/components/layout/header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ArrowLeft,
  Battery,
  Signal,
  MapPin,
  Calendar,
  Package,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { formatDistanceToNow, format } from "date-fns";

export default function DeviceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const deviceId = params.id as string;
  const [device, setDevice] = useState<Device | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadDevice() {
      if (!deviceId) return;

      setLoading(true);
      setError(null);
      try {
        const data = await fetchDeviceById(deviceId);
        if (data) {
          setDevice(data);
        } else {
          setError("Device not found");
        }
      } catch (err) {
        setError("Failed to load device details");
        console.error("Failed to load device:", err);
      } finally {
        setLoading(false);
      }
    }

    loadDevice();
  }, [deviceId]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container py-8">
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        </main>
      </div>
    );
  }

  if (error || !device) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container py-8">
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <AlertCircle className="h-12 w-12 text-destructive mb-4" />
              <p className="text-lg font-medium mb-2">{error || "Device not found"}</p>
              <Button onClick={() => router.push("/devices")} variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Devices
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  const getStatusVariant = (status: Device["status"]) => {
    switch (status) {
      case "online":
        return "success";
      case "offline":
        return "secondary";
      case "maintenance":
        return "warning";
      case "error":
        return "destructive";
      default:
        return "default";
    }
  };

  const lastSeenDate = new Date(device.lastSeen);
  const timeAgo = formatDistanceToNow(lastSeenDate, { addSuffix: true });
  const formattedLastSeen = format(lastSeenDate, "PPpp");

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container py-8">
        <div className="space-y-6">
          {/* Back Button */}
          <Button onClick={() => router.push("/devices")} variant="ghost">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Devices
          </Button>

          {/* Device Header */}
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{device.name}</h1>
              <p className="text-muted-foreground mt-2">Device ID: {device.id}</p>
            </div>
            <Badge variant={getStatusVariant(device.status)} className="text-sm px-3 py-1">
              {device.status}
            </Badge>
          </div>

          {/* Quick Stats */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Battery Level</CardTitle>
                <Battery className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {device.batteryLevel !== undefined ? `${device.batteryLevel}%` : "N/A"}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Signal Strength</CardTitle>
                <Signal className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {device.signalStrength !== undefined ? `${device.signalStrength}%` : "N/A"}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Last Seen</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-sm font-medium">{timeAgo}</div>
                <p className="text-xs text-muted-foreground">{formattedLastSeen}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Device Type</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold capitalize">{device.type}</div>
              </CardContent>
            </Card>
          </div>

          {/* Device Metadata */}
          <Card>
            <CardHeader>
              <CardTitle>Device Metadata</CardTitle>
              <CardDescription>Hardware and installation information</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableBody>
                  {device.metadata.manufacturer && (
                    <TableRow>
                      <TableHead className="w-[200px]">Manufacturer</TableHead>
                      <TableCell>{device.metadata.manufacturer}</TableCell>
                    </TableRow>
                  )}
                  {device.metadata.model && (
                    <TableRow>
                      <TableHead>Model</TableHead>
                      <TableCell>{device.metadata.model}</TableCell>
                    </TableRow>
                  )}
                  {device.metadata.serialNumber && (
                    <TableRow>
                      <TableHead>Serial Number</TableHead>
                      <TableCell className="font-mono">{device.metadata.serialNumber}</TableCell>
                    </TableRow>
                  )}
                  {device.metadata.firmwareVersion && (
                    <TableRow>
                      <TableHead>Firmware Version</TableHead>
                      <TableCell>{device.metadata.firmwareVersion}</TableCell>
                    </TableRow>
                  )}
                  {device.metadata.location && (
                    <>
                      <TableRow>
                        <TableHead>Location</TableHead>
                        <TableCell>
                          <div className="flex items-start gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                            <div>
                              {device.metadata.location.address && (
                                <div>{device.metadata.location.address}</div>
                              )}
                              <div className="text-sm text-muted-foreground">
                                {device.metadata.location.latitude.toFixed(6)},{" "}
                                {device.metadata.location.longitude.toFixed(6)}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    </>
                  )}
                  {device.metadata.installedDate && (
                    <TableRow>
                      <TableHead>Installed Date</TableHead>
                      <TableCell>
                        {format(new Date(device.metadata.installedDate), "PP")}
                      </TableCell>
                    </TableRow>
                  )}
                  {device.metadata.lastMaintenance && (
                    <TableRow>
                      <TableHead>Last Maintenance</TableHead>
                      <TableCell>
                        {format(new Date(device.metadata.lastMaintenance), "PP")}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Subscription Details */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Subscription Details</CardTitle>
                  <CardDescription>Current subscription plan and features</CardDescription>
                </div>
                <Badge
                  variant={
                    device.subscription.status === "active"
                      ? "success"
                      : device.subscription.status === "expired"
                      ? "destructive"
                      : "secondary"
                  }
                >
                  {device.subscription.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableHead className="w-[200px]">Plan</TableHead>
                      <TableCell className="font-medium">{device.subscription.plan}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableHead>Start Date</TableHead>
                      <TableCell>
                        {format(new Date(device.subscription.startDate), "PP")}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableHead>End Date</TableHead>
                      <TableCell>
                        {format(new Date(device.subscription.endDate), "PP")}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableHead>Subscription ID</TableHead>
                      <TableCell className="font-mono">{device.subscription.id}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>

                {device.subscription.features.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium mb-2">Included Features</h4>
                    <div className="flex flex-wrap gap-2">
                      {device.subscription.features.map((feature, index) => (
                        <Badge key={index} variant="outline">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

