type IntroPageProps = {
  onNext: () => void;
};

export default function IntroPage({ onNext }: IntroPageProps) {
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">肌診断</h1>
      <p className="mb-6">
        肌悩みはたくさんあるけど
        <br />
        成分のことは詳しくないし
        <br />
        どんな化粧品が自分に合うのかわからない！
        <br />
        そんなあなたのお気に入りを見つける
        <br />
        ヒントをご提案します。
      </p>
      <button onClick={onNext} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        次へ
      </button>
    </div>
  );
}
