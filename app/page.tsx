"use client";

import { useState } from "react";
import Question from "@/components/questions/page";
import { questionsData } from "@/components/questionsData";

export default function Home() {
  const [currentSection, setCurrentSection] = useState(0); // 現在のセクションを管理
  const [selectedValues, setSelectedValues] = useState<number[][]>(
    Array(questionsData.length).fill([]) // 選択肢があるセクションのみを対象に初期化
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // エラーメッセージ
  const [userName, setUserName] = useState<string>(""); // ユーザー名
  const finalQuestionIndex = questionsData.length; // `questionsData` の最後のセクション
  const finalSectionIndex = finalQuestionIndex + 1; // 名前入力フォームを含む最後のセクションのインデックス

  // onSelectionChangeの関数を修正
  const handleSelectionChange = (value: number | number[]) => {
    const values = Array.isArray(value) ? value : [value]; // 必ず配列に変換

    if (currentSection > 0 && currentSection <= finalQuestionIndex) {
      setSelectedValues((prev) => {
        const updated = [...prev];
        updated[currentSection - 1] = values; // 対応するインデックスに値を格納
        return updated;
      });
    }

    // id: 4の場合に選択数をチェック
    const currentQuestion = questionsData[currentSection - 1];
    if (currentQuestion?.id === 3 && values.length > 3) {
      setErrorMessage("最大3つまで選択可能です。");
    } else {
      setErrorMessage(null); // エラーメッセージをリセット
    }
  };
  // 名前入力フォーム用
  const handleNameChange = (value: string) => {
    setUserName(value);
  };
  const goToNextSection = () => {
    // 次のセクションに進む前にエラーメッセージをリセット
    setErrorMessage(null);
    console.log("選択値:", selectedValues);

    if (currentSection <= finalSectionIndex) {
      setCurrentSection((prev) => prev + 1);

      // 次のセクションの選択値をリセット
      const nextQuestion = questionsData[currentSection + 1];
      if (nextQuestion.displayType !== "none") {
        const index = questionsData.findIndex((q) => q.id === nextQuestion.id);
        if (index !== -1) {
          setSelectedValues((prev) => {
            const updated = [...prev];
            updated[index] = []; // 次のセクションの選択をリセット
            return updated;
          });
        }
      }
    }
  };

  const goToPreviousSection = () => {
    if (currentSection > 0) {
      setErrorMessage(null); // エラーメッセージをクリア
      setCurrentSection((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    // 選択肢の合計値を計算
    const totalScore = selectedValues.flat().reduce((sum, value) => sum + value, 0);

    // 遷移先を判定
    let destination = "/result/a"; // デフォルトは a
    if (totalScore > 100 && totalScore <= 200) {
      destination = "/result/b";
    } else if (totalScore > 200) {
      destination = "/result/c";
    }
    // クエリパラメータ付きのURLに遷移
    window.location.href = `${destination}?userName=${encodeURIComponent(userName)}`;
  };

  const currentQuestion = currentSection > 0 && currentSection <= finalQuestionIndex ? questionsData[currentSection - 1] : null;

  // 次へボタンの有効化条件
  const isNextEnabled = (() => {
    // if (currentSection === 0) {
    //   return true; // 最初のセクションではボタンを常に有効化
    // }
    if (currentSection > 0 && currentSection <= finalQuestionIndex) {
      const currentValues = selectedValues[currentSection - 1] || [];
      return currentValues.length > 0;
    }
    if (currentSection === finalSectionIndex) {
      return userName.trim() !== ""; // 名前入力が空でない場合に有効
    }
    return true;
  })();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-6 text-center">
        {/* ページネーション */}
        {currentSection !== 0 && currentSection <= finalQuestionIndex && (
          <div className="mt-6 flex justify-center space-x-2">
            {questionsData.map((_, index) => {
              const isActive = index + 1 === currentSection; // 現在のセクションか判定
              return (
                <button
                  key={index}
                  disabled // 全てのボタンを無効化
                  className={`w-8 h-8 rounded-full ${
                    isActive
                      ? "bg-blue-500 text-white cursor-not-allowed" // 現在のページ
                      : "bg-gray-300 text-black cursor-not-allowed" // 他のページ
                  }`}
                >
                  {index + 1}
                </button>
              );
            })}
          </div>
        )}
        {/* 最初のセクション */}
        {currentSection === 0 && (
          <div>
            <h1 className="text-xl font-bold mb-4">肌診断</h1>
            <p className="mb-6">
              <>
                肌悩みはたくさんあるけど
                <br />
                成分のことは詳しくないし
                <br />
                どんな化粧品が自分に合うのかわからない！
                <br />
                そんなあなたのお気に入りを見つける
                <br />
                ヒントをご提案します。
              </>
            </p>
            <button onClick={goToNextSection} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              次へ
            </button>
          </div>
        )}
        {/* 質問セクション */}
        {currentSection > 0 && currentSection <= finalQuestionIndex && (
          <Question question={currentQuestion!} onSelectionChange={handleSelectionChange} defaultSelected={selectedValues[currentSection - 1] || []} />
        )}
        {/* 最後のセクション */}
        {currentSection === finalSectionIndex && (
          <div>
            <h2 className="text-lg font-bold mb-4">お名前を入力してください</h2>
            <input type="text" value={userName} onChange={(e) => handleNameChange(e.target.value)} className="w-full p-2 border rounded" placeholder="お名前" />
          </div>
        )}

        {/* エラーメッセージの表示 */}
        {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}

        {/* 次へ/戻るボタン */}
        <div className="mt-6 flex justify-between">
          {currentSection > 0 && (
            <button onClick={goToPreviousSection} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
              戻る
            </button>
          )}
          {currentSection > 0 && currentSection <= finalQuestionIndex && (
            <button
              onClick={goToNextSection}
              disabled={!isNextEnabled} // 有効性を管理
              className={`px-4 py-2 bg-blue-500 rounded ${
                isNextEnabled
                  ? "bg-blue-500 text-white hover:bg-blue-600" // 有効時のスタイル
                  : "bg-gray-300 text-gray-500 cursor-not-allowed" // 無効時のスタイル
              }`}
            >
              次へ
            </button>
          )}
          {currentSection === finalSectionIndex && (
            <button
              onClick={handleSubmit}
              disabled={!isNextEnabled}
              className={`px-4 py-2 rounded ${isNextEnabled ? "bg-green-500 text-white hover:bg-green-600" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
            >
              送信
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
