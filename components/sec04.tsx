"use client";
import { Checkbox } from "@/components/ui/checkbox";
import React from "react";

// props の型を定義
type Sec04Props = {
  options: { id: number; label: string; value: number }[]; // オプション配列
  onSelectionChange: (value: number) => void; // 単一値を通知する
  onNext: () => void; // 次のセクションに進む関数
};

export default function Sec04({ options, onSelectionChange }: Sec04Props) {
  const [selectedValues, setSelectedValues] = React.useState<number[]>([]);

  const handleChange = (value: number, checked: boolean) => {
    if (checked) {
      if (selectedValues.length >= 3) {
        alert("3つまでしか選択できません");
        return;
      }
      const newValues = [...selectedValues, value];
      setSelectedValues(newValues); // 内部状態を更新
      onSelectionChange(value); // 単一値を通知
    } else {
      const newValues = selectedValues.filter((v) => v !== value);
      setSelectedValues(newValues); // 内部状態を更新
      onSelectionChange(value); // 単一値を通知
    }
    console.log("現在の選択:", selectedValues);
  };

  return (
    <article>
      <section id="section4">
        <h2 className="p-6 text-xl">
          日常生活で気になる
          <br />
          環境・習慣は何ですか？
          <span className="text-sm block pt-2">※複数選択可（最大３個）</span>
        </h2>
        <div className="items-top space-x-2">
          <div className="grid grid-rows-5 grid-flow-col gap-4 leading-none text-left">
            {options.map((option) => (
              <label key={option.id} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                <Checkbox
                  checked={selectedValues.includes(option.value)} // 選択済み状態を管理
                  onCheckedChange={(checked) => handleChange(option.value, checked as boolean)} // 状態変更時に通知
                />
                <span className="pl-2">{option.label}</span>
              </label>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
