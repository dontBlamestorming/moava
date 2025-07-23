"use client";

import { ArrowLeft, Bell, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { useState, useEffect } from "react";

interface Item {
  id: string;
  name: string;
  rarity: string;
  description: string;
  probability: number;
  color: string;
  details: {
    [key: string]: number;
  };
}

interface GameData {
  name: string;
  items: Item[];
}

const gameData: { [key: string]: GameData } = {
  lol: {
    name: "League of Legends",
    items: [
      {
        id: "hextech",
        name: "Hextech Chest",
        rarity: "Epic",
        description: "Contains random champion shard or skin permanent",
        probability: 12.5,
        color: "bg-purple-500",
        details: {
          "Champion Shards": 70,
          "Skin Shards": 25,
          "Ward Skins": 5,
        },
      },
      {
        id: "masterwork",
        name: "Masterwork Chest",
        rarity: "Legendary",
        description: "Contains guaranteed skin shard and bonus materials",
        probability: 3.2,
        color: "bg-yellow-500",
        details: {
          "Skin Shards": 85,
          "Champion Shards": 10,
          "Bonus Materials": 5,
        },
      },
      {
        id: "orb",
        name: "Orb of Enlightenment",
        rarity: "Rare",
        description: "Contains essence and champion shards",
        probability: 18.7,
        color: "bg-blue-500",
        details: {
          Essence: 60,
          "Champion Shards": 30,
          "Skin Shards": 10,
        },
      },
    ],
  },
  genshin: {
    name: "Genshin Impact",
    items: [
      {
        id: "acquaint",
        name: "Acquaint Fate",
        rarity: "Common",
        description: "Standard banner wish for characters and weapons",
        probability: 15.2,
        color: "bg-blue-400",
        details: {
          "4-Star Characters": 5.1,
          "4-Star Weapons": 4.5,
          "3-Star Weapons": 90.4,
        },
      },
      {
        id: "intertwined",
        name: "Intertwined Fate",
        rarity: "Epic",
        description: "Limited banner wish for featured characters",
        probability: 8.7,
        color: "bg-purple-500",
        details: {
          "5-Star Characters": 0.6,
          "4-Star Characters": 5.1,
          "4-Star Weapons": 4.5,
          "3-Star Weapons": 89.8,
        },
      },
      {
        id: "primogem",
        name: "Primogem Bundle",
        rarity: "Rare",
        description: "Premium currency for wishes",
        probability: 22.1,
        color: "bg-yellow-500",
        details: {
          Primogems: 100,
          Stardust: 15,
          Starglitter: 2,
        },
      },
    ],
  },
  cs2: {
    name: "Counter-Strike 2",
    items: [
      {
        id: "case",
        name: "Weapon Case",
        rarity: "Common",
        description: "Contains random weapon skins",
        probability: 20.5,
        color: "bg-orange-500",
        details: {
          "Consumer Grade": 79.92,
          "Industrial Grade": 15.98,
          "Mil-Spec Grade": 3.2,
          Restricted: 0.64,
          Classified: 0.128,
          Covert: 0.0256,
          Contraband: 0.0064,
        },
      },
      {
        id: "knife",
        name: "Knife Case",
        rarity: "Rare",
        description: "Contains knife skins and special items",
        probability: 5.8,
        color: "bg-red-500",
        details: {
          "Knife Skins": 80,
          "Special Items": 15,
          "StatTrak Items": 5,
        },
      },
      {
        id: "sticker",
        name: "Sticker Capsule",
        rarity: "Uncommon",
        description: "Contains team and player stickers",
        probability: 12.3,
        color: "bg-green-500",
        details: {
          "Team Stickers": 70,
          "Player Stickers": 25,
          "Holo Stickers": 5,
        },
      },
    ],
  },
  fifa24: {
    name: "FIFA 24",
    items: [
      {
        id: "pack",
        name: "Gold Pack",
        rarity: "Common",
        description: "Contains 12 random players",
        probability: 25.0,
        color: "bg-yellow-500",
        details: {
          "Gold Players": 75,
          "Silver Players": 20,
          "Bronze Players": 5,
        },
      },
      {
        id: "rare",
        name: "Rare Gold Pack",
        rarity: "Rare",
        description: "Contains 12 rare gold players",
        probability: 12.5,
        color: "bg-orange-500",
        details: {
          "Rare Gold Players": 85,
          "Special Cards": 10,
          Coins: 5,
        },
      },
      {
        id: "ultimate",
        name: "Ultimate Pack",
        rarity: "Epic",
        description: "Contains 24 premium players",
        probability: 8.3,
        color: "bg-purple-500",
        details: {
          "Premium Players": 90,
          "Special Cards": 8,
          Coins: 2,
        },
      },
    ],
  },
};

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function GameDetailPage({ params }: PageProps) {
  return <GameDetailClient params={params} />;
}

function GameDetailClient({ params }: { params: Promise<{ id: string }> }) {
  const [selectedItem, setSelectedItem] = useState<string>("");
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [notifications, setNotifications] = useState<Set<string>>(new Set());
  const [game, setGame] = useState<GameData | undefined>(undefined);
  const [gameId, setGameId] = useState<string>("");

  // useEffect를 사용하여 params를 처리
  useEffect(() => {
    const resolveParams = async () => {
      const resolvedParams = await params;
      const id = resolvedParams.id;
      setGameId(id);
      setGame(gameData[id]);
    };
    resolveParams();
  }, [params]);

  if (!game) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            게임을 찾을 수 없습니다
          </h2>
          <Link href="/games">
            <Button>게임 목록으로 돌아가기</Button>
          </Link>
        </div>
      </div>
    );
  }

  const currentItem =
    game.items.find((item) => item.id === selectedItem) || game.items[0];

  const toggleFavorite = () => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(currentItem.id)) {
      newFavorites.delete(currentItem.id);
    } else {
      newFavorites.add(currentItem.id);
    }
    setFavorites(newFavorites);
  };

  const toggleNotification = () => {
    const newNotifications = new Set(notifications);
    if (newNotifications.has(currentItem.id)) {
      newNotifications.delete(currentItem.id);
    } else {
      newNotifications.add(currentItem.id);
    }
    setNotifications(newNotifications);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/games">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">MOAVA</h1>
            </div>
            <Link href="/notifications">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">아이템 목록</h2>
        </div>

        {/* Item Tabs */}
        <div className="flex flex-wrap gap-4 mb-8">
          {game.items.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedItem(item.id)}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                selectedItem === item.id ||
                (!selectedItem && item.id === game.items[0].id)
                  ? `${item.color} text-white`
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              {item.name}: {item.probability}%
            </button>
          ))}
        </div>

        {/* Selected Item Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Item Card */}
          <Card>
            <CardContent className="p-6">
              <div
                className={`w-16 h-16 ${currentItem.color} rounded-lg mb-4`}
              ></div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {currentItem.name}
              </h3>
              <p className="text-gray-600 mb-2">{currentItem.rarity}</p>
              <p className="text-gray-700">{currentItem.description}</p>
            </CardContent>
          </Card>

          {/* Detailed Info */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">상세 정보</h3>
            <Card>
              <CardContent className="p-6">
                <div className="space-y-3">
                  {Object.entries(currentItem.details).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex justify-between items-center"
                    >
                      <span className="text-gray-700">{key}</span>
                      <span className="font-semibold text-gray-900">
                        {value}%
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* Acquisition Probability */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">획득 확률</h3>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {currentItem.probability}%
                </div>
                <p className="text-gray-600">
                  평균 {Math.ceil(100 / currentItem.probability)}번 시도 필요
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">빠른 액션</h3>
            <div className="space-y-3">
              <Button
                variant={favorites.has(currentItem.id) ? "default" : "outline"}
                className="w-full justify-start"
                onClick={toggleFavorite}
              >
                <Star
                  className={`h-5 w-5 mr-2 ${
                    favorites.has(currentItem.id) ? "fill-current" : ""
                  }`}
                />
                즐겨찾기 {favorites.has(currentItem.id) ? "제거" : "추가"}
              </Button>
              <Button
                variant={
                  notifications.has(currentItem.id) ? "default" : "outline"
                }
                className="w-full justify-start"
                onClick={toggleNotification}
              >
                <Bell className="h-5 w-5 mr-2" />
                알림 {notifications.has(currentItem.id) ? "해제" : "설정"}
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
