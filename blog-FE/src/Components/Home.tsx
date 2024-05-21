import { post } from "../Interfaces/post";
import { useEffect, useState } from "react";
import apiInstance from "./Utils/apiInstance";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Home() {
  const [posts, setPosts] = useState<post[]>([]);
  const notify = (msg: string) => toast(msg);

  function fetchPosts() {
    apiInstance
      .get("/post/getAllPosts")
      .then((res) => {
        console.log("Response:", res.data);
        setPosts(res.data);
        notify("Successfully fetched all posts");
      })
      .catch((err) => {
        console.error("Error fetching posts:", err);
      });
  }

  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function deletePost(id: string) {
    apiInstance
      .delete("/post/deletePost/" + id)
      .then((res) => {
        console.log("Response:", res.data);
        notify(res.data.message);
        fetchPosts();
      })
      .catch((err) => {
        console.error("Error deleting post:", err);
        notify(JSON.stringify(err));
      });
  }

  function sortPostsByDate() {
    const sortedPosts = [...posts].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    setPosts(sortedPosts);
  }

  function sortPostsByTitle() {
    const sortedPosts = [...posts].sort((a, b) =>
      a.title.localeCompare(b.title)
    );
    setPosts(sortedPosts);
  }

  return (
    <>
      <ToastContainer />
      <div className="mb-4 flex space-x-2 items-center justify-end my-2">
        <button
          onClick={sortPostsByDate}
          className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium"
        >
          Sort by Date
        </button>
        <button
          onClick={sortPostsByTitle}
          className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium"
        >
          Sort by Title
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {posts.map((post) => (
          <div
            key={post._id}
            className="max-w-sm rounded-xl overflow-hidden shadow-lg mx-auto my-4 border border-gray-300"
          >
            <div className="px-4 py-4">
              <div className="flex flex-col justify-between items-stretch">
                <div className="font-bold text-xl mb-2">{post.title}</div>
                <span className="bg-gray-200 py-3 text-gray-700 text-xs font-medium rounded-full px-3 flex items-center ">
                  {post.userId}
                </span>
              </div>
              <p className="text-gray-700 text-base mb-2 mt-2 line-clamp-6">
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
            <div className="flex items-center px-6">
              {post.userId === localStorage.getItem("userId") && (
                <a
                  href={"/editpost/" + post._id}
                  className="m-3 border text-white bg-amber-400 text-sm p-2 rounded font-bold "
                >
                  Edit
                </a>
              )}
              <a
                href={"/post/" + post._id}
                className="m-3 border text-white bg-gray-700 text-sm p-2 rounded font-bold "
              >
                View
              </a>

              {post.userId === localStorage.getItem("userId") && (
                <button
                  onClick={() => deletePost(post._id)}
                  className="m-3 border text-white bg-red-400 text-sm p-2 rounded font-bold "
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Home;
