import { CommentInterface } from "../../Interfaces/commentInterface";
import Comment from "../Utils/Comment";
interface props {
  comments: CommentInterface[];
  reply: boolean;
}
function Comments({ comments, reply }: props) {
  return (
    <div className={reply ? "ml-4" : ""}>
      {comments.map((comment) => (
        <Comment commentData={comment} />
      ))}
    </div>
  );
}

export default Comments;
