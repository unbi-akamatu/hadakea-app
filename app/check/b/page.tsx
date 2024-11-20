"use client";
import { useEffect, useState } from "react";

export default function B() {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const storedUsername = sessionStorage.getItem("username"); // セッションストレージから名前を取得
    setUsername(storedUsername);

    // セッションストレージをクリア
    sessionStorage.removeItem("username");
  }, []);

  return (
    <div>
      <h1>診断結果</h1>
      <p>{username ? `${username}さん、診断結果はこちらです！` : "名前がありません"}</p>
    </div>
  );
}
