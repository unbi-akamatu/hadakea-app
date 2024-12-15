"use client";

import Layout from "./layout";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { QuestionData } from "@/components/questionsData";
import { useState, useEffect } from "react";

// Propsの型定義
type QuestionProps = {
  question: QuestionData;
  onSelectionChange: (value: number | number[] | string) => void;
  defaultSelected: number[]; // セクションごとのデフォルト選択値
};

export default function Question({ question, onSelectionChange, defaultSelected }: QuestionProps) {
  const [selectedValues, setSelectedValues] = useState<number[]>([]);
  const [userName, setUserName] = useState<string>(""); // 名前入力用

  useEffect(() => {
    setSelectedValues(defaultSelected); // デフォルト選択値を反映
  }, [defaultSelected]);

  const handleCheckboxChange = (value: number, checked: boolean) => {
    let newValues;
    if (checked) {
      newValues = [...selectedValues, value];
    } else {
      newValues = selectedValues.filter((v) => v !== value);
    }
    setSelectedValues(newValues);
    onSelectionChange(newValues); // 親コンポーネントに通知
  };

  const handleRadioChange = (value: number) => {
    setSelectedValues([value]);
    onSelectionChange(value); // 親コンポーネントに通知
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUserName(value);
    onSelectionChange(value); // 親コンポーネントに名前を渡す
  };

  return (
    <Layout
      title={question.title}
      paragraph={question.paragraph} // 追加の段落を渡す
      condition={question.condition}
    >
      {question.displayType === "checkbox" && (
        <div className="grid grid-cols-2 gap-4">
          {question.options.map((option) => (
            <label key={option.id} className="flex items-center space-x-2">
              <Checkbox
                key={option.id} // 選択肢の ID をキーとして使用
                checked={selectedValues.includes(option.value)}
                onCheckedChange={(checked) => handleCheckboxChange(option.value, checked as boolean)}
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      )}

      {question.displayType === "radio" && (
        <RadioGroup
          key={`${question.id}-${selectedValues[0] || "none"}`} // key属性で完全リセット
          value={selectedValues[0] !== undefined ? String(selectedValues[0]) : undefined} // 初期値を適切に設定
          onValueChange={(value) => handleRadioChange(Number(value))}
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
      {question.displayType === "form" && (
        <div className="mt-4">
          <label htmlFor="username" className="block text-left text-sm font-medium text-gray-700">
            あなたのお名前を入力してください
          </label>
          <input type="text" id="username" value={userName} onChange={handleNameChange} className="mt-2 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
        </div>
      )}
    </Layout>
  );
}
