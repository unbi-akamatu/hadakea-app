import { Checkbox } from "@/components/ui/checkbox";

export default function Sec06() {
  return (
    <article>
      <section id="section5">
        <h2>
          頬に触れると
          <br />
          ザラツキを感じますか？
        </h2>
        {/* <p>※複数選択可（最大３個）</p> */}
        <div className="items-top flex space-x-2">
          <ul>
            <li>
              <Checkbox id="terms1" />
              <div className="grid gap-1.5 leading-none">
                <label htmlFor="terms1" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  感じる
                </label>
              </div>
            </li>
            <li>
              <Checkbox id="terms1" />
              <div className="grid gap-1.5 leading-none">
                <label htmlFor="terms1" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  部分的に感じる
                </label>
              </div>
            </li>
            <li>
              <Checkbox id="terms1" />
              <div className="grid gap-1.5 leading-none">
                <label htmlFor="terms1" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  特に感じない
                </label>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </article>
  );
}
