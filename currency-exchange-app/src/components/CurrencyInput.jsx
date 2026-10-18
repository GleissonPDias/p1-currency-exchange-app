function CurrencyInput() {
  return (
    <div className="bg-white rounded-2xl p-8">
      <p className="text-gray-500 font-semibold">Você envia</p>
      <textarea className="text-3xl font-semibold resize-none">$1000</textarea>
      <div className="bg-slate-200 h-[0.5px] flex"></div>
      <select>
        <option value="USD">USD</option>
        <option value="BRL">BRL</option>
      </select>
    </div>
  );
}

export default CurrencyInput;
