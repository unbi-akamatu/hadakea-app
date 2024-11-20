"use client";
import { Checkbox } from "@/components/ui/checkbox";

// props の型を定義
type Sec02Props = {
  options: { id: number; label: string; value: number }[]; // オプション配列
  onSelectionChange: (value: number) => void; // 選択変更時の関数
  onNext: () => void; // 次のセクションに進む関数
};
export default function Sec02({ options, onSelectionChange }: Sec02Props) {
  return (
    <article>
      <section id="section2">
        <h2 className="p-6 text-xl">
          普段のスキンケアアイテムを
          <br />
          教えてください
          <span className="text-sm block pt-2">※複数選択可</span>
        </h2>
        <div className="items-top space-x-2">
          <div className="grid grid-rows-5 grid-flow-col gap-4 leading-none text-left">
            {options.map((option) => (
              <label key={option.id} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                <Checkbox onCheckedChange={(checked) => checked && onSelectionChange(option.value)} />
                <span className="pl-2">{option.label}</span>
              </label>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
