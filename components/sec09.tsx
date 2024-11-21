"use client";
import { RadioGroup } from "@/components/ui/radio-group";

// props の型を定義
type Sec09Props = {
  options: { id: number; label: string; value: number }[]; // オプション配列
  onSelectionChange: (value: number) => void; // 選択変更時の関数
  onNext: () => void; // 次のセクションに進む関数
};
export default function Sec09({ options, onSelectionChange }: Sec09Props) {
  return (
    <article>
      <section id="section9">
        <h2 className="p-6 text-xl">
          肌に赤みが出やすく
          <br />
          ゆらぎやすいですか？
        </h2>
        <RadioGroup
          onValueChange={(value) => {
            onSelectionChange(Number(value));
          }}
        >
          <div className="grid grid-cols-2 gap-4">
            {options.map((option) => (
              <label key={option.id} className="flex items-center space-x-2">
                <input
                  type="radio"
                  value={option.value}
                  name="skincare02"
                  onChange={() => onSelectionChange(option.value)} // 選択値を追跡
                  className="radio-input"
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        </RadioGroup>
      </section>
    </article>
  );
}
