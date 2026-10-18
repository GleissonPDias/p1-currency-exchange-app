import { ArrowRightLeft } from "lucide-react";
import CurrencyInput from "./CurrencyInput";

function CurrencyField() {
  return (
    <section className=" bg-emerald-950 rounded-2xl flex flex-col m-8">
      <h1 className="text-white text-2xl p-8">Conversor de moedas</h1>
      <div className="bg-slate-200 h-[0.5px] flex"></div>
      <div className="p-8 flex justify-center items-center gap-8">
        <CurrencyInput />
        <button className="flex items-center justify-center rounded-full w-14 h-13 border border-gray-500">
          <ArrowRightLeft color="white" />
        </button>
        <CurrencyInput />
      </div>
      <div className="flex text-gray-200 bg-emerald-900 overflow-hidden rounded-b-2xl">
        <p className="flex-1 p-4 pl-8">Cotação comercial</p>
        <p className="p-4 pr-8">1 USD = 5,2674 BRL</p>
      </div>
    </section>
  );
}

export default CurrencyField;
