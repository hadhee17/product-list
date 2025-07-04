import products from "../data/productData.js";
import React, { useState } from "react";

const DisplayPage = () => {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("");
  const [category, setCategory] = useState("all");

  const filtered = products
    .filter((item) => {
      const matchesQuery = item.name
        .toLowerCase()
        .includes(query.toLowerCase());
      const matchesCategory = category === "all" || item.category === category;
      return matchesQuery && matchesCategory;
    })
    .sort((a, b) => {
      if (sort === "price-low") {
        return a.price - b.price;
      } else if (sort === "price-high") {
        return b.price - a.price;
      }
      return 0;
    });

  return (
    <div>
      <div className="bg-black p-4"></div>
      <header className="flex flex-row items-center  justify-between bg-slate-100 p-6 drop-shadow-md gap-4">
        <h1
          className=" basis-100 text-2xl font-bold font-stretch-expanded cursor-pointer"
          onClick={() => setCategory("all")}
        >
          Merchandise Product List
        </h1>
        <ul className="flex items-center gap-12 font-semibold text-base basis-96">
          {["Shirt", "Pants", "Hoodies", "Watches"].map((cat) => (
            <li
              key={cat}
              className={`hover:text-sky-300 cursor-pointer ${
                category === cat ? "text-sky-500 font-bold" : ""
              }`}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </li>
          ))}
        </ul>

        <div class="flex items-center space-x-2">
          <label htmlFor="sort" class="text-sm font-medium text-gray-700">
            Sort by:
          </label>
          <select
            id="sort"
            name="sort"
            class="border border-gray-300 rounded px-2 py-1 text-sm"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="all">All</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>

        <input
          type="text"
          placeholder="search product"
          className="bg-white border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        ></input>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-6">
        {filtered.map((product) => (
          <div className="max-w-xs bg-white shadow-md rounded-lg border border-gray-200 overflow-hidden m-4 transition-transform duration-300 transform hover:scale-105 hover:-translate-y-1 hover:shadow-xl">
            <img
              src={product.image}
              alt="Nike Air Max"
              className="w-full h-75 object-cover"
            />

            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-1">
                {product.name}
              </h2>
              <p className="text-sm text-gray-500 mb-2">
                Category: {product.category}
              </p>

              <div className="flex items-center justify-between mb-3">
                <span className="text-green-600 text-xl font-bold">
                  Rs {product.price}
                </span>
                <span className="text-sm text-gray-600">
                  {product.rating}⭐
                </span>
              </div>

              <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayPage;
