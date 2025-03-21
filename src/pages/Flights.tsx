
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader2, Filter, Plane, Clock, ArrowRight, Plus, Minus } from "lucide-react";
import { format } from "date-fns";
import { 
  Flight, 
  searchFlights, 
  calculateFlightPrice 
} from "@/data/mockData";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

const Flights = () => {
  const [searchParams] = useSearchParams();
  const initialOrigin = searchParams.get("origin") || "";
  const initialDestination = searchParams.get("destination") || "";
  
  const [origin, setOrigin] = useState(initialOrigin);
  const [destination, setDestination] = useState(initialDestination);
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(true);
  const [age, setAge] = useState(30);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [sortBy, setSortBy] = useState("price");
  const [showDirectOnly, setShowDirectOnly] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 2000]);

  useEffect(() => {
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      const results = searchFlights(origin, destination);
      setFlights(results);
      setLoading(false);
    }, 1000);
  }, [origin, destination]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const results = searchFlights(origin, destination);
      setFlights(results);
      setLoading(false);
    }, 1000);
  };

  const handleAgeIncrease = () => {
    if (age < 99) setAge(age + 1);
  };

  const handleAgeDecrease = () => {
    if (age > 1) setAge(age - 1);
  };

  const sortFlights = (flightsToSort: Flight[]) => {
    let sorted = [...flightsToSort];
    
    switch (sortBy) {
      case "price":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "duration":
        sorted.sort((a, b) => a.duration.localeCompare(b.duration));
        break;
      case "departure":
        sorted.sort((a, b) => a.departureTime.localeCompare(b.departureTime));
        break;
      case "arrival":
        sorted.sort((a, b) => a.arrivalTime.localeCompare(b.arrivalTime));
        break;
      default:
        break;
    }
    
    return sorted;
  };

  const filterFlights = (flightsToFilter: Flight[]) => {
    return flightsToFilter.filter(flight => {
      if (showDirectOnly && flight.stops > 0) return false;
      if (flight.price < priceRange[0] || flight.price > priceRange[1]) return false;
      return true;
    });
  };

  const displayedFlights = sortFlights(filterFlights(flights));

  const handleBookFlight = (flight: Flight) => {
    toast.success("Flight added to your cart!", {
      description: `${flight.from} to ${flight.to} on ${format(new Date(flight.departureTime), "MMMM d, yyyy")}`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      {/* Search Header */}
      <section className="pt-32 pb-16 px-4 bg-gradient-to-r from-blue-600 to-blue-400 text-white">
        <div className="container mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Find Your Perfect Flight</h1>
            <p className="text-white/80 max-w-2xl mx-auto">
              Search for flights worldwide with our easy-to-use flight search engine. 
              Compare prices and find the best deals on airline tickets.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <SearchBar />
          </div>
        </div>
      </section>
      
      {/* Main Content */}
      <section className="py-12 px-4 bg-gray-50 flex-grow">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className={`lg:block ${isFiltersOpen ? 'block' : 'hidden'}`}
            >
              <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold">Filters</h3>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setIsFiltersOpen(false)}
                    className="lg:hidden"
                  >
                    Close
                  </Button>
                </div>
                
                <div className="space-y-6">
                  {/* Sort By */}
                  <div>
                    <Label className="text-sm font-medium">Sort By</Label>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-full mt-2">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Sort Options</SelectLabel>
                          <SelectItem value="price">Price: Low to High</SelectItem>
                          <SelectItem value="duration">Duration: Shortest</SelectItem>
                          <SelectItem value="departure">Departure: Earliest</SelectItem>
                          <SelectItem value="arrival">Arrival: Earliest</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {/* Price Range */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label className="text-sm font-medium">Price Range</Label>
                      <span className="text-sm text-gray-500">
                        ${priceRange[0]} - ${priceRange[1]}
                      </span>
                    </div>
                    <Slider
                      value={priceRange}
                      min={0}
                      max={2000}
                      step={50}
                      onValueChange={setPriceRange}
                      className="my-6"
                    />
                  </div>
                  
                  {/* Direct Flights Only */}
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium">Direct Flights Only</Label>
                    <Switch
                      checked={showDirectOnly}
                      onCheckedChange={setShowDirectOnly}
                    />
                  </div>
                  
                  <Separator />
                  
                  {/* Passenger Age */}
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Passenger Age</Label>
                    <p className="text-xs text-gray-500 mb-3">
                      Flight prices vary based on passenger age
                    </p>
                    <div className="flex items-center">
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={handleAgeDecrease}
                        disabled={age <= 1}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <div className="w-12 text-center mx-2 font-medium">
                        {age}
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={handleAgeIncrease}
                        disabled={age >= 99}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="mt-2 text-xs text-gray-500">
                      {age < 2 ? (
                        <span>Infant: 10% of adult fare</span>
                      ) : age < 12 ? (
                        <span>Child: 75% of adult fare</span>
                      ) : age >= 65 ? (
                        <span>Senior: 90% of adult fare</span>
                      ) : (
                        <span>Adult: Full fare</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Flight Results */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-3"
            >
              {/* Mobile Filters Button */}
              <div className="lg:hidden mb-4 flex justify-between items-center">
                <Button 
                  variant="outline" 
                  onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                  className="mb-4"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
                
                <div className="text-sm text-gray-500">
                  {displayedFlights.length} flights found
                </div>
              </div>
              
              {/* Custom Search Form */}
              <Card className="mb-6">
                <CardContent className="p-4">
                  <form onSubmit={handleSearch} className="flex flex-col md:flex-row md:items-end gap-4">
                    <div className="flex-1">
                      <Label htmlFor="origin" className="text-sm font-medium">From</Label>
                      <Input
                        id="origin"
                        value={origin}
                        onChange={(e) => setOrigin(e.target.value)}
                        placeholder="City or airport"
                        className="mt-1"
                      />
                    </div>
                    <div className="flex-1">
                      <Label htmlFor="destination" className="text-sm font-medium">To</Label>
                      <Input
                        id="destination"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        placeholder="City or airport"
                        className="mt-1"
                      />
                    </div>
                    <Button type="submit" className="md:w-auto">
                      Search
                    </Button>
                  </form>
                </CardContent>
              </Card>
              
              {/* Search Results */}
              <div className="space-y-4">
                {loading ? (
                  <div className="flex flex-col items-center justify-center p-12">
                    <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
                    <p className="text-gray-500">Searching for the best flights...</p>
                  </div>
                ) : displayedFlights.length > 0 ? (
                  <>
                    <div className="hidden lg:flex justify-between items-center mb-4">
                      <div className="text-sm text-gray-500">
                        {displayedFlights.length} flights found
                      </div>
                    </div>
                    
                    {displayedFlights.map((flight) => (
                      <motion.div
                        key={flight.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Card className="overflow-hidden hover:shadow-md transition-all duration-300">
                          <CardContent className="p-0">
                            <div className="flex flex-col md:flex-row items-stretch">
                              {/* Airline */}
                              <div className="bg-gray-50 p-4 md:w-48 flex flex-row md:flex-col justify-between md:justify-center items-center md:items-start border-b md:border-b-0 md:border-r border-gray-100">
                                <div className="flex items-center">
                                  <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                                    <Plane className="h-4 w-4 text-primary" />
                                  </div>
                                  <div>
                                    <p className="font-medium">{flight.airline}</p>
                                    <p className="text-xs text-gray-500">Flight #{flight.id.toUpperCase()}</p>
                                  </div>
                                </div>
                                <div className="md:mt-3 flex md:flex-col items-center md:items-start">
                                  <Badge variant="outline" className="md:mb-2 mr-2 md:mr-0">
                                    {flight.stops === 0 ? "Direct" : `${flight.stops} stop${flight.stops > 1 ? "s" : ""}`}
                                  </Badge>
                                  <div className="flex items-center text-xs text-gray-500">
                                    <Clock className="h-3 w-3 mr-1" />
                                    {flight.duration}
                                  </div>
                                </div>
                              </div>
                              
                              {/* Flight Details */}
                              <div className="p-4 flex-grow flex flex-col justify-center">
                                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 md:mb-0">
                                  {/* Departure */}
                                  <div className="mb-2 md:mb-0">
                                    <p className="text-sm text-gray-500">Departure</p>
                                    <div className="flex items-baseline">
                                      <p className="text-xl font-semibold">
                                        {format(new Date(flight.departureTime), "HH:mm")}
                                      </p>
                                      <p className="text-sm ml-2">
                                        {format(new Date(flight.departureTime), "d MMM")}
                                      </p>
                                    </div>
                                    <p className="text-sm">{flight.from}</p>
                                  </div>
                                  
                                  {/* Flight Path */}
                                  <div className="hidden md:flex items-center flex-grow mx-6">
                                    <div className="h-0.5 bg-gray-200 flex-grow relative">
                                      <Plane className="h-3 w-3 text-primary absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2" />
                                    </div>
                                  </div>
                                  
                                  {/* Arrival */}
                                  <div>
                                    <p className="text-sm text-gray-500">Arrival</p>
                                    <div className="flex items-baseline">
                                      <p className="text-xl font-semibold">
                                        {format(new Date(flight.arrivalTime), "HH:mm")}
                                      </p>
                                      <p className="text-sm ml-2">
                                        {format(new Date(flight.arrivalTime), "d MMM")}
                                      </p>
                                    </div>
                                    <p className="text-sm">{flight.to}</p>
                                  </div>
                                </div>
                              </div>
                              
                              {/* Price & Booking */}
                              <div className="p-4 md:w-48 bg-gray-50 border-t md:border-t-0 md:border-l border-gray-100 flex flex-row md:flex-col items-center justify-between">
                                <div className="flex md:flex-col items-baseline md:items-end">
                                  <p className="text-3xl font-bold text-primary">
                                    ${calculateFlightPrice(flight.price, age).toFixed(0)}
                                  </p>
                                  {age !== 30 && (
                                    <p className="text-sm text-gray-500 ml-2 md:ml-0">
                                      <s>${flight.price}</s>
                                    </p>
                                  )}
                                </div>
                                <Button 
                                  className="mt-2"
                                  onClick={() => handleBookFlight(flight)}
                                >
                                  Book Now
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </>
                ) : (
                  <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                    <p className="text-lg font-medium mb-2">No flights found</p>
                    <p className="text-gray-500 mb-6">
                      Try adjusting your search parameters or explore different dates.
                    </p>
                    <Button variant="outline" onClick={() => {
                      setOrigin("");
                      setDestination("");
                      setTimeout(() => {
                        setFlights(searchFlights());
                      }, 100);
                    }}>
                      Clear Search
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Flights;
