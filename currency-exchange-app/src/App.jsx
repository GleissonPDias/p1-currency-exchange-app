import { ArrowDownToLine, ArrowRightLeft } from "lucide-react";
import "./App.css";

function App() {
  return (
    <div className="bg-white w-full h-full">
      <header className="flex flex-direction-row p-8 place-items-center gap-4">
        <img className="w-10 rounded-full" src="avatar.jpg" alt="" />
        <h1 className="flex-1 text-green-950 tracking-widest font-bold text-[20px]">
          HERMES
        </h1>
        <div className="flex justify-end bg-gray-100 box-content rounded gap-6 text-gray-500 p-2 pl-4 pr-4 font-bold">
          <button className="bg-white rounded-2xl">PT</button>
          <button>EN</button>
          <button>ES</button>
        </div>
      </header>
      <div className="bg-slate-200 ml-8 mr-8 h-[0.5px] flex"></div>
      <section className="p-8">
        <p className="text-green-800 font-bold tracking-widest text-[12px]">
          CLAREZA PARA SUAS DECISÕES
        </p>
        <h1 className="text-6xl text-green-950 mt-4">
          Câmbio, sem complicação.
        </h1>
        <p className="text-slate-500 mt-6">
          Converta moedas e acompanhe o mercado em um só lugar.
        </p>
      </section>
      <section className=" bg-emerald-950 rounded-2xl flex flex-col m-8">
        <h1 className="text-white text-2xl p-8">Conversor de moedas</h1>
        <div className="bg-slate-200 h-[0.5px] flex"></div>
        <div className="p-8 flex justify-center items-center gap-8">
          <div className="bg-white rounded-2xl p-8">
            <p className="text-gray-500 font-semibold">Você envia</p>
            <textarea className="text-3xl font-semibold resize-none">
              $1000
            </textarea>
            <div className="bg-slate-200 h-[0.5px] flex"></div>
            <select>
              <option value="USD">USD</option>
              <option value="BRL">BRL</option>
            </select>
          </div>
          <button className="flex items-center justify-center rounded-full w-14 h-13 border border-gray-500">
            <ArrowRightLeft color="white" />
          </button>
          <div className="bg-white rounded-2xl p-8">
            <p className="text-gray-500 font-semibold">Você recebe</p>
            <textarea className="text-3xl font-semibold resize-none">
              R$5000
            </textarea>
            <div className="bg-slate-200 h-[0.5px] flex"></div>
            <select>
              <option value="USD">USD</option>
              <option value="BRL">BRL</option>
            </select>
          </div>
        </div>
        <div className="flex text-gray-200 bg-emerald-900 overflow-hidden rounded-b-2xl">
          <p className="flex-1 p-4 pl-8">Cotação comercial</p>
          <p className="p-4 pr-8">1 USD = 5,2674 BRL</p>
        </div>
      </section>

      <section className="p-8">
        <div className="flex items-center">
          <h1 className="flex-1 text-2xl">Histórico da cotação</h1>
          <div className="flex bg-slate-200 rounded-2xl font-semibold text-slate-500">
            <button className="p-4">7D</button>
            <button className="p-4">15D</button>
            <button className="p-4">30D</button>
            <button className="p-4">3M</button>
            <button className="p-4">6M</button>
            <button className="p-4">1A</button>
          </div>
        </div>

        <div className="mt-12 flex ">
          <div className="w-4/6 h-80 bg-amber-300 rounded-l-2xl border border-gray-300"></div>
          <div className="w-2/6 p-8 border border-gray-300 rounded-r-2xl flex flex-col gap-2">
            <p className="mb-4">Mercado</p>
            <div className="flex flex-col gap-2">
              <p>Máxima</p>
              <p>R$ 5,90</p>
              <div className="bg-slate-200 h-[0.5px] flex"></div>
            </div>
            <div className="flex flex-col gap-2">
              <p>Mínima</p>
              <p>R$ 5,40</p>
              <div className="bg-slate-200 h-[0.5px] flex"></div>
            </div>
            <div className="flex flex-col gap-2">
              <p>Variação</p>
              <p>+0,47%</p>
            </div>
          </div>
        </div>
      </section>

      <section className="p-8">
        <div className="flex items-center gap-8">
          <h1 className="flex-1">Cotações recentes</h1>
          <select className="border border-gray-400 rounded-2xl p-2 pr-12">
            <option>Todos</option>
            <option>3 dias</option>
          </select>
          <button className="flex bg-emerald-950 text-white font-semibold p-2 rounded-2xl">
            <ArrowDownToLine />
            Exportar CSV
          </button>
        </div>
        <table className="border border-gray-400 rounded-2xl flex flex-col p-4 gap-4 mt-8">
          <tr className="flex gap-8">
            <th>DATA</th>
            <th>1 USD / BRL</th>
            <th>COTAÇÃO</th>
            <th>VARIAÇÃO</th>
          </tr>
          <tr>
            <td>24 mai 2025</td>
            <td>USD/BRL</td>
            <td>R$5,4924</td>
            <td>+5,90%</td>
          </tr>
          <tr>
            <td>24 mai 2025</td>
            <td>USD/BRL</td>
            <td>R$5,4924</td>
            <td>+5,90%</td>
          </tr>
          <tr>
            <td>24 mai 2025</td>
            <td>USD/BRL</td>
            <td>R$5,4924</td>
            <td>+5,90%</td>
          </tr>
        </table>
        <div className="bg-slate-200 h-[0.5px] flex mt-24"></div>
      </section>
      <footer className="flex flex-direction-row p-8 place-items-center gap-4">
        <img className="w-10 rounded-full" src="avatar.jpg" alt="" />
        <h1 className="flex-1 text-green-950 tracking-widest font-bold text-[20px]">
          HERMES
        </h1>
        <p>© 2025 Hermes</p>
      </footer>
    </div>
  );
}

export default App;
