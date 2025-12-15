"use client";

import Link from "next/link";
import { Device } from "@/types/device";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Battery, Signal, MapPin, Calendar } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface DeviceCardProps {
  device: Device;
}

export function DeviceCard({ device }: DeviceCardProps) {
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

  const lastSeenDate = new Date(device.lastSeen);
  const timeAgo = formatDistanceToNow(lastSeenDate, { addSuffix: true });

  return (
    <Link href={`/devices/${device.id}`} aria-label={`View details for ${device.name}`}>
      <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full" role="article">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-lg mb-2">{device.name}</CardTitle>
              <CardDescription className="flex items-center gap-2">
                <span>{getTypeLabel(device.type)}</span>
                <span>•</span>
                <span>ID: {device.id}</span>
              </CardDescription>
            </div>
            <Badge variant={getStatusVariant(device.status)}>
              {device.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {/* Metadata */}
            {device.metadata.manufacturer && (
              <div className="text-sm">
                <span className="text-muted-foreground">Manufacturer: </span>
                <span className="font-medium">
                  {device.metadata.manufacturer}
                  {device.metadata.model && ` ${device.metadata.model}`}
                </span>
              </div>
            )}

            {/* Location */}
            {device.metadata.location?.address && (
              <div className="flex items-start gap-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground line-clamp-2">
                  {device.metadata.location.address}
                </span>
              </div>
            )}

            {/* Battery and Signal */}
            <div className="flex items-center gap-4 text-sm">
              {device.batteryLevel !== undefined && (
                <div className="flex items-center gap-1.5">
                  <Battery className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    {device.batteryLevel}%
                  </span>
                </div>
              )}
              {device.signalStrength !== undefined && (
                <div className="flex items-center gap-1.5">
                  <Signal className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    {device.signalStrength}%
                  </span>
                </div>
              )}
            </div>

            {/* Last Seen */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>Last seen {timeAgo}</span>
            </div>

            {/* Subscription Status */}
            <div className="pt-2 border-t">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Subscription:</span>
                <Badge
                  variant={
                    device.subscription.status === "active"
                      ? "success"
                      : device.subscription.status === "expired"
                      ? "destructive"
                      : "secondary"
                  }
                >
                  {device.subscription.plan} - {device.subscription.status}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

