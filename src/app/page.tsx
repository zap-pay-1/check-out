import { variable } from "@/constants";
import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <p>Web3 payment proccessing platform</p>
      <div>
        <h1>variable</h1>

         {variable.map((item, i) =>  (
          <div key={i} className="my-3 bg-yellow-600">
            <p>{item.name}</p>
            <p>{item.value}</p>
              </div>
         ))}
      </div>
    </div>
  );
}
