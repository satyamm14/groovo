import { AnimatePresence, motion } from "framer-motion";
import {
  Home,
  List,
  Maximize2,
  Music,
  Pause,
  Play,
  Plus,
  Search,
  Settings,
  Shuffle,
  SkipBack,
  SkipForward,
  Video,
  Volume2,
} from "lucide-react";
import { useState } from "react";
import "./App.css";
import TitleBar from "./components/TitleBar";

// Types
interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  year: number;
  language: string;
  duration: string;
  path: string;
}

interface Playlist {
  id: string;
  name: string;
  songs: Song[];
}

function App() {
  const [currentView, setCurrentView] = useState<
    "home" | "music" | "video" | "playlists"
  >("music");
  const [currentTab, setCurrentTab] = useState<"songs" | "albums" | "artists">(
    "songs"
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [showEqualizer, setShowEqualizer] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data
  const mockSongs: Song[] = [
    {
      id: "1",
      title: "Lost in the City",
      artist: "Luna Echo",
      album: "Urban Dreams",
      year: 2023,
      language: "English",
      duration: "3:45",
      path: "",
    },
    {
      id: "2",
      title: "Midnight Blues",
      artist: "Marco Silva",
      album: "Jazz Collection",
      year: 2022,
      language: "English",
      duration: "4:20",
      path: "",
    },
    {
      id: "3",
      title: "Mountain High",
      artist: "Mountain View",
      album: "Nature Sounds",
      year: 2023,
      language: "Instrumental",
      duration: "5:15",
      path: "",
    },
  ];

  const groupedSongs = mockSongs.reduce((acc, song) => {
    const firstLetter = song.title.charAt(0).toUpperCase();
    if (!acc[firstLetter]) acc[firstLetter] = [];
    acc[firstLetter].push(song);
    return acc;
  }, {} as Record<string, Song[]>);

  const handlePlaySong = (song: Song) => {
    setCurrentSong(song);
    setIsPlaying(true);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      <TitleBar title="Groovo - Music Player" />

      {/* Main Container */}
      <div className="flex h-full pt-12">
        {/* Sidebar */}
        <motion.div
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          className="w-64 bg-black/20 backdrop-blur-xl border-r border-white/10"
        >
          {/* App Header */}
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Music className="w-5 h-5" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Groovo
              </h1>
            </div>
          </div>

          {/* Search Bar */}
          <div className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search music..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          {/* Navigation */}
          <nav className="px-4 space-y-2">
            {[
              { id: "home", icon: Home, label: "Home" },
              { id: "music", icon: Music, label: "Music library" },
              { id: "video", icon: Video, label: "Video library" },
              { id: "playlists", icon: List, label: "Play queue" },
            ].map((item) => (
              <motion.button
                key={item.id}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentView(item.id as any)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                  currentView === item.id
                    ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                    : "text-gray-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </motion.button>
            ))}
          </nav>

          {/* Settings */}
          <div className="absolute bottom-4 left-4 right-4">
            <motion.button
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.95 }}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-white/10 hover:text-white transition-all"
            >
              <Settings className="w-5 h-5" />
              <span className="font-medium">Settings</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold capitalize">{currentView}</h2>
                <div className="flex space-x-4 mt-4">
                  {["songs", "albums", "artists"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setCurrentTab(tab as any)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        currentTab === tab
                          ? "bg-purple-500 text-white"
                          : "text-gray-300 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex space-x-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-lg font-medium transition-colors flex items-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add folder</span>
                </motion.button>
              </div>
            </div>

            {/* Sub Header */}
            <div className="flex items-center justify-between mt-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-lg font-medium transition-all flex items-center space-x-2"
              >
                <Shuffle className="w-4 h-4" />
                <span>Shuffle and play</span>
              </motion.button>
              <div className="flex space-x-3">
                <select className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white">
                  <option>Sort by</option>
                  <option>Name</option>
                  <option>Artist</option>
                  <option>Album</option>
                </select>
                <select className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white">
                  <option>Genre</option>
                  <option>Pop</option>
                  <option>Rock</option>
                  <option>Jazz</option>
                </select>
              </div>
            </div>
          </div>

          {/* Music List */}
          <div className="flex-1 overflow-y-auto p-6">
            {Object.entries(groupedSongs).map(([letter, songs]) => (
              <div key={letter} className="mb-8">
                <h3 className="text-2xl font-bold text-purple-300 mb-4">
                  {letter}
                </h3>
                <div className="space-y-2">
                  {songs.map((song) => (
                    <motion.div
                      key={song.id}
                      whileHover={{
                        x: 5,
                        backgroundColor: "rgba(255, 255, 255, 0.05)",
                      }}
                      className="flex items-center justify-between p-4 rounded-lg hover:bg-white/5 transition-all cursor-pointer"
                      onClick={() => handlePlaySong(song)}
                    >
                      <div className="flex-1">
                        <h4 className="font-medium text-white">{song.title}</h4>
                        <p className="text-gray-400 text-sm">{song.artist}</p>
                      </div>
                      <div className="flex items-center space-x-6 text-gray-400 text-sm">
                        <span>{song.album}</span>
                        <span>{song.year}</span>
                        <span>{song.language}</span>
                        <span>{song.duration}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Player Controls */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="absolute bottom-0 left-0 right-0 bg-black/30 backdrop-blur-xl border-t border-white/10 p-4"
      >
        <div className="flex items-center justify-between">
          {/* Now Playing Info */}
          <div className="flex items-center space-x-4">
            {currentSong && (
              <>
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Music className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-medium text-white">
                    {currentSong.title}
                  </h4>
                  <p className="text-gray-400 text-sm">
                    {currentSong.artist} • {currentSong.album}
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Playback Controls */}
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              <SkipBack className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={togglePlayPause}
              className="p-3 bg-purple-500 hover:bg-purple-600 rounded-full transition-colors"
            >
              {isPlaying ? (
                <Pause className="w-6 h-6" />
              ) : (
                <Play className="w-6 h-6" />
              )}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              <SkipForward className="w-5 h-5" />
            </motion.button>
          </div>

          {/* Right Controls */}
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowEqualizer(true)}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              <Settings className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              <Volume2 className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              <Maximize2 className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="w-full bg-white/20 rounded-full h-1">
            <motion.div
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-1 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: isPlaying ? "30%" : "0%" }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </motion.div>

      {/* Equalizer Modal */}
      <AnimatePresence>
        {showEqualizer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
            onClick={() => setShowEqualizer(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-slate-800/90 backdrop-blur-xl border border-white/20 rounded-2xl p-8 w-96"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-bold text-white mb-6">Equalizer</h3>
              <div className="space-y-6">
                {/* Frequency Bands */}
                <div className="grid grid-cols-5 gap-4">
                  {[
                    "60Hz",
                    "170Hz",
                    "310Hz",
                    "600Hz",
                    "1kHz",
                    "3kHz",
                    "6kHz",
                    "12kHz",
                    "14kHz",
                    "16kHz",
                  ].map((freq) => (
                    <div key={freq} className="text-center">
                      <div className="h-32 bg-white/10 rounded-lg mb-2 flex items-end justify-center p-2">
                        <div className="w-full bg-gradient-to-t from-purple-500 to-pink-500 rounded-sm h-1/2"></div>
                      </div>
                      <span className="text-xs text-gray-400">{freq}</span>
                    </div>
                  ))}
                </div>

                {/* Sound Effects */}
                <div className="space-y-3">
                  <h4 className="text-white font-medium">Sound Effects</h4>
                  {["Bass Boost", "Panoramic", "Clear Voice"].map((effect) => (
                    <label
                      key={effect}
                      className="flex items-center space-x-3 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-purple-500 bg-white/10 border-white/20 rounded focus:ring-purple-500"
                      />
                      <span className="text-gray-300">{effect}</span>
                    </label>
                  ))}
                </div>

                {/* Presets */}
                <div>
                  <h4 className="text-white font-medium mb-3">Presets</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {["Flat", "Bass Boost", "Treble Boost", "Vocal"].map(
                      (preset) => (
                        <button
                          key={preset}
                          className="px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-gray-300 hover:text-white transition-colors text-sm"
                        >
                          {preset}
                        </button>
                      )
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
