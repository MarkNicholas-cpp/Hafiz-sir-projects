import { useState } from "react";
import { CommentInterface } from "../../Interfaces/commentInterface";
import Comment from "../Utils/Comment";

interface Props {
  comments: CommentInterface[];
}

function Comments({ comments }: Props) {
  const [sortedComments, setSortedComments] = useState<CommentInterface[]>([]);
  const [isSorted, setIsSorted] = useState(false);

  const handleSortByDate = () => {
    if (isSorted) {
      setIsSorted(false);
    } else {
      const sortedArray = [...comments].sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
      setSortedComments(sortedArray);
      setIsSorted(true);
    }
  };

  const displayedComments = isSorted ? sortedComments : comments;

  return (
    <div>
      <div className="flex items-center justify-end">
        <button
          onClick={handleSortByDate}
          className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium"
        >
          {isSorted ? "Show Unsorted" : "Sort by Date"}
        </button>
      </div>
      {displayedComments.map((comment) => (
        <Comment key={comment._id} commentData={comment} />
      ))}
    </div>
  );
}

export default Comments;
