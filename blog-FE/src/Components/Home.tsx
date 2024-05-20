import { post } from "../Interfaces/post";
import { useEffect, useState } from "react";
import apiInstance from "./Utils/apiInstance";

function Home() {
  const [posts, setPosts] = useState<post[]>([]);

  useEffect(() => {
    apiInstance
      .get("/post/getAllPosts")
      .then((res) => {
        console.log("Response:", res.data);
        setPosts(res.data);
      })
      .catch((err) => {
        console.error("Error fetching posts:", err);
      });
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {posts.map((post) => (
        <a href={"/post/" + post._id}>
          <div
            key={post._id}
            className="max-w-sm rounded-xl overflow-hidden shadow-lg mx-auto my-4 border border-gray-300"
          >
            <img
              className="w-full h-48 object-cover"
              src="https://via.placeholder.com/350x150"
              alt="Blog Post Image"
            />
            <div className="px-4 py-4">
              <div className="flex justify-between items-stretch">
                <div className="font-bold text-xl mb-2">{post.title}</div>
                <span className="bg-gray-200 text-gray-700 text-xs font-medium rounded-full px-3 flex items-center ">
                  Author Name
                </span>
              </div>
              <p className="text-gray-700 text-base mb-2 mt-2">
                {post.content}
              </p>
              <div className="flex justify-between text-gray-500 text-sm">
                <span>{new Date(post.date).toDateString()}</span>
                <span>5 min read</span>
              </div>
            </div>
            <div className="px-6 py-5">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 mr-2"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}

export default Home;
