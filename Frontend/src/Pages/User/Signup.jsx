import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import OAuth from "./OAuth";
import { Link, useNavigate } from "react-router-dom";
import { postData } from "@/api/api";
import { login } from "@/redux/slice";
import { Spinner } from "flowbite-react";
import { toast } from "react-toastify";

export default function Signup() {
  const [formData, setFormData] = useState({
    email: "yashpatil@gmail.com",
    password: "Yash@2005",
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const result = await postData("/login", formData);

      if (result.token) {
        const token = result.token;
        const currentUser = {
          name: result.user.name,
          email: result.user.email,
          userId: result.user.userId,
        };

        dispatch(login({ currentUser, token }));
        navigate("/dashboard");
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      toast.error("Error while Login!")
      console.error("Login failed:", error);
    }
  };

  return (
    <section className="h-lvh flex justify-center items-center bg-[#001f3f]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#3b82f6,transparent_40%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,#6366f1,transparent_40%)]"></div>

      <Card className="w-[25rem] z-20">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center font-bold">
            SignUp
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@gmail.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-[#3B71CA] hover:bg-[#3B71CA]"
              >
                {loading ? (
                  <>
                    <Spinner size="sm" />
                    <span className="pl-3">Logging in...</span>
                  </>
                ) : (
                  "Login"
                )}
              </Button>
              {/* <div className="flex items-center space-x-4">
                <div className="border-t border-gray-500 flex-grow"></div>
                <span className="text-gray-700 text-[12px] font-medium">Or Register with</span>
                <div className="border-t border-gray-500 flex-grow"></div>
              </div>
              <OAuth /> */}
              <div className="flex gap-2 text-sm mt-1">
                <span>Don't have an account?</span>
                <Link to="/register" className="text-blue-500">
                  Create an account
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
