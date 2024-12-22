export type QuestionData = {
  id: number;
  title: string;
  condition: string;
  paragraph?: React.ReactNode; // React要素を許容
  options: { id: number; label: string; value: number }[];
  displayType: "none" | "checkbox" | "radio" | "form";
  maxSelections?: number; // 追加
};

export const questionsData: QuestionData[] = [
  {
    id: 1,
    title: "普段のスキンケアアイテムを教えてください",
    condition: "※複数選択可",
    options: [
      { id: 1, label: "クレンジング", value: 10 },
      { id: 2, label: "洗顔フォーム", value: 30 },
      { id: 3, label: "化粧水", value: 20 },
      { id: 4, label: "化粧水", value: 22 },
      { id: 5, label: "乳液", value: 12 },
      { id: 6, label: "クリーム", value: 26 },
      { id: 7, label: "美容液", value: 21 },
      { id: 8, label: "シートマスク", value: 4 },
      { id: 9, label: "洗い流しパック", value: 14 },
      { id: 10, label: "特になし", value: 6 },
    ],
    displayType: "checkbox",
  },
  {
    id: 2,
    title: "一日の中で、長い時間を過ごしているのはどちらですか？",
    condition: "",
    options: [
      { id: 1, label: "紫外線が強く当たる屋外", value: 10 },
      { id: 2, label: "屋外", value: 20 },
      { id: 3, label: "屋外／屋内", value: 30 },
      { id: 4, label: "屋内", value: 40 },
      { id: 5, label: "エアコンが効いた屋内", value: 50 },
    ],
    displayType: "radio", // ラジオボタン表示
  },
  {
    id: 3,
    title: "日常生活で気になる環境・習慣は何ですか？",
    condition: "※複数選択可（最大３個）",
    options: [
      { id: 1, label: "空気の乾燥", value: 10 },
      { id: 2, label: "花粉・大気汚染", value: 16 },
      { id: 3, label: "紫外線", value: 20 },
      { id: 4, label: "ストレス", value: 30 },
      { id: 5, label: "疲れ・睡眠不足", value: 12 },
      { id: 6, label: "食生活", value: 15 },
      { id: 7, label: "運動不足", value: 25 },
    ],
    displayType: "checkbox", // チェックボックス表示
    maxSelections: 3, // 最大選択数を指定
  },
  {
    id: 4,
    title: "すっぴん肌トーンの印象が暗く感じますか？",
    condition: "",
    options: [
      { id: 1, label: "感じる", value: 10 },
      { id: 2, label: "たまに感じる", value: 0 },
      { id: 3, label: "特に感じない", value: 6 },
    ],
    displayType: "radio", // ラジオボタン表示
  },
  {
    id: 5,
    title: "頬に触れるとザラツキを感じますか？",
    condition: "",
    options: [
      { id: 1, label: "感じる", value: 10 },
      { id: 2, label: "部分的に感じる", value: 0 },
      { id: 3, label: "特に感じない", value: 6 },
    ],
    displayType: "radio", // ラジオボタン表示
  },
  {
    id: 6,
    title: "朝、顔がべたつきますか？",
    condition: "",
    options: [
      { id: 1, label: "感じる", value: 10 },
      { id: 2, label: "やや感じる", value: 0 },
      { id: 3, label: "特に感じない", value: 6 },
    ],
    displayType: "radio", // ラジオボタン表示
  },
  {
    id: 7,
    title: "指で顔全体を押すとふっくら弾力を感じますか？",
    condition: "",
    options: [
      { id: 1, label: "感じる", value: 10 },
      { id: 2, label: "やや感じる", value: 0 },
      { id: 3, label: "特に感じない", value: 8 },
    ],
    displayType: "radio", // ラジオボタン表示
  },
  {
    id: 8,
    title: "肌に赤みが出やすくゆらぎやすいですか？",
    condition: "",
    options: [
      { id: 1, label: "ゆらぎやすい", value: 10 },
      { id: 2, label: "たまにゆらぐことがある", value: 0 },
      { id: 3, label: "あまりゆるがない", value: 2 },
    ],
    displayType: "radio", // ラジオボタン表示
  },
  {
    id: 9,
    title: "年齢を教えてください",
    condition: "",
    options: [
      { id: 1, label: "10代前半", value: 10 },
      { id: 2, label: "10代後半", value: 15 },
      { id: 3, label: "20代前半", value: 20 },
      { id: 4, label: "20代後半", value: 25 },
      { id: 5, label: "30代前半", value: 28 },
      { id: 6, label: "30代後半", value: 30 },
      { id: 7, label: "40代前半", value: 32 },
      { id: 8, label: "40代後半", value: 34 },
      { id: 9, label: "50代前半", value: 36 },
      { id: 10, label: "50代後半", value: 38 },
      { id: 11, label: "60代以上", value: 40 },
    ],
    displayType: "radio", // ラジオボタン表示
  },
];
