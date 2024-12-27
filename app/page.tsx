"use client";

import { useState, useCallback, useEffect } from "react";
import FirstPage from "@/components/firstPage";
import QuestionPage from "@/components/questionPage";
import FormPage from "@/components/formPage";
import { questionsData } from "@/components/questionsData";

export default function Home() {
  const [currentSection, setCurrentSection] = useState(0); // 現在のセクション
  const [selectedValues, setSelectedValues] = useState<number[][]>(
    () => Array.from({ length: questionsData.length }, () => []) // 初期化
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const finalSectionIndex = questionsData.length + 1;

  /** 次のセクションに進む */
  const goToNextSection = useCallback(() => {
    setErrorMessage(null);
    if (currentSection < finalSectionIndex) {
      setCurrentSection((prev) => prev + 1);
    }
  }, [currentSection, finalSectionIndex]);

  /** 前のセクションに戻る */
  const goToPreviousSection = useCallback(() => {
    if (currentSection > 0) {
      setErrorMessage(null);
      setCurrentSection((prev) => prev - 1);
    }
  }, [currentSection]);

  /** セクションジャンプ */
  const jumpToSection = useCallback((sectionIndex: number) => {
    setErrorMessage(null);
    setCurrentSection(sectionIndex + 1);
  }, []);

  /** 質問の選択状態を更新 */
  const handleSelectionChange = useCallback((sectionIndex: number, value: number | number[], isChecked?: boolean) => {
    setSelectedValues((prev) => {
      const updated = prev.map((values, index) => {
        if (index !== sectionIndex) return values; // 他のセクションはそのまま
        if (questionsData[sectionIndex]?.displayType === "radio") {
          return typeof value === "number" ? [value] : values;
        } else if (questionsData[sectionIndex]?.displayType === "checkbox") {
          if (typeof value === "number" && isChecked !== undefined) {
            return isChecked ? [...values, value] : values.filter((v) => v !== value);
          }
        }
        return values;
      });

      return updated;
    });
  }, []);

  /** 選択状態をログ出力 */
  useEffect(() => {
    console.log("現在の選択状態:", selectedValues);
  }, [selectedValues]);

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
            onJumpToSection={jumpToSection}
            totalSections={questionsData.length}
          />
        )}

        {currentSection === finalSectionIndex && <FormPage selectedValues={selectedValues} onPrevious={goToPreviousSection} />}
      </div>
    </div>
  );
}
