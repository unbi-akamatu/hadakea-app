"use client";

import { useState, useEffect } from "react";
import FirstPage from "@/components/firstPage";
import QuestionPage from "@/components/questionPage";
import FormPage from "@/components/formPage";
import { questionsData } from "@/components/questionsData";

export default function Home() {
  const [currentSection, setCurrentSection] = useState(0); // 現在のセクションを管理
  const [selectedValues, setSelectedValues] = useState<number[][]>(
    Array(questionsData.length).fill([]) // SSR と一致する初期値
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // エラーメッセージ
  const [isClient, setIsClient] = useState(false); // クライアントレンダリングのフラグ

  useEffect(() => {
    setIsClient(true); // クライアントサイドで有効化
  }, []);

  if (!isClient) {
    return null; // サーバーとクライアントでの不一致を防止
  }

  const finalSectionIndex = questionsData.length + 1; // 名前入力フォームを含む最後のセクションのインデックス

  // ページ遷移ロジック
  const goToNextSection = () => {
    setErrorMessage(null);
    if (currentSection < finalSectionIndex) {
      setCurrentSection((prev) => prev + 1);
    }
  };

  const goToPreviousSection = () => {
    if (currentSection > 0) {
      setErrorMessage(null);
      setCurrentSection((prev) => prev - 1);
    }
  };

  // 質問の選択状態を更新
  const handleSelectionChange = (sectionIndex: number, value: number | number[], isChecked?: boolean) => {
    setSelectedValues((prev) => {
      const updated = [...prev];
      const currentValues = updated[sectionIndex] || [];

      if (questionsData[sectionIndex]?.displayType === "radio") {
        updated[sectionIndex] = Array.isArray(value) ? value : [value];
      } else if (questionsData[sectionIndex]?.displayType === "checkbox") {
        if (Array.isArray(value)) {
          console.error("Checkboxの選択で不正な値が渡されました", value);
          return prev; // 不正な値の場合、状態を更新しない
        }
        if (isChecked) {
          updated[sectionIndex] = [...currentValues, value];
        } else {
          updated[sectionIndex] = currentValues.filter((v) => v !== value);
        }
      }
      return updated;
    });
    console.log("Component re-rendered");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-6 text-center">
        {currentSection === 0 && <FirstPage onNext={goToNextSection} />}
        {currentSection > 0 && currentSection <= questionsData.length && (
          <QuestionPage
            question={questionsData[currentSection - 1]}
            sectionIndex={currentSection - 1}
            selectedValues={selectedValues[currentSection - 1] || []}
            onSelectionChange={handleSelectionChange}
            errorMessage={errorMessage}
            onNext={goToNextSection}
            onPrevious={goToPreviousSection}
            onJumpToSection={(sectionIndex) => setCurrentSection(sectionIndex + 1)} // ページネーション
            totalSections={questionsData.length}
          />
        )}
        {currentSection === finalSectionIndex && <FormPage selectedValues={selectedValues} onPrevious={goToPreviousSection} />}
      </div>
    </div>
  );
}
