
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Check, X, Edit, Trash, Plane, Hotel, Package, 
  Calendar, DollarSign, Clock, User, Tag, Search, RefreshCw 
} from "lucide-react";
import { format, parseISO } from "date-fns";
import { 
  reservations, 
  Reservation,
  getFlightById,
  getHotelById,
  getPackageById
} from "@/data/mockData";
import { useAuthContext } from "@/context/AuthContext";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const AdminDashboard = () => {
  const { isLoggedIn } = useAuthContext();
  const navigate = useNavigate();
  const [localReservations, setLocalReservations] = useState<Reservation[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);
  const [stats, setStats] = useState({
    total: 0,
    confirmed: 0,
    pending: 0,
    cancelled: 0,
    totalRevenue: 0
  });

  useEffect(() => {
    // Redirect if not logged in
    if (!isLoggedIn) {
      navigate("/");
      toast.error("You need to be logged in to access the admin area");
    }
    
    // Load the reservations
    setLocalReservations(reservations);
    
    // Calculate stats
    calculateStats(reservations);
  }, [isLoggedIn, navigate]);

  const calculateStats = (resData: Reservation[]) => {
    const confirmed = resData.filter(r => r.status === "confirmed").length;
    const pending = resData.filter(r => r.status === "pending").length;
    const cancelled = resData.filter(r => r.status === "cancelled").length;
    
    const totalRevenue = resData
      .filter(r => r.status === "confirmed")
      .reduce((sum, r) => sum + r.price, 0);
    
    setStats({
      total: resData.length,
      confirmed,
      pending,
      cancelled,
      totalRevenue
    });
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "flight":
        return <Plane className="h-4 w-4" />;
      case "hotel":
        return <Hotel className="h-4 w-4" />;
      case "package":
        return <Package className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return (
          <Badge className="bg-green-100 text-green-700 border-green-200">
            <Check className="h-3 w-3 mr-1" />
            Confirmed
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        );
      case "cancelled":
        return (
          <Badge className="bg-red-100 text-red-700 border-red-200">
            <X className="h-3 w-3 mr-1" />
            Cancelled
          </Badge>
        );
      default:
        return null;
    }
  };

  const handleStatusChange = (reservationId: string, newStatus: string) => {
    const updated = localReservations.map(res => 
      res.id === reservationId 
        ? { ...res, status: newStatus as "confirmed" | "pending" | "cancelled" } 
        : res
    );
    
    setLocalReservations(updated);
    calculateStats(updated);
    
    toast.success(`Reservation status updated to ${newStatus}`);
  };

  const handleDeleteClick = (reservation: Reservation) => {
    setSelectedReservation(reservation);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (!selectedReservation) return;
    
    const updated = localReservations.filter(res => res.id !== selectedReservation.id);
    setLocalReservations(updated);
    calculateStats(updated);
    
    setIsDeleteDialogOpen(false);
    setSelectedReservation(null);
    
    toast.success("Reservation deleted successfully");
  };

  const filteredReservations = localReservations.filter(res => {
    const matchesSearch = res.itemName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || res.status === filterStatus;
    const matchesType = filterType === "all" || res.type === filterType;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const recentReservations = [...localReservations]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      {/* Admin Header */}
      <section className="pt-32 pb-12 px-4 bg-gradient-to-r from-slate-900 to-slate-800 text-white">
        <div className="container mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-5xl mx-auto"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-white/70 mb-8">
              Manage reservations, view statistics, and control the system.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-white/10 border-none backdrop-blur-sm text-white shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/70 text-sm">Total Reservations</p>
                      <p className="text-3xl font-bold mt-1">{stats.total}</p>
                    </div>
                    <div className="h-12 w-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                      <Calendar className="h-6 w-6 text-blue-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white/10 border-none backdrop-blur-sm text-white shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/70 text-sm">Pending</p>
                      <p className="text-3xl font-bold mt-1">{stats.pending}</p>
                    </div>
                    <div className="h-12 w-12 bg-yellow-500/20 rounded-full flex items-center justify-center">
                      <Clock className="h-6 w-6 text-yellow-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white/10 border-none backdrop-blur-sm text-white shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/70 text-sm">Confirmed</p>
                      <p className="text-3xl font-bold mt-1">{stats.confirmed}</p>
                    </div>
                    <div className="h-12 w-12 bg-green-500/20 rounded-full flex items-center justify-center">
                      <Check className="h-6 w-6 text-green-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white/10 border-none backdrop-blur-sm text-white shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/70 text-sm">Total Revenue</p>
                      <p className="text-3xl font-bold mt-1">${stats.totalRevenue.toLocaleString()}</p>
                    </div>
                    <div className="h-12 w-12 bg-emerald-500/20 rounded-full flex items-center justify-center">
                      <DollarSign className="h-6 w-6 text-emerald-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Main Content */}
      <section className="py-12 px-4 bg-gray-50 flex-grow">
        <div className="container mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-5xl mx-auto"
          >
            <Tabs defaultValue="reservations">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="reservations">Reservations</TabsTrigger>
                <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              </TabsList>
              
              <TabsContent value="reservations">
                <Card>
                  <CardHeader>
                    <CardTitle>Manage Reservations</CardTitle>
                    <CardDescription>
                      View, edit or cancel customer reservations.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {/* Filters */}
                    <div className="flex flex-col md:flex-row gap-4 mb-6">
                      <div className="relative flex-grow">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <Input
                          placeholder="Search reservations..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <Select value={filterStatus} onValueChange={setFilterStatus}>
                          <SelectTrigger>
                            <SelectValue placeholder="Filter by status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="all">All Statuses</SelectItem>
                              <SelectItem value="confirmed">Confirmed</SelectItem>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="cancelled">Cancelled</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        
                        <Select value={filterType} onValueChange={setFilterType}>
                          <SelectTrigger>
                            <SelectValue placeholder="Filter by type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="all">All Types</SelectItem>
                              <SelectItem value="flight">Flights</SelectItem>
                              <SelectItem value="hotel">Hotels</SelectItem>
                              <SelectItem value="package">Packages</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    {/* Reservations Table */}
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-[100px]">ID</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Details</TableHead>
                            <TableHead>Dates</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredReservations.length > 0 ? (
                            filteredReservations.map((reservation) => (
                              <TableRow key={reservation.id}>
                                <TableCell className="font-medium">
                                  {reservation.id}
                                </TableCell>
                                <TableCell>
                                  <div className="flex items-center gap-2">
                                    {getTypeIcon(reservation.type)}
                                    <span className="capitalize">{reservation.type}</span>
                                  </div>
                                </TableCell>
                                <TableCell>{reservation.itemName}</TableCell>
                                <TableCell>
                                  <div className="flex flex-col gap-1">
                                    <div className="text-xs text-gray-500">From:</div>
                                    <div className="font-medium">
                                      {format(parseISO(reservation.startDate), "MMM d, yyyy")}
                                    </div>
                                    <div className="text-xs text-gray-500 mt-1">To:</div>
                                    <div className="font-medium">
                                      {format(parseISO(reservation.endDate), "MMM d, yyyy")}
                                    </div>
                                  </div>
                                </TableCell>
                                <TableCell>${reservation.price}</TableCell>
                                <TableCell>
                                  {getStatusBadge(reservation.status)}
                                </TableCell>
                                <TableCell className="text-right">
                                  <div className="flex justify-end gap-2">
                                    <Select 
                                      defaultValue={reservation.status}
                                      onValueChange={(value) => handleStatusChange(reservation.id, value)}
                                    >
                                      <SelectTrigger className="w-[130px]">
                                        <SelectValue placeholder="Change status" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="confirmed">Confirm</SelectItem>
                                        <SelectItem value="pending">Pending</SelectItem>
                                        <SelectItem value="cancelled">Cancel</SelectItem>
                                      </SelectContent>
                                    </Select>
                                    
                                    <Button 
                                      variant="destructive" 
                                      size="icon"
                                      onClick={() => handleDeleteClick(reservation)}
                                    >
                                      <Trash className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))
                          ) : (
                            <TableRow>
                              <TableCell colSpan={7} className="text-center py-6 text-gray-500">
                                No reservations found. Try adjusting your filters.
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="dashboard">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="md:col-span-2">
                    <CardHeader>
                      <CardTitle>Recent Reservations</CardTitle>
                      <CardDescription>Overview of the latest bookings</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="rounded-md border">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Booking</TableHead>
                              <TableHead>Date</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead className="text-right">Amount</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {recentReservations.map((res) => (
                              <TableRow key={res.id}>
                                <TableCell>
                                  <div className="flex items-center gap-2">
                                    {getTypeIcon(res.type)}
                                    <span className="font-medium">{res.itemName}</span>
                                  </div>
                                </TableCell>
                                <TableCell>
                                  {format(parseISO(res.createdAt), "MMM d, yyyy")}
                                </TableCell>
                                <TableCell>{getStatusBadge(res.status)}</TableCell>
                                <TableCell className="text-right font-medium">
                                  ${res.price}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Booking Statistics</CardTitle>
                      <CardDescription>Summary of reservations</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                              <Plane className="h-4 w-4 text-blue-600" />
                            </div>
                            <span>Flights</span>
                          </div>
                          <span className="font-medium">
                            {localReservations.filter(r => r.type === "flight").length}
                          </span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center mr-3">
                              <Hotel className="h-4 w-4 text-emerald-600" />
                            </div>
                            <span>Hotels</span>
                          </div>
                          <span className="font-medium">
                            {localReservations.filter(r => r.type === "hotel").length}
                          </span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                              <Package className="h-4 w-4 text-purple-600" />
                            </div>
                            <span>Packages</span>
                          </div>
                          <span className="font-medium">
                            {localReservations.filter(r => r.type === "package").length}
                          </span>
                        </div>
                        
                        <div className="pt-4 border-t">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center">
                              <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center mr-3">
                                <User className="h-4 w-4 text-slate-600" />
                              </div>
                              <span>Total Customers</span>
                            </div>
                            <span className="font-medium">
                              {new Set(localReservations.map(r => r.id.substring(0, 3))).size}
                            </span>
                          </div>
                        </div>
                        
                        <div className="pt-4 border-t">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center">
                              <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                                <DollarSign className="h-4 w-4 text-green-600" />
                              </div>
                              <span>Total Revenue</span>
                            </div>
                            <span className="font-bold">
                              ${stats.totalRevenue.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full" onClick={() => window.location.reload()}>
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Refresh Data
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </section>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this reservation? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          {selectedReservation && (
            <div className="py-4">
              <div className="flex items-center gap-2 mb-2">
                {getTypeIcon(selectedReservation.type)}
                <span className="font-medium">{selectedReservation.itemName}</span>
              </div>
              <div className="text-sm text-gray-500">
                {format(parseISO(selectedReservation.startDate), "MMM d, yyyy")} - 
                {format(parseISO(selectedReservation.endDate), "MMM d, yyyy")}
              </div>
              <div className="font-semibold mt-2">
                ${selectedReservation.price}
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete Reservation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default AdminDashboard;
