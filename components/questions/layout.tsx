import React from "react";

type LayoutProps = {
  title: string;
  paragraph?: React.ReactNode; // React要素を許容
  condition: string;
  children: React.ReactNode; // 中身（セクション内容）を受け取る
};

export default function Layout({ title, condition, paragraph, children }: LayoutProps) {
  return (
    <section className="p-4">
      <h2 className="text-xl font-semibold">{title}</h2>
      {paragraph && <p className="mt-2 text-sm text-gray-700">{paragraph}</p>}
      <p className="text-sm text-gray-600">{condition}</p>
      <div className="mt-4">{children}</div>
    </section>
  );
}
