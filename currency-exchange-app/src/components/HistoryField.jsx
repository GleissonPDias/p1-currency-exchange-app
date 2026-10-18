function HistoryField() {
  return (
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
  );
}

export default HistoryField;
