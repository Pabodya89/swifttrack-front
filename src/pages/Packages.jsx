import { useState } from "react";
import PackageTable from "../components/PackageSelection";

const Packages = () => {
  const [selected, setSelected] = useState([]);
  const [packages] = useState([
    { id: "P001", status: "Received", zone: "A", shelf: "1", position: "10", driver: "" },
    { id: "P002", status: "In Transit", zone: "B", shelf: "3", position: "4", driver: "Driver1" },
    { id: "P003", status: "Ready for Dispatch", zone: "C", shelf: "2", position: "8", driver: "" },
  ]);

  const handleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Packages</h2>
      <PackageTable packages={packages} onSelect={handleSelect} />
      <button
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        onClick={() => alert(`Assigning ${selected.length} packages`)}
      >
        Assign to Driver
      </button>
    </div>
  );
};

export default Packages;
