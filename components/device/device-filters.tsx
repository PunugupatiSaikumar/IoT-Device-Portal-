"use client";

import { useState } from "react";
import type { DeviceFilters, DeviceStatus, DeviceType } from "@/types/device";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface DeviceFiltersProps {
  filters: DeviceFilters;
  onFiltersChange: (filters: DeviceFilters) => void;
  viewMode: "grid" | "table";
  onViewModeChange: (mode: "grid" | "table") => void;
}

export function DeviceFilters({
  filters,
  onFiltersChange,
  viewMode,
  onViewModeChange,
}: DeviceFiltersProps) {
  const [searchValue, setSearchValue] = useState(filters.search || "");

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    onFiltersChange({ ...filters, search: value || undefined });
  };

  const handleStatusChange = (status: DeviceStatus | "all") => {
    if (status === "all") {
      const { status: _, ...rest } = filters;
      onFiltersChange(rest);
    } else {
      const currentStatuses = filters.status || [];
      const newStatuses = currentStatuses.includes(status)
        ? currentStatuses.filter((s) => s !== status)
        : [...currentStatuses, status];
      onFiltersChange({
        ...filters,
        status: newStatuses.length > 0 ? newStatuses : undefined,
      });
    }
  };

  const handleTypeChange = (type: DeviceType | "all") => {
    if (type === "all") {
      const { type: _, ...rest } = filters;
      onFiltersChange(rest);
    } else {
      const currentTypes = filters.type || [];
      const newTypes = currentTypes.includes(type)
        ? currentTypes.filter((t) => t !== type)
        : [...currentTypes, type];
      onFiltersChange({
        ...filters,
        type: newTypes.length > 0 ? newTypes : undefined,
      });
    }
  };

  const clearFilters = () => {
    setSearchValue("");
    onFiltersChange({});
  };

  const hasActiveFilters =
    filters.status?.length || filters.type?.length || filters.search;

  return (
    <div className="space-y-4">
      {/* Search and View Mode */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search devices by name, ID, or location..."
            value={searchValue}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-10"
            aria-label="Search devices"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="sm"
            onClick={() => onViewModeChange("grid")}
          >
            Grid
          </Button>
          <Button
            variant={viewMode === "table" ? "default" : "outline"}
            size="sm"
            onClick={() => onViewModeChange("table")}
          >
            Table
          </Button>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-muted-foreground">
            Status:
          </label>
          <Select
            value={filters.status?.[0] || "all"}
            onValueChange={(value) =>
              handleStatusChange(value as DeviceStatus | "all")
            }
          >
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="All statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="online">Online</SelectItem>
              <SelectItem value="offline">Offline</SelectItem>
              <SelectItem value="maintenance">Maintenance</SelectItem>
              <SelectItem value="error">Error</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-muted-foreground">
            Type:
          </label>
          <Select
            value={filters.type?.[0] || "all"}
            onValueChange={(value) =>
              handleTypeChange(value as DeviceType | "all")
            }
          >
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="All types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All types</SelectItem>
              <SelectItem value="sensor">Sensor</SelectItem>
              <SelectItem value="actuator">Actuator</SelectItem>
              <SelectItem value="gateway">Gateway</SelectItem>
              <SelectItem value="controller">Controller</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-muted-foreground"
          >
            <X className="h-4 w-4 mr-1" />
            Clear filters
          </Button>
        )}
      </div>

      {/* Active Filter Badges */}
      {(filters.status?.length || filters.type?.length) && (
        <div className="flex flex-wrap gap-2">
          {filters.status?.map((status) => (
            <Badge
              key={status}
              variant="secondary"
              className="cursor-pointer"
              onClick={() => handleStatusChange(status)}
            >
              Status: {status}
              <X className="h-3 w-3 ml-1" />
            </Badge>
          ))}
          {filters.type?.map((type) => (
            <Badge
              key={type}
              variant="secondary"
              className="cursor-pointer"
              onClick={() => handleTypeChange(type)}
            >
              Type: {type}
              <X className="h-3 w-3 ml-1" />
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}

