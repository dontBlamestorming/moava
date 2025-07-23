import { Bell, Search, List, TrendingUp, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function Home() {
  const recentSearches = [
    "League of Legends",
    "Genshin Impact",
    "Counter-Strike 2",
  ];

  const popularGames = [
    { name: "League of Legends", platform: "PC" },
    { name: "Genshin Impact", platform: "PC, Mobile" },
    { name: "Counter-Strike 2", platform: "PC" },
    { name: "FIFA 24", platform: "PC, Console" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">MOAVA</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">Wireframe</span>
              <Link href="/notifications">
                <Button variant="ghost" size="icon">
                  <Bell className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Title Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            모든 게임확률을 MOAVA
          </h2>
          <p className="text-lg text-gray-600">
            3클릭으로 아이템 드랍률 확인하고 알림 설정하기
          </p>
        </div>

        {/* Search Section */}
        <div className="mb-12">
          <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder="게임 이름를 검색하세요"
                className="pl-10 h-12 text-base"
              />
            </div>
            <Link href="/games">
              <Button className="h-12 px-6 text-base">게임 찾기</Button>
            </Link>
            <Button variant="outline" className="h-12 px-6 text-base">
              <List className="h-5 w-5 mr-2" />
              게임 목록
            </Button>
          </div>
        </div>

        {/* Recent Searches */}
        <div className="mb-12">
          <h3 className="text-xl font-bold text-gray-900 mb-4">최근 검색</h3>
          <div className="flex flex-wrap gap-2">
            {recentSearches.map((search, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="px-3 py-2 text-sm cursor-pointer hover:bg-gray-200"
              >
                {search}
                <X className="h-4 w-4 ml-2" />
              </Badge>
            ))}
          </div>
        </div>

        {/* Popular Games */}
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-6">인기 게임</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {popularGames.map((game, index) => (
              <Card
                key={index}
                className="hover:shadow-md transition-shadow cursor-pointer"
              >
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-500 rounded-lg flex-shrink-0"></div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 truncate">
                        {game.name}
                      </h4>
                      <p className="text-sm text-gray-500">{game.platform}</p>
                    </div>
                    <TrendingUp className="h-5 w-5 text-gray-400 flex-shrink-0" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
