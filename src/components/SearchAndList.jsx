import { useEffect, useState } from "react";

function SearchAndList() {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const results =
    query.trim() === ""
      ? []
      : products.filter((p) =>
          p.title.toLowerCase().includes(query.toLowerCase())
        );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* LEFT: Search + Results */}
      <div className="lg:col-span-1">
        <input
          type="text"
          placeholder="Search products…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="
            w-full px-4 py-3 rounded-xl
            bg-white dark:bg-gray-900
            border border-gray-300 dark:border-gray-700
            text-gray-900 dark:text-white
            focus:outline-none focus:ring-2 focus:ring-blue-500
          "
        />

        {loading && (
          <p className="mt-4 text-sm text-gray-500">Loading products…</p>
        )}

        {query && results.length === 0 && (
          <p className="mt-4 text-sm text-gray-500">No results found</p>
        )}

        <ul className="mt-4 space-y-2 max-h-[420px] overflow-y-auto">
          {results.map((product) => (
            <li
              key={product.id}
              onClick={() => setSelected(product)}
              className="
                p-3 rounded-lg cursor-pointer
                bg-white dark:bg-gray-900
                border border-gray-200 dark:border-gray-800
                hover:bg-blue-50 dark:hover:bg-gray-800
                transition
              "
            >
              <p className="font-medium text-gray-900 dark:text-white">
                {product.title}
              </p>
              <p className="text-xs text-gray-500">
                {product.category}
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* RIGHT: Detail Panel */}
      <div className="lg:col-span-2">
        {!selected ? (
          <div className="h-full flex items-center justify-center text-gray-400">
            Select a product to view details
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              {selected.title}
            </h2>

            <p className="mt-2 text-gray-600 dark:text-gray-400">
              {selected.description}
            </p>

            <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Price</span>
                <p className="font-medium">${selected.price}</p>
              </div>
              <div>
                <span className="text-gray-500">Rating</span>
                <p className="font-medium">{selected.rating}</p>
              </div>
              <div>
                <span className="text-gray-500">Brand</span>
                <p className="font-medium">{selected.brand}</p>
              </div>
              <div>
                <span className="text-gray-500">Stock</span>
                <p className="font-medium">{selected.stock}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchAndList;
