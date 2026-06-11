"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { PageHeader } from "@/components/shared/page-header"
import { ThemeToggle } from "@/components/shared/theme-toggle"
import { Save } from "lucide-react"

// 설정 페이지
export default function SettingsPage() {
  const [isEditing, setIsEditing] = useState(false)
  const [settings, setSettings] = useState({
    name: "홍길동",
    email: "hong@example.com",
    notifications: true,
    newsletter: true,
  })

  const handleSave = () => {
    setIsEditing(false)
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="설정"
        description="계정과 애플리케이션 설정을 관리하세요"
      />

      {/* 프로필 설정 */}
      <Card>
        <CardHeader>
          <CardTitle>프로필 정보</CardTitle>
          <CardDescription>기본 계정 정보를 수정할 수 있습니다</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">이름</Label>
            <Input
              id="name"
              value={settings.name}
              onChange={(e) => setSettings({ ...settings, name: e.target.value })}
              disabled={!isEditing}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">이메일</Label>
            <Input
              id="email"
              type="email"
              value={settings.email}
              onChange={(e) => setSettings({ ...settings, email: e.target.value })}
              disabled={!isEditing}
            />
          </div>

          <div className="flex gap-2">
            {!isEditing ? (
              <Button onClick={() => setIsEditing(true)}>수정</Button>
            ) : (
              <>
                <Button onClick={handleSave}>
                  <Save className="mr-2 size-4" />
                  저장
                </Button>
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  취소
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* 알림 설정 */}
      <Card>
        <CardHeader>
          <CardTitle>알림 설정</CardTitle>
          <CardDescription>어떤 알림을 받을지 선택하세요</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">푸시 알림</p>
              <p className="text-sm text-muted-foreground">
                중요한 업데이트에 대한 알림을 받습니다
              </p>
            </div>
            <Switch
              checked={settings.notifications}
              onCheckedChange={(checked) =>
                setSettings({ ...settings, notifications: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">뉴스레터</p>
              <p className="text-sm text-muted-foreground">
                주간 뉴스레터를 받으시겠어요?
              </p>
            </div>
            <Switch
              checked={settings.newsletter}
              onCheckedChange={(checked) =>
                setSettings({ ...settings, newsletter: checked })
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* 테마 설정 */}
      <Card>
        <CardHeader>
          <CardTitle>테마 설정</CardTitle>
          <CardDescription>애플리케이션 외관을 변경하세요</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">다크 모드</p>
              <p className="text-sm text-muted-foreground">
                Sun/Moon/Monitor 버튼으로 테마를 전환할 수 있습니다
              </p>
            </div>
            <ThemeToggle />
          </div>
        </CardContent>
      </Card>

      {/* 위험한 작업 */}
      <Card className="border-red-200 dark:border-red-900">
        <CardHeader>
          <CardTitle className="text-red-600">위험한 작업</CardTitle>
          <CardDescription>
            이 작업은 실행 취소할 수 없습니다. 주의해서 진행하세요.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="destructive">계정 삭제</Button>
        </CardContent>
      </Card>
    </div>
  )
}
