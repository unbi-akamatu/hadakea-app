"use client";

import { useState } from "react";
import Question from "@/components/questions/page";
import { questionsData } from "@/components/questionsData";

export default function Home() {
  // ページネーション用: 選択肢があるセクションだけを対象にする
  const paginationQuestions = questionsData.filter((q) => q.displayType !== "none");

  const [currentSection, setCurrentSection] = useState(0); // 現在のセクションを管理
  const [selectedValues, setSelectedValues] = useState<number[][]>(
    Array(paginationQuestions.length).fill([]) // 選択肢があるセクションのみを対象に初期化
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // エラーメッセージ

  // onSelectionChangeの関数を修正
  const handleSelectionChange = (value: number | number[]) => {
    const values = Array.isArray(value) ? value : [value]; // 必ず配列に変換

    // 現在のセクションが選択肢を持つ場合のみ値を更新
    const currentQuestion = questionsData[currentSection];

    if (currentQuestion.displayType !== "none") {
      setSelectedValues((prev) => {
        // ページネーション用データ内でのインデックスを取得
        const index = paginationQuestions.findIndex((q) => q.id === currentQuestion.id);

        if (index === -1) return prev; // 該当セクションがなければ変更なし

        const updated = [...prev];
        updated[index] = values; // 対応するインデックスに値を格納
        return updated;
      });
    }

    // id: 4の場合に選択数をチェック
    if (currentQuestion.id === 4 && values.length > 3) {
      setErrorMessage("最大3つまで選択可能です。");
    } else {
      setErrorMessage(null); // エラーメッセージをリセット
    }
  };

  const goToNextSection = () => {
    // 次のセクションに進む前にエラーメッセージをリセット
    setErrorMessage(null);
    console.log("選択値:", selectedValues);
    if (currentSection < questionsData.length - 1) {
      setCurrentSection((prev) => prev + 1);

      // 次のセクションの選択値をリセット
      const nextQuestion = questionsData[currentSection + 1];
      if (nextQuestion.displayType !== "none") {
        const index = paginationQuestions.findIndex((q) => q.id === nextQuestion.id);
        if (index !== -1) {
          setSelectedValues((prev) => {
            const updated = [...prev];
            updated[index] = []; // 次のセクションの選択をリセット
            return updated;
          });
        }
      }
    }
  };

  const goToPreviousSection = () => {
    if (currentSection > 0) {
      setErrorMessage(null); // エラーメッセージをクリア
      setCurrentSection((prev) => prev - 1);
    }
  };

  const currentQuestion = questionsData[currentSection];

  // 次へボタンの有効化条件
  const isNextEnabled = (() => {
    const index = paginationQuestions.findIndex((q) => q.id === currentQuestion.id);

    const currentValues = index !== -1 ? selectedValues[index] : [];

    if (currentQuestion.id === 4) {
      return currentValues.length > 0 && currentValues.length <= 3;
    } else if (currentQuestion.displayType !== "none") {
      return currentValues.length > 0;
    }
    return true;
  })();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-6 text-center">
        {/* ページネーション */}
        {currentSection > 0 && (
          <div className="mt-6 flex justify-center space-x-2">
            {paginationQuestions.map((_, index) => {
              const isActive = questionsData.indexOf(paginationQuestions[index]) === currentSection; // 現在のセクションか判定
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
        <Question
          question={currentQuestion}
          onSelectionChange={handleSelectionChange}
          defaultSelected={currentQuestion.displayType !== "none" ? selectedValues[paginationQuestions.findIndex((q) => q.id === currentQuestion.id)] || [] : []} // 選択肢がある場合のみデフォルト値を渡す
        />
        {/* エラーメッセージの表示 */}
        {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}

        {/* 次へ/戻るボタン */}
        <div className="mt-6 flex justify-between">
          {currentSection > 0 && (
            <button onClick={goToPreviousSection} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
              戻る
            </button>
          )}
          {currentSection < questionsData.length - 1 && (
            <button
              onClick={goToNextSection}
              disabled={!isNextEnabled} // 有効性を管理
              className={`px-4 py-2 bg-blue-500 rounded ${
                isNextEnabled
                  ? "bg-blue-500 text-white hover:bg-blue-600" // 有効時のスタイル
                  : "bg-gray-300 text-gray-500 cursor-not-allowed" // 無効時のスタイル
              }`}
            >
              次へ
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
