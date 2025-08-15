import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import OAuth from "./OAuth";
import { Link } from "react-router-dom";
import { postData } from "@/api/api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Spinner } from "flowbite-react";

export default function Register() {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const result = await postData("/register", formData);
      setLoading(false);
      navigate("/signup");
      toast.success("Successfully Registered!");
    } catch {
      toast.error("Error while Register!");
      setLoading(false);
    }
  };

  return (
    <section className="h-lvh flex justify-center items-center bg-[#001f3f]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#3b82f6,transparent_40%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,#6366f1,transparent_40%)]"></div>
      {/* <div className="h-lvh flex justify-center items-center"> */}
      <Card className="mx-auto w-[27rem] z-20">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center font-bold">
            Register
          </CardTitle>
          <CardDescription className="text-center mt-1">
            {/* Enter your email and password to login to your account */}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action="">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Your Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="your name"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  onChange={handleChange}
                  placeholder="email@gmail.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  placeholder="password"
                  onChange={handleChange}
                  type="password"
                  required
                />
              </div>
              <Button
                type="submit"
                onClick={handleSubmit}
                className="w-full bg-[#3B71CA] hover:bg-[#3B71CA]"
              >
                {loading ? (
                  <>
                    <Spinner size="sm" />
                    <span className="pl-3">wait ...</span>
                  </>
                ) : (
                  "Register"
                )}
              </Button>
              {/* <div className="flex items-center space-x-4">
                <div className="border-t border-gray-500 flex-grow"></div>
                <span className="text-gray-700 text-[12px] font-medium">
                  Or Register with
                </span>
                <div className="border-t border-gray-500 flex-grow"></div>
              </div>
              <OAuth /> */}
              <div className="flex gap-2 text-sm mt-1">
                <span>Already Have an account?</span>
                <Link to="/signup" className="text-blue-500">
                  Signup
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
