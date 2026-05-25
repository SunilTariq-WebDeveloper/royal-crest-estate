import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, Sparkles, Star, Key, Mic } from "lucide-react";
import { Input, Button, AutoComplete } from "antd";
import {
  SearchOutlined,
  HomeOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [listening, setListening] = useState(false);
  const navigate = useNavigate();

  const lahoreLocations = [
    "DHA Lahore",
    "Bahria Town Lahore",
    "Gulberg Lahore",
    "Johar Town Lahore",
    "Model Town Lahore",
    "Canal Road Lahore",
    "Faisal Town Lahore",
    "Wapda Town Lahore",
    "Iqbal Town Lahore",
    "Valencia Town Lahore",
    "Lake City Lahore",
  ];

  const handleSearchChange = (value) => {
    setSearchText(value);
    if (value) {
      const filtered = lahoreLocations.filter((loc) =>
        loc.toLowerCase().includes(value.toLowerCase()),
      );
      setSuggestions(filtered.map((loc) => ({ value: loc, label: loc })));
    } else {
      setSuggestions([]);
    }
  };

  const handleSearch = () => {
    if (searchText.trim()) {
      navigate(`/properties?search=${encodeURIComponent(searchText)}`);
    } else {
      navigate("/properties");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // FIXED: Working Voice Search Function
  const handleVoice = async () => {
    // Check if browser supports speech recognition
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert(
        "Sorry, your browser doesn't support voice search. Please use Google Chrome, Microsoft Edge, or Safari.",
      );
      return;
    }

    try {
      // Request microphone permission first
      await navigator.mediaDevices.getUserMedia({ audio: true });

      const recognition = new SpeechRecognition();
      recognition.lang = "en-US"; // Can change to "ur-PK" for Urdu
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      setListening(true);

      recognition.onstart = () => {
        console.log("🎤 Voice recognition started...");
      };

      recognition.onresult = (event) => {
        const spokenText = event.results[0][0].transcript;
        console.log("✅ Recognized text:", spokenText);

        // Update search input
        setSearchText(spokenText);

        // Update suggestions
        const filtered = lahoreLocations.filter((loc) =>
          loc.toLowerCase().includes(spokenText.toLowerCase()),
        );
        setSuggestions(filtered.map((loc) => ({ value: loc, label: loc })));

        // Navigate to search results after a short delay
        setTimeout(() => {
          navigate(`/properties?search=${encodeURIComponent(spokenText)}`);
        }, 300);
      };

      recognition.onerror = (event) => {
        console.error("❌ Voice recognition error:", event.error);

        if (event.error === "not-allowed") {
          alert(
            "Please allow microphone access to use voice search. Check your browser settings.",
          );
        } else if (event.error === "no-speech") {
          alert("No speech detected. Please try again and speak clearly.");
        } else {
          alert(
            `Voice search failed: ${event.error}. Please try again or type manually.`,
          );
        }

        setListening(false);
      };

      recognition.onend = () => {
        console.log("🎤 Voice recognition ended");
        setListening(false);
      };

      // Start recognition
      recognition.start();
    } catch (err) {
      console.error("❌ Microphone permission error:", err);
      alert(
        "Microphone access is required for voice search. Please allow microphone permissions in your browser.",
      );
      setListening(false);
    }
  };

  return (
    <div
      id="hero"
      className="relative min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50 dark:from-black dark:via-gray-900 dark:to-orange-950 overflow-hidden transition-colors duration-300"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 mt-56 w-96 h-96 bg-orange-200/50 dark:bg-orange-500/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-300/40 dark:bg-orange-600/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-orange-200/30 dark:from-orange-500/10 to-transparent rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-10 dark:opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(249, 115, 22, 0.3) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto md:py-6 px-4 sm:px-6 sm:py-12 lg:px-8 lg:mt-[-84px] pb-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-screen">
          {/* Left Column - Text Content */}
          <div
            className={`transform transition-all duration-1000 ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "-translate-x-10 opacity-0"
            }`}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white dark:bg-white/10 mt-4 backdrop-blur-md border border-gray-200 dark:border-white/20 rounded-full px-4 py-2 mb-6 shadow-sm">
              <Sparkles className="w-4 h-4 text-orange-500 dark:text-orange-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-white">
                Trusted Real Estate Platform
              </span>
              <span className="bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full">
                #1
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-6xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
              Find Your Perfect
              <span className="relative block mt-2">
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-orange-500 to-orange-600 dark:from-orange-400 dark:via-orange-500 dark:to-orange-600">
                  Home & Investment
                </span>
                <span className="absolute bottom-0 left-0 w-full h-3 bg-orange-500/20 dark:bg-orange-500/30 blur-sm -z-0" />
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl leading-relaxed">
              Explore verified properties, connect with professional agents, and
              manage your leads with our smart CRM system.
              <span className="text-orange-600 dark:text-orange-400 font-semibold block mt-2">
                Search smarter, close faster.
              </span>
              <span className="text-gray-600 dark:text-gray-300 block mt-1">
                Your dream property is waiting.
              </span>
            </p>

            {/* Quick Stats */}
            <div className="flex gap-6 mt-8">
              <div>
                <div className="text-2xl font-bold text-orange-600">10K+</div>
                <div className="text-sm text-gray-500">Properties</div>
              </div>
              <div className="w-px bg-gray-300 dark:bg-gray-700"></div>
              <div>
                <div className="text-2xl font-bold text-orange-600">5K+</div>
                <div className="text-sm text-gray-500">Happy Clients</div>
              </div>
              <div className="w-px bg-gray-300 dark:bg-gray-700"></div>
              <div>
                <div className="text-2xl font-bold text-orange-600">98%</div>
                <div className="text-sm text-gray-500">Satisfaction</div>
              </div>
            </div>
          </div>

          {/* Right Column - Visual Showcase */}
          <div
            className={`relative transform transition-all duration-1000 delay-300 ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "translate-x-10 opacity-0"
            }`}
          >
            <div className="relative w-[90%] lg:w-[100%] mx-auto">
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-orange-300/50 dark:bg-orange-500/30 rounded-full blur-2xl animate-pulse" />
              <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-orange-400/40 dark:bg-orange-600/20 rounded-full blur-2xl animate-pulse delay-700" />

              <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-orange-500/20 group">
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10" />
                <img
                  src="https://i.pinimg.com/736x/ed/96/5b/ed965bf7c94acf90ad27ea0b15c499cc.jpg"
                  alt="Luxury modern home"
                  className="w-full h-[400px] lg:h-[400px] object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                          <Key className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-white/80 text-xs">
                          Premium Listing
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-1">
                        DHA Phase 8, Lahore
                      </h3>
                      <div className="flex items-center gap-1 text-gray-200 text-sm">
                        <MapPin className="w-3 h-3 text-orange-400" />
                        <span>Defence Housing Authority, Lahore</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search Section with Working Mic */}
        <div className="lg:mt-[-84px] w-full lg:max-w-5xl mx-auto">
          <div className="bg-white dark:bg-white/10 backdrop-blur-xl rounded-2xl p-2 md:p-6 mt-4 border border-gray-200 dark:border-white/20 shadow-xl">
            <div className="mt-2">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <AutoComplete
                    value={searchText}
                    onChange={handleSearchChange}
                    options={suggestions}
                    className="w-full"
                    size="large"
                    onKeyPress={handleKeyPress}
                  >
                    <Input
                      size="large"
                      placeholder="Search by city, address or property name"
                      prefix={
                        <EnvironmentOutlined className="w-4 h-4 md:w-5 md:h-5 text-gray-400" />
                      }
                      suffix={
                        <div className="flex items-center gap-2">
                          {/* Clear button */}
                          {searchText && (
                            <span
                              onClick={() => {
                                setSearchText("");
                                setSuggestions([]);
                              }}
                              className="cursor-pointer text-gray-400 hover:text-gray-600 text-lg"
                              style={{ fontSize: "18px" }}
                            >
                              ✕
                            </span>
                          )}

                          {/* Working MIC Button */}
                          <button
                            onClick={handleVoice}
                            disabled={listening}
                            className={`relative transition-all duration-200 focus:outline-none ${
                              listening ? "cursor-wait" : "cursor-pointer"
                            }`}
                            title="Click to search by voice"
                          >
                            {listening ? (
                              <div className="relative">
                                <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-75"></div>
                                <div className="relative w-5 h-5 md:w-5 md:h-5 bg-red-500 rounded-full flex items-center justify-center">
                                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                                </div>
                              </div>
                            ) : (
                              <Mic
                                className="w-5 h-5 md:w-5 md:h-5 text-gray-400 hover:text-orange-500 transition-colors duration-200"
                                strokeWidth={1.5}
                              />
                            )}
                          </button>
                        </div>
                      }
                      className="w-full !bg-gray-50 dark:!bg-black/50 !border-gray-200 dark:!border-white/20 !text-gray-900 dark:!text-white placeholder:!text-gray-400 hover:!border-orange-500 focus:!border-orange-500 !shadow-none !rounded-xl py-2 md:py-3"
                    />
                  </AutoComplete>
                </div>

                <Button
                  type="primary"
                  size="large"
                  onClick={handleSearch}
                  icon={<SearchOutlined />}
                  className="!h-auto px-6 md:px-12 py-2 md:py-3 !bg-gradient-to-r !from-orange-500 !to-orange-600 !border-0 hover:!from-orange-600 hover:!to-orange-700 !text-white !font-semibold !rounded-xl !shadow-lg !shadow-orange-500/25 hover:!shadow-orange-500/40 flex items-center gap-2 !text-sm md:!text-base"
                >
                  Search
                </Button>
              </div>
            </div>

            {/* Popular Searches */}
            <div className="flex flex-wrap items-center gap-2 mt-4 pt-2">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Popular:
              </span>
              <button
                onClick={() => {
                  setSearchText("DHA Lahore");
                  handleSearchChange("DHA Lahore");
                }}
                className="text-xs px-2 py-1 bg-gray-100 dark:bg-white/10 rounded-full text-gray-600 dark:text-gray-400 hover:bg-orange-100 hover:text-orange-600 transition-colors"
              >
                DHA Lahore
              </button>
              <button
                onClick={() => {
                  setSearchText("Bahria Town");
                  handleSearchChange("Bahria Town");
                }}
                className="text-xs px-2 py-1 bg-gray-100 dark:bg-white/10 rounded-full text-gray-600 dark:text-gray-400 hover:bg-orange-100 hover:text-orange-600 transition-colors"
              >
                Bahria Town
              </button>
              <button
                onClick={() => {
                  setSearchText("Gulberg");
                  handleSearchChange("Gulberg");
                }}
                className="text-xs px-2 py-1 bg-gray-100 dark:bg-white/10 rounded-full text-gray-600 dark:text-gray-400 hover:bg-orange-100 hover:text-orange-600 transition-colors"
              >
                Gulberg
              </button>
              <button
                onClick={() => {
                  setSearchText("Johar Town");
                  handleSearchChange("Johar Town");
                }}
                className="text-xs px-2 py-1 bg-gray-100 dark:bg-white/10 rounded-full text-gray-600 dark:text-gray-400 hover:bg-orange-100 hover:text-orange-600 transition-colors"
              >
                Johar Town
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;