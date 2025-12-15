"use client";

import { useState, useEffect, useMemo } from "react";
import { Device, DeviceFilters } from "@/types/device";
import { fetchDevices } from "@/lib/api";
import { DeviceCard } from "@/components/device/device-card";
import { DeviceTable } from "@/components/device/device-table";
import { DeviceFilters as DeviceFiltersComponent } from "@/components/device/device-filters";
import { DevicePagination } from "@/components/device/device-pagination";
import { Header } from "@/components/layout/header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export default function DevicesPage() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<DeviceFilters>({});
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 24; // 24 items per page (8x3 grid or table rows)

  useEffect(() => {
    async function loadDevices() {
      setLoading(true);
      try {
        const data = await fetchDevices(filters);
        setDevices(data);
      } catch (error) {
        console.error("Failed to load devices:", error);
      } finally {
        setLoading(false);
      }
    }

    loadDevices();
    setCurrentPage(1); // Reset to first page when filters change
  }, [filters]);

  const filteredDevices = useMemo(() => {
    return devices.filter((device) => {
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesSearch =
          device.name.toLowerCase().includes(searchLower) ||
          device.id.toLowerCase().includes(searchLower) ||
          device.metadata.location?.address?.toLowerCase().includes(searchLower) ||
          device.metadata.serialNumber?.toLowerCase().includes(searchLower);
        if (!matchesSearch) return false;
      }

      // Status filter
      if (filters.status && filters.status.length > 0) {
        if (!filters.status.includes(device.status)) return false;
      }

      // Type filter
      if (filters.type && filters.type.length > 0) {
        if (!filters.type.includes(device.type)) return false;
      }

      return true;
    });
  }, [devices, filters]);

  // Pagination logic
  const totalPages = Math.ceil(filteredDevices.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedDevices = filteredDevices.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container py-8">
        <div className="space-y-6">
          {/* Page Header */}
          <div>
            <h1 className="text-3xl font-bold tracking-tight">IoT Devices</h1>
            <p className="text-muted-foreground mt-2">
              Manage and monitor your IoT device fleet
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Devices</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{devices.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Online</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {devices.filter((d) => d.status === "online").length}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Offline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-600">
                  {devices.filter((d) => d.status === "offline").length}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">
                  {devices.filter((d) => d.subscription.status === "active").length}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <DeviceFiltersComponent
            filters={filters}
            onFiltersChange={setFilters}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
          />

          {/* Loading State */}
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <>
              {/* Results Count */}
              <div className="text-sm text-muted-foreground">
                Showing {filteredDevices.length} of {devices.length} devices
              </div>

              {/* Device List */}
              {viewMode === "grid" ? (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {paginatedDevices.map((device) => (
                    <DeviceCard key={device.id} device={device} />
                  ))}
                </div>
              ) : (
                <DeviceTable devices={paginatedDevices} />
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <DevicePagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                  totalItems={filteredDevices.length}
                  itemsPerPage={itemsPerPage}
                />
              )}

              {filteredDevices.length === 0 && !loading && (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <p className="text-muted-foreground text-lg">
                      No devices found matching your filters
                    </p>
                  </CardContent>
                </Card>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}

