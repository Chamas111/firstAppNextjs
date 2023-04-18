import Link from "next/link";
import React, { useState } from "react";
export default function Posts(props) {
  const [searchInput, setSearchInput] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);

  const handleSearchInputChange = (event) => {
    const { value } = event.target;
    setSearchInput(value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault(); // Prevent form submission

    let postsLeftAfterFilter = props.posts.filter((post) =>
      post.title.toLowerCase().includes(searchInput.toLowerCase())
    );

    setFilteredResults(postsLeftAfterFilter);
  };

  return (
    <div className="relative isolate px-6 pt-20 mt-10 lg:px-7">
      <div
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
      >
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
      </div>

      <div>
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            placeholder="Search"
            value={searchInput}
            onChange={handleSearchInputChange}
            class="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
          />
          <button type="submit"></button>
        </form>

        {searchInput === "" ? (
          <div class="rounded-lg shadow-md p-6">
            {props.posts.map((post) => (
              <div className="flex items-center mb-4" key={post.id}>
                <p>{post.title}</p>

                <div class="flex justify-end mt-4">
                  <Link
                    href={`/posts/${post.id}`}
                    class="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          filteredResults.map((result) => (
            <div key={result.id} className="flex flex-row gap-10 mt-5">
              <p>{result.title}</p>
              <Link
                href={`/posts/${result.id}`}
                class="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded"
              >
                Read More
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await res.json();

  return {
    props: {
      posts: data,
    },
  };
}
