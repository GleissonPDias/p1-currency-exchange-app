import { ArrowDownToLine } from "lucide-react";

function RecentQuotes() {
  return (
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
      <div className="bg-slate-200 h-[0.5px] flex mt-"></div>
    </section>
  );
}

export default RecentQuotes;
