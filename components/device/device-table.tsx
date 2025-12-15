"use client";

import Link from "next/link";
import { Device } from "@/types/device";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Battery, Signal, ArrowRight } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface DeviceTableProps {
  devices: Device[];
}

export function DeviceTable({ devices }: DeviceTableProps) {
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

  const getTypeLabel = (type: Device["type"]) => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  return (
    <div className="rounded-md border shadow-lg overflow-hidden backdrop-blur-sm bg-card/90 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-transparent -z-10"></div>
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="font-semibold">Device Name</TableHead>
            <TableHead className="font-semibold">Type</TableHead>
            <TableHead className="font-semibold">Status</TableHead>
            <TableHead className="font-semibold">Manufacturer</TableHead>
            <TableHead className="font-semibold">Location</TableHead>
            <TableHead className="font-semibold">Battery</TableHead>
            <TableHead className="font-semibold">Signal</TableHead>
            <TableHead className="font-semibold">Last Seen</TableHead>
            <TableHead className="font-semibold">Subscription</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {devices.length === 0 ? (
            <TableRow>
              <TableCell colSpan={10} className="text-center py-8 text-muted-foreground">
                No devices found
              </TableCell>
            </TableRow>
          ) : (
            devices.map((device, index) => {
              const lastSeenDate = new Date(device.lastSeen);
              const timeAgo = formatDistanceToNow(lastSeenDate, { addSuffix: true });

              return (
                <TableRow 
                  key={device.id} 
                  className="hover:bg-muted/50 transition-colors duration-200 cursor-pointer group animate-fade-in"
                  style={{ animationDelay: `${index * 0.03}s` }}
                >
                  <TableCell className="font-medium group-hover:text-primary transition-colors duration-200">
                    {device.name}
                  </TableCell>
                  <TableCell>
                    <span className="px-2 py-1 rounded-md bg-muted text-xs font-medium">
                      {getTypeLabel(device.type)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={getStatusVariant(device.status)}
                      className="group-hover:scale-105 transition-transform duration-200"
                    >
                      {device.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {device.metadata.manufacturer && device.metadata.model
                      ? `${device.metadata.manufacturer} ${device.metadata.model}`
                      : device.metadata.manufacturer || "-"}
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate">
                    {device.metadata.location?.address || "-"}
                  </TableCell>
                  <TableCell>
                    {device.batteryLevel !== undefined ? (
                      <div className="flex items-center gap-2">
                        <Battery className={`h-4 w-4 ${
                          device.batteryLevel > 50 ? "text-green-600" : 
                          device.batteryLevel > 20 ? "text-yellow-600" : 
                          "text-red-600"
                        }`} />
                        <div className="flex-1 max-w-[60px]">
                          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                            <div
                              className={`h-full transition-all duration-300 rounded-full ${
                                device.batteryLevel > 50 ? "bg-green-600" : 
                                device.batteryLevel > 20 ? "bg-yellow-600" : 
                                "bg-red-600"
                              }`}
                              style={{ width: `${device.batteryLevel}%` }}
                            ></div>
                          </div>
                        </div>
                        <span className="text-xs font-medium w-10 text-right">
                          {device.batteryLevel}%
                        </span>
                      </div>
                    ) : (
                      "-"
                    )}
                  </TableCell>
                  <TableCell>
                    {device.signalStrength !== undefined ? (
                      <div className="flex items-center gap-2">
                        <Signal className={`h-4 w-4 ${
                          device.signalStrength > 70 ? "text-green-600" : 
                          device.signalStrength > 40 ? "text-yellow-600" : 
                          "text-red-600"
                        }`} />
                        <div className="flex-1 max-w-[60px]">
                          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                            <div
                              className={`h-full transition-all duration-300 rounded-full ${
                                device.signalStrength > 70 ? "bg-green-600" : 
                                device.signalStrength > 40 ? "bg-yellow-600" : 
                                "bg-red-600"
                              }`}
                              style={{ width: `${device.signalStrength}%` }}
                            ></div>
                          </div>
                        </div>
                        <span className="text-xs font-medium w-10 text-right">
                          {device.signalStrength}%
                        </span>
                      </div>
                    ) : (
                      "-"
                    )}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {timeAgo}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        device.subscription.status === "active"
                          ? "success"
                          : device.subscription.status === "expired"
                          ? "destructive"
                          : "secondary"
                      }
                    >
                      {device.subscription.plan}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Link href={`/devices/${device.id}`}>
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-200" />
                    </Link>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
}

