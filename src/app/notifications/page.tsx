"use client";

import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import Link from "next/link";
import { useState } from "react";

export default function NotificationsPage() {
  const [settings, setSettings] = useState({
    dropRateIncrease: false,
    eventNotifications: false,
    pushNotifications: true,
    emailNotifications: false,
  });

  const handleSettingChange = (key: keyof typeof settings, value: boolean) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSave = () => {
    // 실제로는 API 호출이나 상태 저장 로직이 들어갈 수 있습니다
    console.log("설정 저장:", settings);
    // 저장 후 이전 페이지로 이동
    window.history.back();
  };

  const handleCancel = () => {
    // 취소 시 이전 페이지로 이동
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">MOAVA</h1>
            </div>
            <div className="text-lg font-semibold text-gray-900">알림 설정</div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* 확률 변경 알림 섹션 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900">
                확률 변경 알림
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* 드랍률 증가 알림 */}
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 mb-1">
                    드랍률 증가 알림
                  </h3>
                  <p className="text-sm text-gray-600">
                    아이템 드랍률이 증가할 때 알림받기
                  </p>
                </div>
                <Switch
                  checked={settings.dropRateIncrease}
                  onCheckedChange={(checked) =>
                    handleSettingChange("dropRateIncrease", checked)
                  }
                />
              </div>

              {/* 이벤트 알림 */}
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 mb-1">
                    이벤트 알림
                  </h3>
                  <p className="text-sm text-gray-600">
                    특별 이벤트 및 프로모션 알림받기
                  </p>
                </div>
                <Switch
                  checked={settings.eventNotifications}
                  onCheckedChange={(checked) =>
                    handleSettingChange("eventNotifications", checked)
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* 알림 방법 섹션 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900">
                알림 방법
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* 푸시 알림 */}
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 mb-1">푸시 알림</h3>
                  <p className="text-sm text-gray-600">
                    브라우저 푸시 알림 받기
                  </p>
                </div>
                <Switch
                  checked={settings.pushNotifications}
                  onCheckedChange={(checked) =>
                    handleSettingChange("pushNotifications", checked)
                  }
                />
              </div>

              {/* 이메일 알림 */}
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 mb-1">
                    이메일 알림
                  </h3>
                  <p className="text-sm text-gray-600">이메일로 알림 받기</p>
                </div>
                <Switch
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) =>
                    handleSettingChange("emailNotifications", checked)
                  }
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 하단 액션 버튼 */}
        <div className="flex gap-4 mt-8">
          <Button
            onClick={handleSave}
            className="flex-1 bg-blue-600 hover:bg-blue-700"
          >
            설정 완료
          </Button>
          <Button variant="outline" onClick={handleCancel} className="flex-1">
            취소
          </Button>
        </div>
      </main>
    </div>
  );
}
