"use client";

import Layout from "./layout";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { QuestionData } from "@/components/questionsData";
import { useState, useEffect } from "react";

// Propsの型定義
type QuestionProps = {
  question: QuestionData;
  onSelectionChange: (value: number | number[]) => void;
  defaultSelected: number[]; // セクションごとのデフォルト選択値
};

export default function Question({ question, onSelectionChange, defaultSelected }: QuestionProps) {
  const [selectedValues, setSelectedValues] = useState<number[]>(defaultSelected);

  useEffect(() => {
    setSelectedValues(defaultSelected); // デフォルト選択値を反映
  }, [defaultSelected]);

  const [errorMessage, setErrorMessage] = useState<string | null>(null); // 型を修正

  const handleCheckboxChange = (value: number, checked: boolean) => {
    if (checked && selectedValues.length >= (question.maxSelections || Infinity)) {
      setErrorMessage(`最大${question.maxSelections}つまで選択可能です。`);
      return; // 選択数が上限を超えた場合、何もしない
    }

    let newValues;
    if (checked) {
      newValues = [...selectedValues, value];
      setErrorMessage(null); // エラーメッセージをクリア
    } else {
      newValues = selectedValues.filter((v) => v !== value);
    }
    setSelectedValues(newValues);
    onSelectionChange(newValues); // 親コンポーネントに通知
  };

  const handleRadioChange = (value: number) => {
    setSelectedValues([value]);
    setErrorMessage(null); // ラジオボタンではエラーメッセージをクリア
    onSelectionChange(value); // 親コンポーネントに通知
  };

  return (
    <Layout
      title={question.title}
      paragraph={question.paragraph} // 追加の段落を渡す
      condition={question.condition}
    >
      {question.displayType === "checkbox" && question.options.length > 0 && (
        <div className="grid grid-cols-2 gap-4">
          {question.options.map((option) => (
            <label key={option.id} className="flex items-center space-x-2">
              <Checkbox checked={selectedValues.includes(option.value)} onCheckedChange={(checked) => handleCheckboxChange(option.value, checked as boolean)} />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      )}

      {question.displayType === "radio" && question.options.length > 0 && (
        <RadioGroup value={selectedValues[0] !== undefined ? String(selectedValues[0]) : undefined} onValueChange={(value) => handleRadioChange(Number(value))} className="grid grid-cols-2 gap-4">
          {question.options.map((option) => (
            <label key={option.id} className="flex items-center space-x-2">
              <RadioGroupItem value={String(option.value)} />
              <span>{option.label}</span>
            </label>
          ))}
        </RadioGroup>
      )}
      {/* エラーメッセージの表示 */}
      {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
    </Layout>
  );
}
function setErrorMessage(arg0: string) {
  throw new Error("Function not implemented.");
}
