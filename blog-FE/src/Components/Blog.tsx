import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { post } from "../Interfaces/post";
import apiInstance from "./Utils/apiInstance";
import Comments from "./Utils/Comments";
import { CommentInterface } from "../Interfaces/commentInterface";

function Blog() {
  const [blogPost, setPost] = useState<post | null>({} as post);
  const [comments, setComments] = useState<CommentInterface[]>([]);
  const [userComment, setuserComment] = useState("");
  const [loading, setLoading] = useState(true);
  const { _id } = useParams();
  const SubmitComment = () => {
    console.log({
      postId: _id,
      comment: userComment,
    });
    apiInstance
      .post("/comments", {
        postId: _id,
        comment: userComment,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    apiInstance
      .get("/comments/" + _id)
      .then((res) => {
        console.log("Response:", res.data);
        setComments(res.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching posts:", err);
        setLoading(false);
      });
  }, []);
  useEffect(() => {
    apiInstance
      .get("/post/getPostById/" + _id)
      .then((res) => {
        console.log("Response:", res.data);
        setPost(res.data || null);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching posts:", err);
        setLoading(false);
      });
  }, []);
  return (
    <>
      {loading ? (
        <div className="text-3xl text-center">Loading...</div>
      ) : blogPost ? (
        <div className="">
          <main className="max-w-4xl mx-auto my-8 fade-in">
            <div className="fixed-header mb-8 top-0 bg-white p-10 rounded-lg shadow-md">
              <h1 className="text-4xl font-bold mb-2">{blogPost.title}</h1>
              <p className="text-gray-600 text-sm">
                By {blogPost.userId} | {new Date(blogPost.date).toUTCString()}
              </p>
            </div>
            <div className="prose bg-white p-6 rounded-lg shadow-md">
              <p>{blogPost.content}</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-8 mt-6 animate-fadeIn">
              <h2 className="text-2xl text-white mb-4">Leave a Comment</h2>
              <form
                onSubmit={(e: React.ChangeEvent<HTMLFormElement>) => {
                  e.preventDefault();
                  SubmitComment();
                }}
              >
                <textarea
                  className="w-full p-4 mb-4 rounded-lg bg-white text-black placeholder-gray-500"
                  rows={5}
                  placeholder="Write your comment here..."
                  value={userComment}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                    e.preventDefault();
                    setuserComment(e.target.value);
                  }}
                ></textarea>
                <div className="flex justify-end space-x-4">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out"
                  >
                    Post
                  </button>
                </div>
              </form>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md mb-8 animate-fadeIn">
              <h2 className="text-2xl mb-4">Comments</h2>
              <div className="mb-4">
                {comments.length == 0 ? (
                  "No comments yet"
                ) : (
                  <Comments comments={comments} reply={false}></Comments>
                )}
              </div>
            </div>
          </main>
        </div>
      ) : (
        <div>Blog Post Not found</div>
      )}
    </>
  );
}

export default Blog;
