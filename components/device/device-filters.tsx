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
    <div className="space-y-4 animate-fade-in relative">
      {/* Filter background */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 rounded-lg -z-10 opacity-50"></div>
      <div className="relative z-10">
      {/* Search and View Mode */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 group">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors duration-300" />
          <Input
            placeholder="Search devices by name, ID, or location..."
            value={searchValue}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-10 transition-all duration-300 focus:ring-2 focus:ring-primary/20 focus:border-primary"
            aria-label="Search devices"
          />
        </div>
        <div className="flex gap-2 bg-muted/50 p-1 rounded-lg">
          <Button
            variant={viewMode === "grid" ? "default" : "ghost"}
            size="sm"
            onClick={() => onViewModeChange("grid")}
            className="transition-all duration-300 hover:scale-105"
          >
            Grid
          </Button>
          <Button
            variant={viewMode === "table" ? "default" : "ghost"}
            size="sm"
            onClick={() => onViewModeChange("table")}
            className="transition-all duration-300 hover:scale-105"
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
            className="text-muted-foreground hover:text-destructive transition-colors duration-300 hover:bg-destructive/10"
          >
            <X className="h-4 w-4 mr-1" />
            Clear filters
          </Button>
        )}
      </div>

      {/* Active Filter Badges */}
      {(filters.status?.length || filters.type?.length) && (
        <div className="flex flex-wrap gap-2 animate-slide-in">
          {filters.status?.map((status) => (
            <Badge
              key={status}
              variant="secondary"
              className="cursor-pointer hover:bg-destructive/10 hover:text-destructive transition-all duration-300 hover:scale-105 group"
              onClick={() => handleStatusChange(status)}
            >
              Status: {status}
              <X className="h-3 w-3 ml-1 group-hover:rotate-90 transition-transform duration-300" />
            </Badge>
          ))}
          {filters.type?.map((type) => (
            <Badge
              key={type}
              variant="secondary"
              className="cursor-pointer hover:bg-destructive/10 hover:text-destructive transition-all duration-300 hover:scale-105 group"
              onClick={() => handleTypeChange(type)}
            >
              Type: {type}
              <X className="h-3 w-3 ml-1 group-hover:rotate-90 transition-transform duration-300" />
            </Badge>
          ))}
        </div>
      )}
      </div>
    </div>
  );
}

