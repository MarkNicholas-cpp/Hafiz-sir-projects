import { CommentInterface } from "../../Interfaces/commentInterface";
import Comments from "./Comments";

interface props {
  commentData: CommentInterface;
}
function Comment({ commentData }: props) {
  const postedDateString = commentData.date;
  const userId = localStorage.getItem("userId");
  const postedDate = new Date(postedDateString);
  const currentDate = new Date(Date.now());
  const timeDifference = currentDate.getTime() - postedDate.getTime();
  const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));
  return (
    <>
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
              {daysDifference} days ago
            </span>
          </div>

          <p className="text-gray-800">{commentData.comment}</p>
          {userId == commentData.userId && (<div className="flex gap-2 my-3">
              <button className="border border-gray-400 rounded-md p-2">Edit</button>
              <button className="border border-gray-400 rounded-md p-2">Delete</button>
            </div>)}
        </div>
      </div>

      {commentData.reply.length > 0 && (
        <div className="ml-4">
          <Comments reply={true} comments={commentData.reply} />
        </div>
      )}
    </>
  );
}

export default Comment;
