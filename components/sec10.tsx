import { Checkbox } from "@/components/ui/checkbox";

export default function Sec10() {
  return (
    <article>
      <section id="section9">
        <h2>年齢を教えてください</h2>
        {/* <p>※複数選択可（最大３個）</p> */}
        <div className="items-top flex space-x-2">
          <ul>
            <li>
              <Checkbox id="terms1" />
              <div className="grid gap-1.5 leading-none">
                <label htmlFor="terms1" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  10代前半
                </label>
              </div>
            </li>
            <li>
              <Checkbox id="terms1" />
              <div className="grid gap-1.5 leading-none">
                <label htmlFor="terms1" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  10代後半
                </label>
              </div>
            </li>
            <li>
              <Checkbox id="terms1" />
              <div className="grid gap-1.5 leading-none">
                <label htmlFor="terms1" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  20代前半
                </label>
              </div>
            </li>
            <li>
              <Checkbox id="terms1" />
              <div className="grid gap-1.5 leading-none">
                <label htmlFor="terms1" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  20代後半
                </label>
              </div>
            </li>
            <li>
              <Checkbox id="terms1" />
              <div className="grid gap-1.5 leading-none">
                <label htmlFor="terms1" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  30代前半
                </label>
              </div>
            </li>
            <li>
              <Checkbox id="terms1" />
              <div className="grid gap-1.5 leading-none">
                <label htmlFor="terms1" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  30代後半
                </label>
              </div>
            </li>
            <li>
              <Checkbox id="terms1" />
              <div className="grid gap-1.5 leading-none">
                <label htmlFor="terms1" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  40代前半
                </label>
              </div>
            </li>
            <li>
              <Checkbox id="terms1" />
              <div className="grid gap-1.5 leading-none">
                <label htmlFor="terms1" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  40代後半
                </label>
              </div>
            </li>
            <li>
              <Checkbox id="terms1" />
              <div className="grid gap-1.5 leading-none">
                <label htmlFor="terms1" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  50代前半
                </label>
              </div>
            </li>
            <li>
              <Checkbox id="terms1" />
              <div className="grid gap-1.5 leading-none">
                <label htmlFor="terms1" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  50代後半
                </label>
              </div>
            </li>
            <li>
              <Checkbox id="terms1" />
              <div className="grid gap-1.5 leading-none">
                <label htmlFor="terms1" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  60代以上
                </label>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </article>
  );
}
