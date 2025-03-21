
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader2, Filter, Star, MapPin, Coffee, Wifi, Utensils, Bath } from "lucide-react";
import { Hotel, searchHotels } from "@/data/mockData";
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
import { toast } from "sonner";

const amenityIcons = {
  "Free Wi-Fi": <Wifi className="h-4 w-4" />,
  "Pool": <Bath className="h-4 w-4" />,
  "Restaurant": <Utensils className="h-4 w-4" />,
  "Breakfast": <Coffee className="h-4 w-4" />,
};

const Hotels = () => {
  const [searchParams] = useSearchParams();
  const initialLocation = searchParams.get("location") || "";
  
  const [location, setLocation] = useState(initialLocation);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [sortBy, setSortBy] = useState("price");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [minRating, setMinRating] = useState(0);
  
  useEffect(() => {
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      const results = searchHotels(location);
      setHotels(results);
      setLoading(false);
    }, 1000);
  }, [location]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const results = searchHotels(location);
      setHotels(results);
      setLoading(false);
    }, 1000);
  };

  const sortHotels = (hotelsToSort: Hotel[]) => {
    let sorted = [...hotelsToSort];
    
    switch (sortBy) {
      case "price":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }
    
    return sorted;
  };

  const filterHotels = (hotelsToFilter: Hotel[]) => {
    return hotelsToFilter.filter(hotel => {
      if (hotel.price < priceRange[0] || hotel.price > priceRange[1]) return false;
      if (hotel.rating < minRating) return false;
      return true;
    });
  };

  const displayedHotels = sortHotels(filterHotels(hotels));

  const handleBookHotel = (hotel: Hotel) => {
    toast.success("Hotel added to your cart!", {
      description: `${hotel.name} in ${hotel.location} has been reserved.`,
    });
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="h-4 w-4 fill-amber-400 text-amber-400" />);
    }
    
    if (hasHalfStar) {
      stars.push(
        <span key="half" className="relative">
          <Star className="h-4 w-4 text-amber-400" />
          <Star className="absolute top-0 left-0 h-4 w-4 fill-amber-400 text-amber-400 overflow-hidden" style={{ clipPath: 'inset(0 50% 0 0)' }} />
        </span>
      );
    }
    
    const remainingStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="h-4 w-4 text-amber-400" />);
    }
    
    return stars;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      {/* Search Header */}
      <section className="pt-32 pb-16 px-4 bg-gradient-to-r from-blue-600 to-blue-400 text-white">
        <div className="container mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Find Your Perfect Stay</h1>
            <p className="text-white/80 max-w-2xl mx-auto">
              Search for hotels worldwide with our easy-to-use hotel search engine. 
              Compare prices and find the best accommodations for your trip.
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
                          <SelectItem value="price-desc">Price: High to Low</SelectItem>
                          <SelectItem value="rating">Rating: High to Low</SelectItem>
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
                      max={1000}
                      step={50}
                      onValueChange={setPriceRange}
                      className="my-6"
                    />
                  </div>
                  
                  {/* Minimum Rating */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label className="text-sm font-medium">Minimum Rating</Label>
                      <span className="text-sm text-gray-500">
                        {minRating} star{minRating !== 1 && "s"}
                      </span>
                    </div>
                    <Slider
                      value={[minRating]}
                      min={0}
                      max={5}
                      step={1}
                      onValueChange={(value) => setMinRating(value[0])}
                      className="my-6"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Any</span>
                      <div className="flex">
                        <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                        <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                        <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                        <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                        <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                </div>
              </div>
            </motion.div>
            
            {/* Hotel Results */}
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
                  {displayedHotels.length} hotels found
                </div>
              </div>
              
              {/* Custom Search Form */}
              <Card className="mb-6">
                <CardContent className="p-4">
                  <form onSubmit={handleSearch} className="flex flex-col md:flex-row md:items-end gap-4">
                    <div className="flex-1">
                      <Label htmlFor="location" className="text-sm font-medium">Location</Label>
                      <Input
                        id="location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="City or destination"
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
                    <p className="text-gray-500">Searching for the best hotels...</p>
                  </div>
                ) : displayedHotels.length > 0 ? (
                  <>
                    <div className="hidden lg:flex justify-between items-center mb-4">
                      <div className="text-sm text-gray-500">
                        {displayedHotels.length} hotels found
                      </div>
                    </div>
                    
                    {displayedHotels.map((hotel) => (
                      <motion.div
                        key={hotel.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
                          <CardContent className="p-0">
                            <div className="flex flex-col md:flex-row">
                              {/* Hotel Image */}
                              <div className="md:w-1/3 h-64 md:h-auto">
                                <img 
                                  src={hotel.image} 
                                  alt={hotel.name} 
                                  className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                                />
                              </div>
                              
                              {/* Hotel Details */}
                              <div className="p-6 flex-1">
                                <div className="flex flex-col md:flex-row justify-between mb-4">
                                  <div>
                                    <h3 className="text-xl font-semibold mb-1">{hotel.name}</h3>
                                    <div className="flex items-center text-sm text-gray-600 mb-2">
                                      <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                                      {hotel.location}
                                    </div>
                                    <div className="flex mb-4">
                                      {renderStars(hotel.rating)}
                                      <span className="ml-2 text-sm text-gray-500">{hotel.rating.toFixed(1)}</span>
                                    </div>
                                  </div>
                                  <div className="mt-2 md:mt-0 text-right">
                                    <div className="text-2xl font-bold text-primary">${hotel.price}</div>
                                    <div className="text-sm text-gray-500">per night</div>
                                  </div>
                                </div>
                                
                                <p className="text-gray-600 mb-4 text-sm line-clamp-2">
                                  {hotel.description}
                                </p>
                                
                                <div className="flex flex-wrap gap-2 mb-6">
                                  {hotel.amenities.slice(0, 4).map((amenity) => (
                                    <Badge 
                                      key={amenity} 
                                      variant="outline"
                                      className="flex items-center gap-1 px-2 py-1"
                                    >
                                      {amenityIcons[amenity as keyof typeof amenityIcons] || null}
                                      <span className="text-xs">{amenity}</span>
                                    </Badge>
                                  ))}
                                  {hotel.amenities.length > 4 && (
                                    <Badge variant="outline" className="px-2 py-1">
                                      <span className="text-xs">+{hotel.amenities.length - 4} more</span>
                                    </Badge>
                                  )}
                                </div>
                                
                                <div className="flex justify-end">
                                  <Button 
                                    className="bg-primary hover:bg-primary/90"
                                    onClick={() => handleBookHotel(hotel)}
                                  >
                                    Book Now
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
                    <p className="text-lg font-medium mb-2">No hotels found</p>
                    <p className="text-gray-500 mb-6">
                      Try adjusting your search parameters or explore different locations.
                    </p>
                    <Button variant="outline" onClick={() => {
                      setLocation("");
                      setTimeout(() => {
                        setHotels(searchHotels());
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

export default Hotels;
