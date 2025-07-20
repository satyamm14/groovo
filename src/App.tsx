// Add Tauri APIs
import { open } from "@tauri-apps/plugin-dialog";
import { readDir } from "@tauri-apps/plugin-fs";
import { load, type Store } from "@tauri-apps/plugin-store";
import { useEffect, useState } from "react";

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
  const [musicFolder, setMusicFolder] = useState<string | null>(null);
  const [songs, setSongs] = useState<Song[]>([]);
  const [store, setStore] = useState<Store | null>(null);

  // Helper to scan for music files and load them as Song objects
  const scanMusicFolder = async (folder: string) => {
    try {
      const audioExtensions = [".mp3", ".flac", ".wav", ".aac", ".ogg", ".m4a"];
      let foundSongs: Song[] = [];
      let stack: string[] = [folder];

      while (stack.length) {
        const currentDir = stack.pop();
        if (!currentDir) continue;
        const entries = await readDir(currentDir);

        for (const entry of entries) {
          // If it's a directory, add to stack for further traversal
          if (entry.isDirectory && entry.name) {
            stack.push(entry.name);
          }
          // If it's a file, check extension
          if (entry.isFile && entry.name) {
            const lowerName = entry.name.toLowerCase();
            if (audioExtensions.some((ext) => lowerName.endsWith(ext))) {
              foundSongs.push({
                id: entry.name,
                title: entry.name,
                artist: "Unknown Artist",
                album: "Unknown Album",
                year: 0,
                language: "",
                duration: "",
                path: entry.name,
              });
            }
          }
        }
      }
      setSongs(foundSongs);
    } catch (e) {
      console.log("Error scanning folder:", e);
      setSongs([]);
    }
  };

  // Load stored music folder on mount
  useEffect(() => {
    load("settings.dat", { autoSave: false }).then(setStore);
  }, []);

  useEffect(() => {
    if (!store) return;
    (async () => {
      const folder = await store.get<string>("music_folder");
      if (folder) {
        setMusicFolder(folder);
        scanMusicFolder(folder);
      }
    })();
  }, [store]);

  // Handler to select folder
  const handleSelectMusicFolder = async () => {
    const folder = await open({ directory: true, multiple: false });
    if (typeof folder === "string") {
      setMusicFolder(folder);
      if (store) {
        await store.set("music_folder", folder);
        await store.save();
      }
      scanMusicFolder(folder);
    }
  };

  const handlePlaySong = (song: Song) => {
    setCurrentSong(song);
    setIsPlaying(true);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return <></>;
}

export default App;
