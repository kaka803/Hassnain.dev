'use client'
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export default function AdminDashboard() {
  const [projects, setProjects] = useState([
    
  ]);
  const [image, setimage] = useState('')
  const [title, settitle] = useState('')
  const [description, setdescription] = useState('')
  const [tags, settags] = useState('')
  const [link, setlink] = useState('')
  const [showForm, setShowForm] = useState(false);
  const [user, setuser] = useState()
  

 

  const handleAddProject = async () => {
    
    if(!image || !title || !description || !tags || !link) {
      alert("Please fill in all fields");
      return;
      
    }
    const imageUrl = await handleImageUpload(image)
    const res = await fetch("/api/addproject", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image: { url: imageUrl }, title, description, tags, link }),
      });
    if (!res.ok) {
      console.error('Failed to add project');
      return;
    }
    const Data = await res.json();
    settitle('');
    setdescription('');
    settags('');
    setlink('');
    setimage('');
    alert('Project added successfully');
    setShowForm(false);
    window.location.reload();

    if(Data){
      console.log(Data);
      
    }

  
  }
  const router = useRouter()

 useEffect(() => {
  const authenticateUser = async () => {
    const token = localStorage.getItem('token');
    // console.log('token', token);
    if (!token) {
      console.warn('No token found');
      router.push('/login');
      return;
    }

    try {
      const res = await fetch("/api/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({token}),
      });

      if (!res.ok) {
        console.error('Authentication failed');
        router.push('/login');
        return;
      }

      const data = await res.json();
      // console.log(data);
      if (data && data.user) {
        setuser(data.user);
      } else {
        console.error('User data not found in response');
        router.push('/login');
      }
    } catch (error) {
      console.error('Error during authentication:', error);
      router.push('/login');
    }
  };

  authenticateUser();
}, []);

const handleLogout = () => {
  localStorage.removeItem('token'); 
  alert('user logged out successfully');
  router.push('/'); 
}
  
useEffect(() => {
  console.log('image', image);
  
}, [image])


const handleImageUpload = async (file) => {
  const formData = new FormData();
  formData.append('file', file); // 👈 same field name used in backend

  const res = await fetch('/api/upload', {
    method: 'POST',
    body: formData,
  });

  const data = await res.json();
  return data.url; 
};

useEffect(() => {
  const fetchProjects = async () => {
    
      const res = await fetch("/api/getprojects");
      const data = await res.json();
      if(data){
        console.log(data);
        setProjects(data);
      }
  };

  fetchProjects();
}, [])

const handleDelete = async (id) => {
  const confirm = window.confirm("Are you sure you want to delete this project?");
  if (!confirm) return;

  try {
    const res = await fetch("/api/deleteproject", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    const data = await res.json();
    if (res.ok) {
      alert("Project deleted ✅");
      // Optionally refetch or filter it from state
      setProjects(prev => prev.filter(p => p._id !== id));
    } else {
      alert(data.error || "Delete failed");
    }
  } catch (error) {
    console.error("Error deleting project:", error);
    alert("Something went wrong!");
  }
};





  return !user ? (
  <div className="min-h-screen bg-[#121212] text-white flex items-center justify-center">
    <h1 className="text-2xl font-bold">Access Denied</h1>
  </div>
) : (
  <div className="min-h-screen bg-[#121212] text-white p-8 relative">
    <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <Button
        onClick={handleLogout}
        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 flex items-center gap-2 fixed top-4 right-4 rounded-full shadow-lg z-50"
      >
        <LogOut size={16} />
        Logout
      </Button>

    {/* Project List */}
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {projects && projects.map((project) => (
        <div
  key={project._id}
  className="bg-gradient-to-br from-[#1f1f1f] to-[#2a2a2a] rounded-2xl overflow-hidden shadow-lg hover:shadow-purple-500/30 transition duration-300 flex flex-col"
>
  {/* Image */}
  {project.image?.url && (
    <div className="w-full h-48 overflow-hidden">
      <img
        src={project.image.url}
        alt={project.title}
        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
      />
    </div>
  )}

  {/* Content */}
  <div className="p-5 flex flex-col flex-1 justify-between">
    <div>
      <p className="text-2xl font-semibold text-white mb-1">{project.title}</p>
      <p className="text-sm text-gray-400 mb-2">{project.description}</p>
      <p className="text-xs text-purple-300 mb-2">Tags: {project.tags}</p>
      <a
        href={project.link}
        className="text-purple-400 underline text-sm"
        target="_blank"
        rel="noopener noreferrer"
      >
        Visit Project
      </a>
    </div>

    {/* Buttons */}
    <div className="flex gap-2 mt-4">
      
      <Button
        onClick={() => handleDelete(project._id)}
        className="bg-red-600 hover:bg-red-700 w-full"
      >
        Delete
      </Button>
    </div>
  </div>
</div>

      ))}
    </div>

    {/* Add Project Form */}
    {showForm && (
      <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50">
        <div className="bg-[#1e1e1e] p-6 rounded-xl w-full max-w-xl relative">
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-400"
            onClick={() => setShowForm(false)}
          >
            <X />
          </button>

          <h2 className="text-xl font-semibold mb-4">Add New Project</h2>

          <div className="grid grid-cols-1 gap-4">
            <Input
              type="file"
              name="image"
              onChange={(e) => setimage(e.target.files[0])}
              className="bg-[#2a2a2a]"
            />
            <Input
              type="text"
              placeholder="Title"
              name="title"
              value={title}
              onChange={(e) => settitle(e.target.value)}
              className="bg-[#2a2a2a]"
            />
            <Textarea
              placeholder="Description"
              name="description"
              value={description}
              onChange={(e) => setdescription(e.target.value)}
              className="bg-[#2a2a2a]"
            />
            <Input
              type="text"
              placeholder="Tags (comma separated)"
              name="tags"
              value={tags}
              onChange={(e) => settags(e.target.value)}
              className="bg-[#2a2a2a]"
            />
            <Input
              type="text"
              placeholder="Project Link"
              name="link"
              value={link}
              onChange={(e) => setlink(e.target.value)}
              className="bg-[#2a2a2a]"
            />
            <Button
              onClick={handleAddProject}
              className="bg-purple-600 hover:bg-purple-700"
            >
              Save Project
            </Button>
          </div>
        </div>
      </div>
    )}

    {/* Floating Add Button */}
    <button
      onClick={() => setShowForm(true)}
      className="fixed bottom-6 right-6 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full shadow-xl z-50"
    >
      + Add Project
    </button>
  </div>
);

}
