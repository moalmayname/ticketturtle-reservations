
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Map, Calendar, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "flights", label: "Flights" },
  { id: "hotels", label: "Hotels" },
  { id: "packages", label: "Packages" },
];

const SearchBar = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("flights");
  const [destination, setDestination] = useState("");
  const [origin, setOrigin] = useState("");
  const [depDate, setDepDate] = useState<Date | undefined>(undefined);
  const [retDate, setRetDate] = useState<Date | undefined>(undefined);
  const [guests, setGuests] = useState(1);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Navigate to the selected tab's page with search params
    navigate(`/${activeTab}?destination=${destination}&origin=${origin}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl mx-auto rounded-xl overflow-hidden glass-card border border-white/20 shadow-xl"
    >
      {/* Tabs */}
      <div className="flex">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-4 text-sm font-medium transition-colors relative ${
              activeTab === tab.id
                ? "text-white"
                : "text-white/70 hover:text-white"
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                layoutId="tab-indicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"
                initial={false}
                transition={{ duration: 0.3 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Search form */}
      <form onSubmit={handleSearch} className="p-4 bg-white/20 backdrop-blur-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Destination input */}
          <div className="rounded-lg bg-white/30 backdrop-blur-sm p-2 border border-white/40">
            <label className="block text-xs font-medium text-black/70 mb-1 ml-2">
              Destination
            </label>
            <div className="flex items-center">
              <Map className="h-4 w-4 text-black/50 ml-2" />
              <Input
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Where to?"
                className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-black/80 placeholder:text-black/40"
                required
              />
            </div>
          </div>

          {/* Origin input - only show for flights and packages */}
          {(activeTab === "flights" || activeTab === "packages") && (
            <div className="rounded-lg bg-white/30 backdrop-blur-sm p-2 border border-white/40">
              <label className="block text-xs font-medium text-black/70 mb-1 ml-2">
                Origin
              </label>
              <div className="flex items-center">
                <Map className="h-4 w-4 text-black/50 ml-2" />
                <Input
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  placeholder="From where?"
                  className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-black/80 placeholder:text-black/40"
                  required
                />
              </div>
            </div>
          )}

          {/* Date picker */}
          <div className="rounded-lg bg-white/30 backdrop-blur-sm p-2 border border-white/40">
            <label className="block text-xs font-medium text-black/70 mb-1 ml-2">
              {activeTab === "hotels" ? "Check-in" : "Departure"}
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start text-left font-normal border-0 bg-transparent hover:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-black/80 placeholder:text-black/40",
                    !depDate && "text-black/40"
                  )}
                >
                  <Calendar className="mr-2 h-4 w-4 text-black/50" />
                  {depDate ? format(depDate, "PP") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-white" align="start">
                <CalendarComponent
                  mode="single"
                  selected={depDate}
                  onSelect={setDepDate}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Return date picker - only show for flights and packages */}
          {(activeTab === "flights" || activeTab === "packages") && (
            <div className="rounded-lg bg-white/30 backdrop-blur-sm p-2 border border-white/40">
              <label className="block text-xs font-medium text-black/70 mb-1 ml-2">
                Return
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start text-left font-normal border-0 bg-transparent hover:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-black/80 placeholder:text-black/40",
                      !retDate && "text-black/40"
                    )}
                  >
                    <Calendar className="mr-2 h-4 w-4 text-black/50" />
                    {retDate ? format(retDate, "PP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-white" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={retDate}
                    onSelect={setRetDate}
                    initialFocus
                    className="p-3 pointer-events-auto"
                    disabled={(date) => date < (depDate || new Date())}
                  />
                </PopoverContent>
              </Popover>
            </div>
          )}

          {/* Guests input - only show for hotels */}
          {activeTab === "hotels" && (
            <div className="rounded-lg bg-white/30 backdrop-blur-sm p-2 border border-white/40">
              <label className="block text-xs font-medium text-black/70 mb-1 ml-2">
                Guests
              </label>
              <div className="flex items-center">
                <Users className="h-4 w-4 text-black/50 ml-2" />
                <Input
                  type="number"
                  min="1"
                  max="10"
                  value={guests}
                  onChange={(e) => setGuests(parseInt(e.target.value))}
                  className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-black/80 placeholder:text-black/40"
                />
              </div>
            </div>
          )}
        </div>

        {/* Search button */}
        <div className="mt-4 text-center">
          <Button
            type="submit"
            className="bg-primary hover:bg-primary/90 text-white font-medium px-8 py-2 h-auto rounded-full"
          >
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default SearchBar;
