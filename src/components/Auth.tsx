import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaFacebook } from "react-icons/fa";

import {
  GoogleAuthProvider,
  GithubAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  // Redirigir si el usuario ya está autenticado
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const registerWithEmail = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("Usuario registrado");
    } catch (error) {
      console.error("Error en el registro:", error);
    }
  };

  const loginWithEmail = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Usuario autenticado");
    } catch (error) {
      console.error("Error en el login:", error);
    }
  };

  const handleSocialLogin = async (provider: any) => {
    try {
      await signInWithPopup(auth, provider);
      console.log("Usuario autenticado con red social");
    } catch (error) {
      console.error("Error en la autenticación:", error);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    console.log("Sesión cerrada");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        <Button
          className="w-full flex items-center justify-center mb-2 border border-gray-300 text-gray-200"
          onClick={() => handleSocialLogin(new GoogleAuthProvider())}
        >
          <FcGoogle className="h-5 w-5 mr-2" />
          Log in with Google
        </Button>

        <Button
          className="w-full flex items-center justify-center mb-2 border border-gray-300 text-gray-200"
          onClick={() => handleSocialLogin(new FacebookAuthProvider())}
        >
          <FaFacebook className="h-5 w-5 mr-2 text-blue-600" />
          Log in with Facebook
        </Button>

        <Button
          className="w-full flex items-center justify-center mb-4 border border-gray-300 text-gray-200"
          onClick={() => handleSocialLogin(new GithubAuthProvider())}
        >
          <FaGithub className="h-5 w-5 mr-2" />
          Log in with GitHub
        </Button>

        <div className="text-center text-gray-500 my-2">OR</div>

        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-2"
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4"
        />

        <Button
          className="w-full bg-blue-500 text-white mb-2"
          onClick={loginWithEmail}
        >
          Login
        </Button>

        <div className="text-center text-gray-500 text-sm">
          New user?{" "}
          <span
            className="text-blue-600 cursor-pointer"
            onClick={registerWithEmail}
          >
            Sign up!
          </span>
        </div>

        <Button
          className="w-full mt-4 bg-gray-300 text-gray-700"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Auth;
