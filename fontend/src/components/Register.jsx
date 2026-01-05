import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {auth,db} from "../firebase";
import { setDoc,doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify";
const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name,setName]=useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await createUserWithEmailAndPassword(auth, email, password);
      const user=auth.currentUser;
      if(user){
        await setDoc(doc(db,"Users",user.uid),{
          email:user.email,
          name:name
        });
      }
      toast.success("user registered successfully",{position:'top-center'});
      navigate("/login");
    } catch (err) {
      console.log(err.message);
       toast.success("err.message",{position:'bottom-right'});

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleRegister}
        className="border p-6 rounded w-80 shadow"
      >
        <h2 className="text-xl font-bold mb-4 text-center">Register</h2>
        <input
          type="name"
          placeholder="Name"
          className="border p-2 w-full mb-3"
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full mb-3"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-3"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          disabled={loading}
          className="bg-black text-white w-full py-2"
        >
          {loading ? "Creating..." : "Register"}
        </button>

        <p className="text-sm text-center mt-3">
          Already have an account?{" "}
          <span
            className="text-blue-600 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register;
