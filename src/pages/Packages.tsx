
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader2, Filter, CheckCircle, Calendar, DollarSign, MapPin, Clock } from "lucide-react";
import { TravelPackage, travelPackages, getPackagesByPopularity } from "@/data/mockData";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { toast } from "sonner";

const Packages = () => {
  const [searchParams] = useSearchParams();
  const initialDestination = searchParams.get("destination") || "";
  
  const [destination, setDestination] = useState(initialDestination);
  const [packages, setPackages] = useState<TravelPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [sortBy, setSortBy] = useState("popularity");
  const [priceRange, setPriceRange] = useState([0, 3000]);
  const [durationFilter, setDurationFilter] = useState("all");

  useEffect(() => {
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      let results = [...travelPackages];
      if (destination) {
        results = results.filter(pkg => 
          pkg.destination.toLowerCase().includes(destination.toLowerCase())
        );
      }
      setPackages(results);
      setLoading(false);
    }, 1000);
  }, [destination]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      let results = [...travelPackages];
      if (destination) {
        results = results.filter(pkg => 
          pkg.destination.toLowerCase().includes(destination.toLowerCase())
        );
      }
      setPackages(results);
      setLoading(false);
    }, 1000);
  };

  const sortPackages = (packagesToSort: TravelPackage[]) => {
    let sorted = [...packagesToSort];
    
    switch (sortBy) {
      case "price":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "popularity":
        sorted.sort((a, b) => b.popularityScore - a.popularityScore);
        break;
      default:
        break;
    }
    
    return sorted;
  };

  const filterPackages = (packagesToFilter: TravelPackage[]) => {
    return packagesToFilter.filter(pkg => {
      // Price filter
      if (pkg.price < priceRange[0] || pkg.price > priceRange[1]) return false;
      
      // Duration filter
      if (durationFilter !== "all") {
        const days = parseInt(pkg.duration.split(" ")[0]);
        if (durationFilter === "short" && days > 5) return false;
        if (durationFilter === "medium" && (days <= 5 || days > 10)) return false;
        if (durationFilter === "long" && days <= 10) return false;
      }
      
      return true;
    });
  };

  const displayedPackages = sortPackages(filterPackages(packages));

  const handleBookPackage = (pkg: TravelPackage) => {
    toast.success("Package added to your cart!", {
      description: `${pkg.name} (${pkg.destination}) has been reserved.`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      {/* Search Header */}
      <section className="pt-32 pb-16 px-4 bg-gradient-to-r from-blue-600 to-blue-400 text-white">
        <div className="container mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">All-Inclusive Travel Packages</h1>
            <p className="text-white/80 max-w-2xl mx-auto">
              Discover our curated travel packages that include flights, accommodation, 
              and activities. Perfect for hassle-free vacation planning.
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
                          <SelectItem value="popularity">Popularity</SelectItem>
                          <SelectItem value="price">Price: Low to High</SelectItem>
                          <SelectItem value="price-desc">Price: High to Low</SelectItem>
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
                      max={3000}
                      step={100}
                      onValueChange={setPriceRange}
                      className="my-6"
                    />
                  </div>
                  
                  {/* Duration */}
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Trip Duration</Label>
                    <Select value={durationFilter} onValueChange={setDurationFilter}>
                      <SelectTrigger className="w-full mt-2">
                        <SelectValue placeholder="Duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Duration Options</SelectLabel>
                          <SelectItem value="all">All Durations</SelectItem>
                          <SelectItem value="short">Short Trip (1-5 days)</SelectItem>
                          <SelectItem value="medium">Medium Trip (6-10 days)</SelectItem>
                          <SelectItem value="long">Long Trip (10+ days)</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Package Results */}
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
                  {displayedPackages.length} packages found
                </div>
              </div>
              
              {/* Custom Search Form */}
              <Card className="mb-6">
                <CardContent className="p-4">
                  <form onSubmit={handleSearch} className="flex flex-col md:flex-row md:items-end gap-4">
                    <div className="flex-1">
                      <Label htmlFor="destination" className="text-sm font-medium">Destination</Label>
                      <Input
                        id="destination"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        placeholder="City or country"
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
              <div className="space-y-6">
                {loading ? (
                  <div className="flex flex-col items-center justify-center p-12">
                    <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
                    <p className="text-gray-500">Searching for the best packages...</p>
                  </div>
                ) : displayedPackages.length > 0 ? (
                  <>
                    <div className="hidden lg:flex justify-between items-center mb-4">
                      <div className="text-sm text-gray-500">
                        {displayedPackages.length} packages found
                      </div>
                    </div>
                    
                    {displayedPackages.map((pkg) => (
                      <motion.div
                        key={pkg.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
                          <CardContent className="p-0">
                            <div className="flex flex-col lg:flex-row">
                              {/* Package Image */}
                              <div className="lg:w-2/5 h-64 lg:h-auto relative">
                                <img 
                                  src={pkg.image} 
                                  alt={pkg.name} 
                                  className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                                />
                                <div className="absolute top-4 left-4">
                                  <Badge className="bg-blue-500 text-white font-medium">
                                    Best Seller
                                  </Badge>
                                </div>
                              </div>
                              
                              {/* Package Details */}
                              <div className="p-6 flex-1">
                                <div className="flex flex-col md:flex-row justify-between mb-3">
                                  <div>
                                    <h3 className="text-xl font-semibold mb-1">{pkg.name}</h3>
                                    <div className="flex items-center text-sm text-gray-600 mb-2">
                                      <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                                      {pkg.destination}
                                    </div>
                                  </div>
                                  <div className="mt-2 md:mt-0 text-right">
                                    <div className="text-2xl font-bold text-primary">${pkg.price}</div>
                                    <div className="text-sm text-gray-500">per person</div>
                                  </div>
                                </div>
                                
                                <div className="flex flex-wrap gap-3 mb-4">
                                  <div className="flex items-center text-sm text-gray-600">
                                    <Calendar className="h-4 w-4 mr-1 text-gray-500" />
                                    {pkg.duration}
                                  </div>
                                  {pkg.flightIncluded && (
                                    <Badge variant="outline" className="border-green-200 text-green-700 bg-green-50">
                                      Flight Included
                                    </Badge>
                                  )}
                                  {pkg.hotelIncluded && (
                                    <Badge variant="outline" className="border-purple-200 text-purple-700 bg-purple-50">
                                      Hotel Included
                                    </Badge>
                                  )}
                                </div>
                                
                                <p className="text-gray-600 mb-4 text-sm line-clamp-2">
                                  {pkg.description}
                                </p>
                                
                                <div className="mb-4">
                                  <h4 className="text-sm font-medium mb-2">Highlights:</h4>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                    {pkg.inclusions.slice(0, 4).map((inclusion, index) => (
                                      <div key={index} className="flex items-start">
                                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                                        <span className="text-sm text-gray-600">{inclusion}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                                
                                <div className="flex justify-end">
                                  <Button 
                                    className="bg-primary hover:bg-primary/90"
                                    onClick={() => handleBookPackage(pkg)}
                                  >
                                    Book Package
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </>
                ) : (
                  <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                    <p className="text-lg font-medium mb-2">No packages found</p>
                    <p className="text-gray-500 mb-6">
                      Try adjusting your search parameters or explore different destinations.
                    </p>
                    <Button variant="outline" onClick={() => {
                      setDestination("");
                      setTimeout(() => {
                        setPackages(travelPackages);
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

export default Packages;
