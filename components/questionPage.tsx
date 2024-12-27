"use client";

import { useState, useEffect, memo } from "react";
import Layout from "@/components/layout";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { QuestionData } from "@/components/questionsData";

type QuestionPageProps = {
  question: QuestionData;
  sectionIndex: number;
  selectedValues: number[];
  onSelectionChange: (sectionIndex: number, value: number | number[], isChecked?: boolean) => void;
  errorMessage: string | null;
  onNext: () => void;
  onPrevious: () => void;
  onJumpToSection: (sectionIndex: number) => void;
  totalSections: number;
};

const PaginationButton = memo(({ index, isActive, onClick }: { index: number; isActive: boolean; onClick: () => void }) => (
  <button onClick={onClick} className={`w-8 h-8 rounded-full ${isActive ? "bg-blue-500 text-white" : "bg-gray-300 text-black hover:bg-gray-400"}`}>
    {index + 1}
  </button>
));

export default function QuestionPage({ question, sectionIndex, selectedValues, onSelectionChange, errorMessage, onNext, onPrevious, onJumpToSection, totalSections }: QuestionPageProps) {
  const [localErrorMessage, setLocalErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    setLocalErrorMessage(null); // セクション変更時にエラーメッセージをリセット
  }, [sectionIndex]);

  const handleCheckboxChange = (value: number, isChecked: boolean) => {
    if (question.id === 3 && isChecked && selectedValues.length >= 3) {
      setLocalErrorMessage("最大3つまで選択可能です。");
      return;
    }
    setLocalErrorMessage(null);
    onSelectionChange(sectionIndex, value, isChecked);
  };

  return (
    <div>
      <div className="mt-6 flex justify-center space-x-2">
        {Array.from({ length: totalSections }, (_, index) => (
          <PaginationButton key={index} index={index} isActive={index === sectionIndex} onClick={() => onJumpToSection(index)} />
        ))}
      </div>

      <Layout title={question.title} paragraph={question.paragraph} condition={question.condition}>
        {question.displayType === "checkbox" && (
          <div className="grid grid-cols-2 gap-4">
            {question.options.map((option) => (
              <label key={option.id} className="flex items-center space-x-2">
                <Checkbox checked={selectedValues.includes(option.value)} onCheckedChange={(isChecked) => handleCheckboxChange(option.value, isChecked as boolean)} />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        )}

        {question.displayType === "radio" && (
          <RadioGroup
            value={selectedValues[0] !== undefined ? String(selectedValues[0]) : ""}
            onValueChange={(value) => onSelectionChange(sectionIndex, Number(value))}
            className="grid grid-cols-2 gap-4"
          >
            {question.options.map((option) => (
              <label key={option.id} className="flex items-center space-x-2">
                <RadioGroupItem value={String(option.value)} />
                <span>{option.label}</span>
              </label>
            ))}
          </RadioGroup>
        )}

        {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
        {localErrorMessage && <p className="text-red-500 mt-4">{localErrorMessage}</p>}

        <div className="mt-6 flex justify-between">
          <button onClick={onPrevious} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
            戻る
          </button>
          <button
            onClick={onNext}
            disabled={selectedValues.length === 0}
            className={`px-4 py-2 rounded ${selectedValues.length > 0 ? "bg-blue-500 text-white hover:bg-blue-600" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
          >
            次へ
          </button>
        </div>
      </Layout>
    </div>
  );
}
