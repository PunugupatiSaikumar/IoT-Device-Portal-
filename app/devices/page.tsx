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
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2, Activity, Wifi, WifiOff, AlertTriangle, CheckCircle2, TrendingUp } from "lucide-react";

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
    <div className="min-h-screen flex flex-col relative">
      {/* Background decorative elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
        <div className="absolute top-1/2 left-0 w-72 h-72 bg-primary/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }}></div>
      </div>
      
      <Header />
      <main className="flex-1 container py-8 relative z-10">
        <div className="space-y-6">
          {/* Page Header */}
          <div className="animate-fade-in">
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              IoT Devices
            </h1>
            <p className="text-muted-foreground mt-2 text-lg">
              Manage and monitor your IoT device fleet
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="relative overflow-hidden border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/20 animate-fade-in backdrop-blur-sm bg-card/80">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent"></div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
                <CardTitle className="text-sm font-medium">Total Devices</CardTitle>
                <Activity className="h-5 w-5 text-primary animate-pulse-glow" />
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="text-3xl font-bold">{devices.length.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground mt-1">All registered devices</p>
              </CardContent>
            </Card>
            
            <Card className="relative overflow-hidden border-2 hover:border-green-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-green-500/20 animate-fade-in backdrop-blur-sm bg-card/80" style={{ animationDelay: "0.1s" }}>
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/15 via-green-500/5 to-transparent"></div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full blur-2xl"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
                <CardTitle className="text-sm font-medium">Online</CardTitle>
                <CheckCircle2 className="h-5 w-5 text-green-600 animate-pulse-glow" />
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="text-3xl font-bold text-green-600">
                  {devices.filter((d) => d.status === "online").length.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {devices.length > 0 
                    ? `${Math.round((devices.filter((d) => d.status === "online").length / devices.length) * 100)}% online`
                    : "0% online"}
                </p>
              </CardContent>
            </Card>
            
            <Card className="relative overflow-hidden border-2 hover:border-gray-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-gray-500/20 animate-fade-in backdrop-blur-sm bg-card/80" style={{ animationDelay: "0.2s" }}>
              <div className="absolute inset-0 bg-gradient-to-br from-gray-500/15 via-gray-500/5 to-transparent"></div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-gray-500/5 rounded-full blur-2xl"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
                <CardTitle className="text-sm font-medium">Offline</CardTitle>
                <WifiOff className="h-5 w-5 text-gray-600" />
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="text-3xl font-bold text-gray-600">
                  {devices.filter((d) => d.status === "offline").length.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground mt-1">Requires attention</p>
              </CardContent>
            </Card>
            
            <Card className="relative overflow-hidden border-2 hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20 animate-fade-in backdrop-blur-sm bg-card/80" style={{ animationDelay: "0.3s" }}>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/15 via-blue-500/5 to-transparent"></div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
                <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle>
                <TrendingUp className="h-5 w-5 text-blue-600" />
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="text-3xl font-bold text-blue-600">
                  {devices.filter((d) => d.subscription.status === "active").length.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground mt-1">Currently active</p>
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
            <div className="space-y-6">
              <div className="flex flex-col items-center justify-center py-12">
                <div className="relative">
                  <Loader2 className="h-12 w-12 animate-spin text-primary" />
                  <div className="absolute inset-0 h-12 w-12 border-4 border-primary/20 rounded-full animate-ping"></div>
                </div>
                <p className="mt-4 text-muted-foreground animate-pulse font-medium">Loading devices...</p>
              </div>
              {/* Skeleton Loaders */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <CardHeader>
                      <Skeleton className="h-6 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-1/2" />
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-2/3" />
                        <Skeleton className="h-2 w-full rounded-full" />
                        <Skeleton className="h-2 w-3/4 rounded-full" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            <>
              {/* Results Count */}
              <div className="flex items-center justify-between animate-slide-in">
                <div className="text-sm text-muted-foreground">
                  Showing <span className="font-semibold text-foreground">{filteredDevices.length.toLocaleString()}</span> of{" "}
                  <span className="font-semibold text-foreground">{devices.length.toLocaleString()}</span> devices
                </div>
                {filteredDevices.length !== devices.length && (
                  <div className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-md">
                    Filtered results
                  </div>
                )}
              </div>

              {/* Device List */}
              {viewMode === "grid" ? (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 relative">
                  {/* Grid background pattern */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:20px_20px] -z-10 opacity-50"></div>
                  {paginatedDevices.map((device, index) => (
                    <div
                      key={device.id}
                      className="animate-fade-in relative z-10"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <DeviceCard device={device} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="animate-fade-in relative">
                  {/* Table background pattern */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:20px_20px] -z-10 opacity-30 rounded-md"></div>
                  <DeviceTable devices={paginatedDevices} />
                </div>
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
                <Card className="animate-fade-in border-dashed">
                  <CardContent className="flex flex-col items-center justify-center py-16">
                    <div className="rounded-full bg-muted p-4 mb-4">
                      <AlertTriangle className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <p className="text-muted-foreground text-lg font-medium mb-2">
                      No devices found
                    </p>
                    <p className="text-sm text-muted-foreground text-center max-w-md">
                      Try adjusting your filters or search query to find devices
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

