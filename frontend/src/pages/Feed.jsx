import React, { useEffect, useState } from 'react';
import { Bookmark, Image, Plus, Save, X } from 'lucide-react';
import axios from "axios";

export default function Feed({setAddedPost}) {
  let [data, setData] = useState([]);
  let [formDisplay, setFormDisplay] = useState(false);
  let [resData, setResData] = useState({});
  let [userData,setUserData]=useState({});

  useEffect(()=>{
          let user=JSON.parse(localStorage.getItem("user"))
          if(user){
            setUserData(user)
            console.log(setUserData);
          }
      },[])
  

  useEffect(() => {
    axios.get('http://localhost:5500/api/post')
      .then((e) => {
        console.log(e.data);
        setData(e.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [resData]);

  async function SendData(e) {
    e.preventDefault()
    let PostData = {
      userId: userData.userId||userData.newUser._id,
      title: e.target.title.value,
      poster: e.target.poster.value,
      content: e.target.content.value
    };
    console.log(PostData)

    let res = await axios.post('http://localhost:5500/api/post',PostData)
    setResData(res)
    console.log(res)
    setFormDisplay(false);
  }

  return (
    <>
      {formDisplay && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form
            onSubmit={SendData}
            className="bg-white rounded-lg p-8 w-full max-w-md space-y-6"
          >
            <div className="flex justify-between items-center border-b pb-4">
              <h3 className="text-xl font-semibold text-gray-800">Create New Post</h3>
              <button
                type="button"
                onClick={() => setFormDisplay(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  name="title"
                  placeholder="Enter post title..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Image URL</label>
                <div className="flex items-center space-x-2">
                  <Image className="h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    name="poster"
                    placeholder="Enter image URL..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Content</label>
                <textarea
                  name="content"
                  placeholder="Write your post content..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                ></textarea>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t">
              <button
                type="button"
                onClick={() => setFormDisplay(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="max-w-5xl mx-auto pt-18 px-4">
        <section className="bg-white rounded-lg shadow-sm mb-6 p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">Feed</h2>
            <button
              onClick={() => setFormDisplay(!formDisplay)}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-5 w-5" />
              Add Post
            </button>
          </div>
        </section>

        <div className="space-y-6">
          {data.map((e, i) => (
            <article key={e._id} className="bg-white rounded-lg shadow-sm p-4">
              <h2 className="text-xl font-semibold mb-3 text-gray-500">
              { e.userId?.FullName || "Unknown User"}
              </h2>
              <h1 className="text-xl font-semibold mb-3">{e.title}</h1>
              {e.poster && (
                <div className="mb-3">
                  <img
                    src={e.poster}
                    alt={e.title}
                    className="w-full h-80 rounded-lg object-cover"
                  />
                </div>
              )}
              <p className="text-gray-700 mb-3">{e.content}</p>
              <div className="text-sm text-gray-500">
                <div className="flex items-center justify-between text-sm text-gray-500">
                <span>{new Date(e.createdAt).toLocaleDateString()}</span>
                <Bookmark className="h-8 w-8" onClick={()=>{
                  console.log(e)
                  setAddedPost(e)
                  
                }}/>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}