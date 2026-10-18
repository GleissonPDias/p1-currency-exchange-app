import "./App.css";

function App() {
  return (
    <div className="bg-white w-full h-full">
      <header className="flex flex-direction-row p-8 place-items-center gap-4">
        <img className="w-10 rounded-full" src="avatar.jpg" alt="" />
        <h1 className="flex-1 text-green-950 tracking-widest font-bold text-[20px]">
          HERMES
        </h1>
        <div className="flex justify-end bg-gray-200 box-content rounded gap-6 text-gray-500 p-2 pl-4 pr-4">
          <button className="">PT</button>
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
    </div>
  );
}

export default App;
