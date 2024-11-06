import React from "react";

function Post() {
  return (
    <div className="max-w-xs p-6 rounded-md shadow-md bg-black">
      <div className="mb-2">
        <span className="block text-sm font-medium font-mono tracking-widest uppercase text-indigo-400">
          Title
        </span>
      </div>

      <img
        src="https://source.unsplash.com/300x300/?random"
        alt=""
        className="object-cover object-center w-full rounded-md h-72 bg-gray-500"
      />

      <div className="flex justify-between mt-4">
        <button className="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700">Like</button>
        <button className="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700">Comment</button>
      </div>

      <div className="mt-4">
        <p className="text-gray-300">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
        <p className="text-gray-300">
          Distinctio tempora ipsum soluta amet elit.
        </p>
      </div>
    </div>
  );
}

export default Post;
