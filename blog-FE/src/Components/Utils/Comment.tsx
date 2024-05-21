import { useState } from "react";
import { formatDistanceToNow, parseISO } from "date-fns";
import { CommentInterface } from "../../Interfaces/commentInterface";
import Comments from "./Comments";
import apiInstance from "./apiInstance";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Props {
  commentData: CommentInterface;
}

function Comment({ commentData }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedComment, setEditedComment] = useState(commentData.comment);

  const postedDateString = new Date(commentData.date).toISOString();
  const userId = localStorage.getItem("userId");
  const postedDate = parseISO(postedDateString);

  const notify = (msg: string) => toast(msg);

  function deleteComment(id: string) {
    apiInstance
      .delete("/comments/deleteComment/" + id)
      .then((res) => {
        console.log("Response:", res.data);
        notify(res.data.message);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        notify(JSON.stringify(err));
      });
  }

  function updateComment(id: string) {
    apiInstance
      .put("/comments/updateComment/" + id, { comment: editedComment })
      .then((res) => {
        console.log("Response:", res.data);
        notify("Comment updated successfully!");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        notify(JSON.stringify(err));
      });
  }

  return (
    <>
      <ToastContainer />
      <div className="flex items-start mb-4">
        <img
          src="https://via.placeholder.com/40"
          alt="User pic"
          className="rounded-full w-10 h-10 mr-4"
        />
        <div className="Comment">
          <div className="flex items-center mb-1">
            <h3 className="font-bold text-lg mr-2">@{commentData.userId}</h3>
            <span className="text-gray-500 text-sm">
              {formatDistanceToNow(postedDate, { addSuffix: true })}
            </span>
          </div>
          {isEditing ? (
            <div className="flex flex-col">
              <textarea
                value={editedComment}
                onChange={(e) => setEditedComment(e.target.value)}
                className="border border-gray-300 p-2 rounded-md"
              />
              <div className="flex gap-2 mt-2">
                <button
                  className="border border-gray-400 rounded-md p-2"
                  onClick={() => updateComment(commentData._id)}
                >
                  Save
                </button>
                <button
                  className="border border-gray-400 rounded-md p-2"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <p className="text-gray-800">{commentData.comment}</p>
          )}
          {userId === commentData.userId && !isEditing && (
            <div className="flex gap-2 my-3">
              <button
                className="border border-gray-400 rounded-md p-2"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </button>
              <button
                className="border border-gray-400 rounded-md p-2"
                onClick={() => deleteComment(commentData._id)}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {commentData.reply.length > 0 && (
        <div className="ml-4">
          <Comments comments={commentData.reply} />
        </div>
      )}
    </>
  );
}

export default Comment;
