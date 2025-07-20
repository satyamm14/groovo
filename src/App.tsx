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
import { useState } from "react";
import { TrackRow } from "./components/ui/TrackRow";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Slider } from "./components/ui/slider";
import { Tabs, TabsList, TabsTrigger } from "./components/ui/tabs";
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

  return (
    <>
      <div className="flex min-h-screen bg-background text-foreground">
        <div className="flex flex-1 max-h-full mb-28">
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
          <main className="flex-1 h-full flex flex-col bg-background text-foreground">
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
                <Button variant="secondary">Add folder</Button>
              </div>
            </header>
            {/* Table/List */}
            <section className="flex-1 overflow-auto p-8">
              {/* Example: Table rows */}
              <TrackRow
                title="3am"
                artist="Skrillex, Prentiss, Anthony Green"
                album="Don't Get Too Close"
                year="2023"
                language="English"
                duration="03:26"
              />
              {/* ...more rows */}
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
