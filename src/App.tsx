import { invoke } from "@tauri-apps/api/core";
import { join } from "@tauri-apps/api/path";
import { open } from "@tauri-apps/plugin-dialog";
import { readDir } from "@tauri-apps/plugin-fs";
import { load, type Store } from "@tauri-apps/plugin-store";
import {
  Home,
  List,
  ListMusic,
  Music,
  Play,
  Settings,
  Shuffle,
  SkipBack,
  SkipForward,
  Video,
  Volume2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Slider } from "./components/ui/slider";
import { Tabs, TabsList, TabsTrigger } from "./components/ui/tabs";
import { TrackRow } from "./components/ui/TrackRow";
import { Typography } from "./components/ui/typography";

const NAV_ITEMS = [
  { label: "Home", icon: Home },
  { label: "Music library", icon: Music },
  { label: "Video library", icon: Video },
  { label: "Play queue", icon: ListMusic },
  { label: "Playlists", icon: List },
];

const TABS = ["Songs", "Albums", "Artists"];

export default function App() {
  const [activeTab, setActiveTab] = useState(TABS[0]);
  // Placeholder for selected row, etc.

  const [musicFolder, setMusicFolder] = useState<string | null>(null);
  const [songs, setSongs] = useState<any[]>([]);
  const [store, setStore] = useState<Store | null>(null);

  // Helper to scan for music files and load them as Song objects
  const scanMusicFolder = async (folder: string) => {
    try {
      const audioExtensions = [".mp3", ".flac", ".wav", ".aac", ".ogg", ".m4a"];
      let foundSongs: any[] = [];
      let stack: string[] = [folder];

      while (stack.length) {
        const currentDir = stack.pop();
        if (!currentDir) continue;
        const entries = await readDir(currentDir);

        for (const entry of entries) {
          // Build the full path for this entry
          const entryPath = await join(currentDir, entry.name);
          // If it's a directory, add to stack for further traversal
          if (entry.isDirectory) {
            stack.push(entryPath);
          }
          // If it's a file, check extension
          if (entry.isFile) {
            const lowerName = entryPath.toLowerCase();
            if (audioExtensions.some((ext) => lowerName.endsWith(ext))) {
              try {
                // Call the Rust command to parse metadata
                const metadata = await invoke<any>("parse_metadata", {
                  filePathStr: entryPath,
                });

                foundSongs.push({
                  id: entryPath,
                  title: metadata.title || entry.name || entryPath,
                  artist: metadata.artist || "Unknown Artist",
                  album: metadata.album || "Unknown Album",
                  year: metadata.year ? String(metadata.year) : "",
                  genre: metadata.genre || "",
                  duration: metadata.duration_secs
                    ? new Date(metadata.duration_secs * 1000)
                        .toISOString()
                        .substr(11, 8)
                    : "",
                  path: entryPath,
                  sampleRate: metadata.sample_rate_hz,
                  bitrate: metadata.bitrate_kbps,
                  channels: metadata.channels,
                });
              } catch (err) {
                console.log("Error parsing folder:", err);

                // Fallback to minimal info if metadata fails
                foundSongs.push({
                  id: entryPath,
                  title: entry.name || entryPath,
                  artist: "Unknown Artist",
                  album: "Unknown Album",
                  year: "",
                  genre: "",
                  duration: "",
                  path: entryPath,
                });
              }
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

  // Group songs alphabetically by first letter of title
  function groupSongsAlphabetically(songs: any[]) {
    const sorted = [...songs].sort((a, b) =>
      a.title.localeCompare(b.title, undefined, { sensitivity: "base" })
    );
    return sorted.reduce((groups: Record<string, any[]>, song) => {
      const letter = song.title[0]?.toUpperCase() || "#";
      if (!groups[letter]) groups[letter] = [];
      groups[letter].push(song);
      return groups;
    }, {});
  }

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

  return (
    <>
      <div className="flex bg-background text-foreground">
        <div className="flex flex-1 max-h-[84vh] mb-28">
          {/* Sidebar */}
          <aside className="flex h-full flex-col w-72 border-r border-border bg-sidebar text-sidebar-foreground">
            <div className="flex items-center gap-2 p-4">
              {/* App Icon/Logo */}
              <Typography
                variant="heading1"
                className="text-lg font-bold flex-1"
              >
                Media Player
              </Typography>
            </div>
            <div className="p-4">
              <Input placeholder="Search" />
            </div>
            <nav className="flex-1 flex flex-col gap-1">
              {NAV_ITEMS.map((item) => (
                <Button
                  key={item.label}
                  variant="ghost"
                  className="justify-start"
                >
                  <item.icon className="w-5 h-5 mr-2" />
                  {item.label}
                </Button>
              ))}
            </nav>
            <div className="p-4 mt-auto">
              <Button variant="ghost" className="justify-start w-full">
                <Settings className="w-5 h-5 mr-2" />
                Settings
              </Button>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 flex flex-col bg-background text-foreground min-h-0">
            <header className="flex items-center justify-between p-8">
              <div className="flex flex-col gap-y-5">
                <Typography variant="heading1">Music</Typography>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList>
                    {TABS.map((tab) => (
                      <TabsTrigger key={tab} value={tab}>
                        {tab}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
              </div>
              <div className="flex gap-2">
                <Button variant="secondary">
                  <Shuffle className="w-4 h-4 mr-2" />
                  Shuffle and play
                </Button>
                <Button variant="secondary" onClick={handleSelectMusicFolder}>
                  Add folder
                </Button>
              </div>
            </header>
            {/* Table/List */}
            <section className="flex-1 h-full overflow-auto p-8">
              {/* Render songs grouped alphabetically */}
              {songs.length === 0 ? (
                <Typography variant="muted">No songs found.</Typography>
              ) : (
                Object.entries(groupSongsAlphabetically(songs)).map(
                  ([letter, group]) => (
                    <div key={letter} className="mb-8">
                      <Typography variant="body1" className="mb-2 text-primary">
                        {letter}
                      </Typography>
                      {group.map((song) => (
                        <TrackRow
                          key={song.id}
                          title={song.title}
                          artist={song.artist}
                          album={song.album}
                          year={song.year}
                          language={song.language}
                          duration={song.duration}
                        />
                      ))}
                    </div>
                  )
                )
              )}
            </section>
          </main>
        </div>

        {/* Bottom Player */}
        <footer className="fixed left-0 right-0 bottom-0 h-28 flex items-center px-8 border-t border-border bg-card text-card-foreground z-50">
          <div className="flex items-center gap-4 w-72">
            <img
              src="https://via.placeholder.com/48"
              alt="Album Art"
              className="rounded"
            />
            <div>
              <Typography variant="body1" className="font-medium">
                I'll Show You
              </Typography>
              <Typography variant="muted">Justin Bieber • Purpose</Typography>
            </div>
          </div>
          <div className="flex-1 flex flex-col items-center">
            <div className="flex gap-4 mb-2">
              <Button variant="ghost">
                <Shuffle className="w-5 h-5" />
              </Button>
              <Button variant="ghost">
                <SkipBack className="w-5 h-5" />
              </Button>
              <Button variant="ghost">
                <Play className="w-5 h-5" />
              </Button>
              <Button variant="ghost">
                <SkipForward className="w-5 h-5" />
              </Button>
              <Button variant="ghost">
                <Volume2 className="w-5 h-5" />
              </Button>
            </div>
            <Slider defaultValue={[50]} max={100} step={1} className="w-full" />
            <div className="flex justify-between w-full text-xs mt-1">
              <span>00:01:34</span>
              <span>00:01:45</span>
            </div>
          </div>
          <div className="flex items-center gap-2 w-72 justify-end">
            {/* Additional controls (volume, fullscreen, etc.) */}
          </div>
        </footer>
      </div>
    </>
  );
}
