import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiInstance from "./Utils/apiInstance";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
interface Post {
  _id: string;
  title: string;
  content: string;
  category: string;
  categoryId: string;
  tags: string[];
}

interface Category {
  _id: string;
  categoryname: string;
}

function EditPost() {
  const { _id } = useParams();
  const [, setPost] = useState<Post>({} as Post);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const notify = (msg: string) => toast(msg);
const navigate = useNavigate()

  // Fetch the categories
  useEffect(() => {
    apiInstance
      .get("/category/getAllCategories")
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
      });
  }, []);

  useEffect(() => {
    if (_id) {
      apiInstance
        .get(`/post/getPostById/${_id}`)
        .then((res) => {
          const postData = res.data;
          setPost(postData);
          setTitle(postData.title);
          setContent(postData.content);
          setCategory(postData.category);
          setCategoryId(postData.categoryId);
          setTags(postData.tags);
        })
        .catch((err) => {
          console.error("Error fetching post:", err);
        });
    }
  }, [_id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const postData = {
      title,
      content,
      category,
      categoryId,
      tags,
    };

    try {
      const response = await apiInstance.put(
        `/post/updatePost/${_id}`,
        postData
      );
      console.log("Post updated successfully:", response.data);
      navigate('/')
    } catch (error) {
      console.error("Error updating post:", error);
      notify(JSON.stringify(error));
    }
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setTags(value.split(",").map((tag) => tag.trim()));
  };

  return (
    <>
      <ToastContainer></ToastContainer>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold underline mb-4">Edit Post</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium">
              Enter Post Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              className="block w-full px-4 py-3 mt-1 text-gray-900 bg-white border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTitle(e.target.value)
              }
            />
          </div>

          <div className="mb-4">
            <label htmlFor="content" className="block text-sm font-medium">
              Content
            </label>
            <textarea
              id="content"
              name="content"
              value={content}
              className="block w-full px-4 py-3 mt-1 text-gray-900 bg-white border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setContent(e.target.value)
              }
            />
          </div>

          <div className="mb-4">
            <label htmlFor="category" className="block text-sm font-medium">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={categoryId}
              className="block w-full px-4 py-3 mt-1 text-gray-900 bg-white border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                const selectedCategory = categories.find(
                  (cat) => cat._id === e.target.value
                );
                if (selectedCategory) {
                  setCategoryId(selectedCategory._id);
                  setCategory(selectedCategory.categoryname);
                }
              }}
            >
              <option value="" disabled>
                Select a category
              </option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.categoryname}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="tags" className="block text-sm font-medium">
              Tags (comma separated)
            </label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={tags.join(", ")}
              className="block w-full px-4 py-3 mt-1 text-gray-900 bg-white border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
              onChange={handleTagsChange}
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-md"
          >
            Update Post
          </button>
        </form>
      </div>
    </>
  );
}

export default EditPost;
