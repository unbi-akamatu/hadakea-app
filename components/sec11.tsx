"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "２文字以上の入力をお願いします",
  }),
});

type Sec11Props = {
  onSubmit: () => void; // フォーム送信時の処理
};

export default function Sec11({ onSubmit }: Sec11Props) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  return (
    <section id="section10">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => {
            sessionStorage.setItem("username", data.username); // セッションストレージに保存
            onSubmit(); // 親コンポーネントに渡す
          })}
          className="space-y-8"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>あなたのお名前を教えてください</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                {/* <FormDescription>This is your public display name.</FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">診断結果を見る</Button>
        </form>
      </Form>
    </section>
  );
}
