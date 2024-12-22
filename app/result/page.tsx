"use client";

import { useSearchParams } from "next/navigation";

export default function ResultC() {
  const searchParams = useSearchParams();
  const userName = searchParams.get("userName");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-6 text-center">
        <h1 className="text-2xl font-bold mb-4">診断結果 C</h1>
        <p className="text-lg">{userName ? `${userName} さん、診断結果はこちらです！` : "お名前が見つかりませんでした。"}</p>
        <p>スコア 201点以上の結果内容をここに記述します。</p>
      </div>
    </div>
  );
}
