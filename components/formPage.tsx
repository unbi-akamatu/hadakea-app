import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  userName: string;
};

type formPageProps = {
  selectedValues: number[][];
  onPrevious: () => void;
};

export default function formPage({ selectedValues, onPrevious }: formPageProps) {
  const { register, handleSubmit, formState } = useForm<Inputs>({
    defaultValues: { userName: "" },
  });

  const { isValid } = formState;

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const totalScore = selectedValues.flat().reduce((sum, value) => sum + value, 0);
    let destination = "/result/a";

    if (totalScore > 100 && totalScore <= 200) {
      destination = "/result/b";
    } else if (totalScore > 200) {
      destination = "/result/c";
    }

    window.location.href = `${destination}?userName=${encodeURIComponent(data.userName)}`;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-lg font-bold mb-4">お名前を入力してください</h2>
      <input type="text" {...register("userName", { required: "お名前を入力してください" })} className="w-full p-2 border rounded" placeholder="お名前" />
      {formState.errors.userName && <p className="text-red-500">{formState.errors.userName.message}</p>}

      <div className="mt-6 flex justify-between">
        <button onClick={onPrevious} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
          戻る
        </button>
        <button type="submit" disabled={!isValid} className={`px-4 py-2 rounded ${isValid ? "bg-green-500 text-white hover:bg-green-600" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}>
          送信
        </button>
      </div>
    </form>
  );
}
