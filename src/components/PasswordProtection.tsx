"use client";

import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

interface PasswordProtectionProps {
  children: React.ReactNode;
  password: string;
}

export default function PasswordProtection({
  children,
  password,
}: PasswordProtectionProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [inputPassword, setInputPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // 로컬 스토리지에서 인증 상태 확인
    const auth = localStorage.getItem("moava-auth");
    if (auth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputPassword === password) {
      setIsAuthenticated(true);
      localStorage.setItem("moava-auth", "true");
      setError("");
    } else {
      setError("비밀번호가 올바르지 않습니다.");
    }
  };

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-900">
            🔒 접근 제한
          </CardTitle>
          <CardDescription className="text-gray-600">
            이 사이트에 접근하려면 비밀번호가 필요합니다
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="비밀번호를 입력하세요"
                value={inputPassword}
                onChange={(e) => setInputPassword(e.target.value)}
                className="text-center"
                autoFocus
              />
              {error && (
                <p className="text-sm text-red-600 text-center">{error}</p>
              )}
            </div>
            <Button type="submit" className="w-full">
              접속하기
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
