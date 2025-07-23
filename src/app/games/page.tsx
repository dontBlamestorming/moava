import { ArrowLeft, Filter, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

interface Game {
  id: string;
  name: string;
  platform: string;
  genre: string;
  popularity: number;
  imageUrl?: string;
}

const games: Game[] = [
  {
    id: "lol",
    name: "League of Legends",
    platform: "PC",
    genre: "MOBA AOS",
    popularity: 95,
  },
  {
    id: "genshin",
    name: "Genshin Impact",
    platform: "PC Mobile",
    genre: "RPG Action",
    popularity: 89,
  },
  {
    id: "cs2",
    name: "Counter-Strike 2",
    platform: "PC",
    genre: "FPS Shooter",
    popularity: 82,
  },
  {
    id: "fifa24",
    name: "FIFA 24",
    platform: "PC Mobile",
    genre: "Sports",
    popularity: 76,
  },
  {
    id: "valorant",
    name: "Valorant",
    platform: "PC",
    genre: "FPS Tactical",
    popularity: 88,
  },
  {
    id: "overwatch2",
    name: "Overwatch 2",
    platform: "PC Console",
    genre: "FPS Hero",
    popularity: 73,
  },
  {
    id: "fortnite",
    name: "Fortnite",
    platform: "PC Mobile Console",
    genre: "Battle Royale",
    popularity: 91,
  },
  {
    id: "minecraft",
    name: "Minecraft",
    platform: "PC Mobile Console",
    genre: "Sandbox",
    popularity: 85,
  },
  {
    id: "apex",
    name: "Apex Legends",
    platform: "PC Console",
    genre: "Battle Royale",
    popularity: 79,
  },
  {
    id: "pubg",
    name: "PUBG: Battlegrounds",
    platform: "PC Mobile Console",
    genre: "Battle Royale",
    popularity: 71,
  },
  {
    id: "dota2",
    name: "Dota 2",
    platform: "PC",
    genre: "MOBA AOS",
    popularity: 68,
  },
  {
    id: "hearthstone",
    name: "Hearthstone",
    platform: "PC Mobile",
    genre: "Card Game",
    popularity: 74,
  },
];

export default function GamesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">MOAVA</h1>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon">
                <Filter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <ChevronDown className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">게임 선택</h2>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {games.map((game) => (
            <Link key={game.id} href={`/games/${game.id}`}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-0">
                  {/* Game Image Placeholder */}
                  <div className="w-full h-32 bg-blue-500 rounded-t-lg"></div>

                  {/* Game Info */}
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 text-lg mb-2">
                      {game.name}
                    </h3>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p>{game.platform}</p>
                      <p>{game.genre}</p>
                      <p className="font-medium text-blue-600">
                        {game.popularity}개 아이템 인기도 {game.popularity}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
