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
      <Card className="group hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 cursor-pointer h-full border-2 hover:border-primary/50 hover:-translate-y-1 backdrop-blur-sm bg-card/90 relative overflow-hidden" role="article">
        {/* Decorative gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <CardHeader className="relative overflow-hidden z-10">
          <div className="flex items-start justify-between relative">
            <div className="flex-1">
              <CardTitle className="text-lg mb-2 group-hover:text-primary transition-colors duration-300">
                {device.name}
              </CardTitle>
              <CardDescription className="flex items-center gap-2">
                <span className="font-medium">{getTypeLabel(device.type)}</span>
                <span>•</span>
                <span className="font-mono text-xs">ID: {device.id}</span>
              </CardDescription>
            </div>
            <Badge 
              variant={getStatusVariant(device.status)}
              className="group-hover:scale-110 transition-transform duration-300"
            >
              {device.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="relative z-10">
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

            {/* Battery and Signal with Progress Bars */}
            <div className="space-y-2">
              {device.batteryLevel !== undefined && (
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5">
                      <Battery className={`h-3.5 w-3.5 ${
                        device.batteryLevel > 50 ? "text-green-600" : 
                        device.batteryLevel > 20 ? "text-yellow-600" : 
                        "text-red-600"
                      }`} />
                      <span className="text-muted-foreground font-medium">Battery</span>
                    </div>
                    <span className={`font-semibold ${
                      device.batteryLevel > 50 ? "text-green-600" : 
                      device.batteryLevel > 20 ? "text-yellow-600" : 
                      "text-red-600"
                    }`}>
                      {device.batteryLevel}%
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 rounded-full ${
                        device.batteryLevel > 50 ? "bg-green-600" : 
                        device.batteryLevel > 20 ? "bg-yellow-600" : 
                        "bg-red-600"
                      }`}
                      style={{ width: `${device.batteryLevel}%` }}
                    ></div>
                  </div>
                </div>
              )}
              {device.signalStrength !== undefined && (
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5">
                      <Signal className={`h-3.5 w-3.5 ${
                        device.signalStrength > 70 ? "text-green-600" : 
                        device.signalStrength > 40 ? "text-yellow-600" : 
                        "text-red-600"
                      }`} />
                      <span className="text-muted-foreground font-medium">Signal</span>
                    </div>
                    <span className={`font-semibold ${
                      device.signalStrength > 70 ? "text-green-600" : 
                      device.signalStrength > 40 ? "text-yellow-600" : 
                      "text-red-600"
                    }`}>
                      {device.signalStrength}%
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 rounded-full ${
                        device.signalStrength > 70 ? "bg-green-600" : 
                        device.signalStrength > 40 ? "bg-yellow-600" : 
                        "bg-red-600"
                      }`}
                      style={{ width: `${device.signalStrength}%` }}
                    ></div>
                  </div>
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

