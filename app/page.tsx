"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import Sec01 from "@/components/sec01";
import Sec02 from "@/components/sec02";
import Sec03 from "@/components/sec03";
import Sec04 from "@/components/sec04";
import Sec05 from "@/components/sec05";
import Sec06 from "@/components/sec06";
import Sec07 from "@/components/sec07";
import Sec08 from "@/components/sec08";
import Sec09 from "@/components/sec09";
import Sec10 from "@/components/sec10";
import Sec11 from "@/components/sec11";

export default function Home() {
  const router = useRouter();

  // セクションの現在のインデックスを管理
  const [currentSection, setCurrentSection] = useState(0);

  // 各セクションの選択肢で選ばれた値を記録
  const [selectedValues, setSelectedValues] = useState<number[]>([]);
  const [selectedValue, setSelectedValue] = useState<number | null>(null); // 現在のセクションで選択された値

  // ユーザー名の入力値を記録（最後のセクション用）
  const [username, setUsername] = useState("");

  // クライアントサイドで初期化
  useEffect(() => {
    setCurrentSection(0); // 初期セクションを0に設定
  }, []);

  // セクションが初期化されるまで表示しない
  if (currentSection === null) {
    return null; // 初期化完了まで何も表示しない
  }

  // 選択値を記録する関数
  const handleSelection = (value: number) => {
    setSelectedValue(value); // 現在のセクションの選択を追跡
    setSelectedValues((prev) => [...prev, value]); // 全体の選択履歴に追加
  };

  //フォーム送信処理;
  const handleFormSubmit = () => {
    const total = selectedValues.reduce((acc, curr) => acc + curr, 0); // 合計値を計算

    if (total <= 100) {
      router.push("/check/a");
    } else if (total <= 200) {
      router.push("/check/b");
    } else {
      router.push("/check/c");
    }
  };

  // セクションデータ（各セクションの内容）
  const sections = [
    {
      component: <Sec01 />,
    },
    {
      component: (
        <Sec02
          options={[
            { id: 1, label: "クレンジング", value: 10 },
            { id: 2, label: "洗顔フォーム", value: 30 },
            { id: 3, label: "ふき取り化粧水", value: 30 },
            { id: 4, label: "化粧水", value: 30 },
            { id: 5, label: "乳液", value: 30 },
            { id: 6, label: "クリーム", value: 30 },
            { id: 7, label: "美容液", value: 30 },
            { id: 8, label: "シートマスク", value: 30 },
            { id: 9, label: "洗い流しパック", value: 30 },
            { id: 10, label: "特になし", value: 30 },
          ]}
          onSelectionChange={handleSelection}
          onNext={() => {
            setCurrentSection(currentSection + 1);
            setSelectedValue(null); // 次のセクションに進む際に選択状態をリセット
          }}
        />
      ),
    },
    {
      component: (
        <Sec03
          options={[
            { id: 1, label: "紫外線が強く当たる屋外", value: 10 },
            { id: 2, label: "屋外", value: 30 },
            { id: 3, label: "屋外／屋内", value: 30 },
            { id: 4, label: "屋内", value: 30 },
            { id: 5, label: "エアコンが効いた屋内", value: 30 },
          ]}
          onSelectionChange={(value) => {
            setSelectedValue(value); // ラジオボタンの選択値を追跡
          }}
          onNext={() => {
            setCurrentSection(currentSection + 1);
            setSelectedValue(null);
          }}
        />
      ),
    },
    {
      component: (
        <Sec04
          options={[
            { id: 1, label: "空気の乾燥", value: 10 },
            { id: 2, label: "花粉・大気汚染", value: 16 },
            { id: 3, label: "紫外線", value: 20 },
            { id: 4, label: "ストレス", value: 30 },
            { id: 5, label: "疲れ・睡眠不足", value: 12 },
            { id: 6, label: "食生活", value: 15 },
            { id: 7, label: "運動不足", value: 25 },
          ]}
          onSelectionChange={handleSelection}
          onNext={() => {
            setCurrentSection(currentSection + 1);
            setSelectedValue(null);
          }}
        />
      ),
    },
    {
      component: (
        <Sec05
          options={[
            { id: 1, label: "感じる", value: 10 },
            { id: 2, label: "たまに感じる", value: 30 },
            { id: 3, label: "特に感じない", value: 30 },
          ]}
          onSelectionChange={(value) => {
            setSelectedValue(value); // ラジオボタンの選択値を追跡
          }}
          onNext={() => {
            setCurrentSection(currentSection + 1);
            setSelectedValue(null);
          }}
        />
      ),
    },
    {
      component: (
        <Sec06
          options={[
            { id: 1, label: "感じる", value: 10 },
            { id: 2, label: "部分的に感じる", value: 30 },
            { id: 3, label: "特に感じない", value: 30 },
          ]}
          onSelectionChange={(value) => {
            setSelectedValue(value); // ラジオボタンの選択値を追跡
          }}
          onNext={() => {
            setCurrentSection(currentSection + 1);
            setSelectedValue(null);
          }}
        />
      ),
    },
    {
      component: (
        <Sec07
          options={[
            { id: 1, label: "感じる", value: 10 },
            { id: 2, label: "やや感じる", value: 30 },
            { id: 3, label: "特に感じない", value: 30 },
          ]}
          onSelectionChange={(value) => {
            setSelectedValue(value); // ラジオボタンの選択値を追跡
          }}
          onNext={() => {
            setCurrentSection(currentSection + 1);
            setSelectedValue(null);
          }}
        />
      ),
    },
    {
      component: (
        <Sec08
          options={[
            { id: 1, label: "感じる", value: 10 },
            { id: 2, label: "やや感じる", value: 15 },
            { id: 3, label: "特に感じない", value: 20 },
          ]}
          onSelectionChange={(value) => {
            setSelectedValue(value); // ラジオボタンの選択値を追跡
          }}
          onNext={() => {
            setCurrentSection(currentSection + 1);
            setSelectedValue(null);
          }}
        />
      ),
    },
    {
      component: (
        <Sec09
          options={[
            { id: 1, label: "ゆらぎやすい", value: 10 },
            { id: 2, label: "たまにゆらぐことがある", value: 30 },
            { id: 3, label: "あまりゆるがない", value: 30 },
          ]}
          onSelectionChange={(value) => {
            setSelectedValue(value); // ラジオボタンの選択値を追跡
          }}
          onNext={() => {
            setCurrentSection(currentSection + 1);
            setSelectedValue(null);
          }}
        />
      ),
    },
    {
      component: (
        <Sec10
          options={[
            { id: 1, label: "10代前半", value: 10 },
            { id: 2, label: "10代後半", value: 15 },
            { id: 3, label: "20代前半", value: 20 },
            { id: 4, label: "20代後半", value: 25 },
            { id: 5, label: "30代前半", value: 28 },
            { id: 6, label: "30代後半", value: 30 },
            { id: 7, label: "40代前半", value: 32 },
            { id: 8, label: "40代後半", value: 34 },
            { id: 9, label: "50代前半", value: 36 },
            { id: 10, label: "50代後半", value: 38 },
            { id: 11, label: "60代以上", value: 40 },
          ]}
          onSelectionChange={(value) => {
            setSelectedValue(value); // ラジオボタンの選択値を追跡
          }}
          onNext={() => {
            setCurrentSection(currentSection + 1);
            setSelectedValue(null);
          }}
        />
      ),
    },
    {
      component: (
        <Sec11
          onSubmit={() => {
            const total = selectedValues.reduce((acc, curr) => acc + curr, 0); // 合計値を計算
            if (total <= 50) {
              router.push("/check/a");
            } else if (total <= 100) {
              router.push("/check/b");
            } else {
              router.push("/check/c");
            }
          }}
        />
      ),
    },
  ];

  // 次のセクションに進む関数
  const goToNextSection = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
      setSelectedValue(null); // 次のセクションでは選択状態をリセット
    }
  };
  // 前のセクションに戻る関数
  const goToPreviousSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  // 次へボタンのテキストを動的に設定
  const nextButtonText =
    currentSection === 0 ? (
      <>
        診断を始める
        <br />
        <span className="text-sm text-gray-500">全10問</span>
      </>
    ) : currentSection === sections.length - 1 ? (
      "送信"
    ) : (
      "次のセクションへ"
    );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-6 text-center">
        {/* ページネーション */}
        {currentSection > 0 && (
          <div className="mt-6 flex justify-center space-x-2">
            {sections.slice(1).map((_, index) => {
              const isActive = index + 1 === currentSection; // 現在のセクションか判定
              return (
                <button
                  key={index}
                  disabled // 全てのボタンを無効化
                  className={`w-8 h-8 rounded-full ${
                    isActive
                      ? "bg-blue-500 text-white cursor-not-allowed" // 現在のページ
                      : "bg-gray-300 text-black cursor-not-allowed" // 他のページ
                  }`}
                >
                  {index + 1}
                </button>
              );
            })}
          </div>
        )}

        {/* 現在のセクションを表示 */}
        {sections[currentSection].component}
        {/* ボタンの配置 */}
        <div className="mt-6 flex justify-between">
          {/* 次へボタン */}
          {currentSection < sections.length - 1 && (
            <button
              onClick={goToNextSection}
              disabled={currentSection !== 0 && selectedValue === null} // Sec01以外では選択必須
              className={`px-4 py-2 rounded ${currentSection !== 0 && selectedValue === null ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"}`}
            >
              {nextButtonText}
            </button>
            // <button onClick={goToNextSection} className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            //   {nextButtonText}
            // </button>
          )}
          {/* 戻るボタン */}
          {currentSection > 0 && (
            <button onClick={goToPreviousSection} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
              戻る
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
