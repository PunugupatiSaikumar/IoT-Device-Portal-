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
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Device Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Manufacturer</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Battery</TableHead>
            <TableHead>Signal</TableHead>
            <TableHead>Last Seen</TableHead>
            <TableHead>Subscription</TableHead>
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
            devices.map((device) => {
              const lastSeenDate = new Date(device.lastSeen);
              const timeAgo = formatDistanceToNow(lastSeenDate, { addSuffix: true });

              return (
                <TableRow key={device.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">{device.name}</TableCell>
                  <TableCell>{getTypeLabel(device.type)}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(device.status)}>
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
                      <div className="flex items-center gap-1.5">
                        <Battery className="h-4 w-4 text-muted-foreground" />
                        <span>{device.batteryLevel}%</span>
                      </div>
                    ) : (
                      "-"
                    )}
                  </TableCell>
                  <TableCell>
                    {device.signalStrength !== undefined ? (
                      <div className="flex items-center gap-1.5">
                        <Signal className="h-4 w-4 text-muted-foreground" />
                        <span>{device.signalStrength}%</span>
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
                      <ArrowRight className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
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

