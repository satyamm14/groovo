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
import { AnimatedButton, Input } from "./components";
import AnimatedBackground from "./components/AnimatedBackground";
import CustomSelect from "./components/CustomSelect";
import ListComponent from "./components/List";

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
  const [sortValue, setSortValue] = useState("sort");
  const [genreValue, setGenreValue] = useState("genre");

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
    <div className="h-screen text-white overflow-hidden relative">
      <AnimatedBackground />
      {/* <TitleBar title="Groovo - Music Player" /> */}

      {/* Main Content Row: Sidebar + Main Content */}
      <main className="flex h-full relative pb-20">
        {/* Sidebar */}
        <motion.div className="w-64 bg-white/3 backdrop-blur-md border-r border-white/10 shadow-md flex flex-col">
          {/* App Header */}
          <div className="p-5 border-b border-white/10 bg-white/3 backdrop-blur-sm">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg flex items-center justify-center">
                <Music className="w-5 h-5 text-purple-400" />
              </div>
              <h1 className="text-xl font-bold text-purple-400">Groovo</h1>
            </div>
          </div>

          {/* Search Bar */}
          <div className="p-1 py-5">
            <Input
              type="text"
              placeholder="Search music..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search className="w-4 h-4" />}
              size="sm"
              className="bg-white/5 border border-white/20 backdrop-blur-sm text-white placeholder:text-white/60 shadow-md focus:border-purple-400"
            />
          </div>

          {/* Navigation */}
          <nav className="px-1">
            <ListComponent
              items={[
                {
                  id: "home",
                  icon: Home,
                  label: "Home",
                  active: currentView === "home",
                  onClick: () => setCurrentView("home"),
                },
                {
                  id: "music",
                  icon: Music,
                  label: "Music library",
                  active: currentView === "music",
                  onClick: () => setCurrentView("music"),
                },
                {
                  id: "video",
                  icon: Video,
                  label: "Video library",
                  active: currentView === "video",
                  onClick: () => setCurrentView("video"),
                },
                {
                  id: "playlists",
                  icon: List,
                  label: "Play queue",
                  active: currentView === "playlists",
                  onClick: () => setCurrentView("playlists"),
                },
              ]}
            />
          </nav>

          {/* Settings */}
          <div className="mt-auto mb-3 px-1">
            <AnimatedButton
              variant="ghost"
              className="w-full justify-start bg-white/3 border border-white/10"
              size="md"
            >
              <Settings className="w-4 h-4" />
              Settings
            </AnimatedButton>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col bg-white/3 backdrop-blur-md">
          {/* Header */}
          <div className="p-6 border-b border-white/10 bg-white/3 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold capitalize">{currentView}</h2>
                <div className="flex space-x-4 mt-4">
                  {["songs", "albums", "artists"].map((tab) => (
                    <AnimatedButton
                      key={tab}
                      variant={currentTab === tab ? "primary" : "ghost"}
                      onClick={() => setCurrentTab(tab as any)}
                      size="sm"
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </AnimatedButton>
                  ))}
                </div>
              </div>
              <div className="flex space-x-3">
                <AnimatedButton
                  variant="primary"
                  size="sm"
                  className="shadow-md border border-purple-400 bg-white/5 hover:bg-white/10 text-white/90"
                >
                  <Plus className="w-4 h-4" />
                  Add folder
                </AnimatedButton>
              </div>
            </div>

            {/* Sub Header */}
            <div className="flex items-center justify-between mt-6">
              <AnimatedButton
                variant="primary"
                size="md"
                className="shadow-md border border-purple-400 bg-white/5 hover:bg-white/10 text-white/90"
              >
                <Shuffle className="w-4 h-4" />
                Shuffle and play
              </AnimatedButton>
              <div className="flex space-x-3">
                <CustomSelect
                  value={sortValue}
                  onChange={setSortValue}
                  options={[
                    { label: "Sort by", value: "sort" },
                    { label: "Name", value: "name" },
                    { label: "Artist", value: "artist" },
                    { label: "Album", value: "album" },
                  ]}
                  size="sm"
                />
                <CustomSelect
                  value={genreValue}
                  onChange={setGenreValue}
                  options={[
                    { label: "Genre", value: "genre" },
                    { label: "Pop", value: "pop" },
                    { label: "Rock", value: "rock" },
                    { label: "Jazz", value: "jazz" },
                  ]}
                  size="sm"
                />
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
                      // whileHover={false}
                      className="flex items-center justify-between p-4 rounded-lg hover:bg-white/8 transition-all cursor-pointer bg-white/2 backdrop-blur-sm border border-white/5 shadow-md"
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
      </main>

      {/* Player Controls (Media Controller) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/5 backdrop-blur-md border-t border-white/10 p-4 shadow-lg z-20">
        <div className="flex items-center justify-between">
          {/* Now Playing Info */}
          <div className="flex items-center space-x-4">
            {currentSong && (
              <>
                <div className="w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg flex items-center justify-center shadow-lg">
                  <Music className="w-6 h-6 text-purple-400" />
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
              className="p-2 text-gray-400 hover:text-white transition-colors bg-white/5 backdrop-blur-sm rounded-lg border border-white/10"
            >
              <SkipBack className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={togglePlayPause}
              className="p-3 bg-purple-500 hover:bg-purple-600 rounded-full transition-colors shadow-lg"
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
              className="p-2 text-gray-400 hover:text-white transition-colors bg-white/5 backdrop-blur-sm rounded-lg border border-white/10"
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
              className="p-2 text-gray-400 hover:text-white transition-colors bg-white/5 backdrop-blur-sm rounded-lg border border-white/10"
            >
              <Settings className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 text-gray-400 hover:text-white transition-colors bg-white/5 backdrop-blur-sm rounded-lg border border-white/10"
            >
              <Volume2 className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 text-gray-400 hover:text-white transition-colors bg-white/5 backdrop-blur-sm rounded-lg border border-white/10"
            >
              <Maximize2 className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>

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
