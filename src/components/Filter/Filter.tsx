export default function Filter() {
  return (
    <>
    <div>
      <select name="filter" id="filter" className="w-36 bg-gray-200 py-2 rounded-lg">
        <option value="All">All</option>
        <option value="Alphabet">Alphabet</option>
        <option value="Date">Date</option>
      </select>
      </div>
    </>
  );
}
