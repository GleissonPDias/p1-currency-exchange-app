function Header() {
  return (
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
  );
}

export default Header;
