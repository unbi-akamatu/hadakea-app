import { Checkbox } from "@/components/ui/checkbox";

export default function Sec09() {
  return (
    <article>
      <section id="section8">
        <h2>
          肌に赤みが出やすく
          <br />
          ゆらぎやすいですか？
        </h2>
        {/* <p>※複数選択可（最大３個）</p> */}
        <div className="items-top flex space-x-2">
          <ul>
            <li>
              <Checkbox id="terms1" />
              <div className="grid gap-1.5 leading-none">
                <label htmlFor="terms1" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  ゆらぎやすい
                </label>
              </div>
            </li>
            <li>
              <Checkbox id="terms1" />
              <div className="grid gap-1.5 leading-none">
                <label htmlFor="terms1" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  たまにゆらぐことがある
                </label>
              </div>
            </li>
            <li>
              <Checkbox id="terms1" />
              <div className="grid gap-1.5 leading-none">
                <label htmlFor="terms1" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  あまりゆるがない
                </label>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </article>
  );
}
