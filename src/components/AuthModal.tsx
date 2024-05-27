"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useAuthStore from "@/lib/auth/AuthStore";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "./ui/button";
import { Login } from "@/lib/auth/Auth";
import { addTokenToLocalStorage } from "@/lib/utils";

const AuthModal = ({ children }: { children: React.ReactNode }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Error state to handle incorrect login
  const { setAuthh } = useAuthStore();

  const submitData = () => {
    Login(username, password)
      .then((data) => {
        if (data) {
          addTokenToLocalStorage(data?.firstName, data?.imgLink, data?.token);
          setAuthh(true);
        } else {
          setError("Incorrect username or password. Please try again.");
        }
      })
      .catch((err) => {
        console.error("Something Went Wrong Please Try Logging in again", err);
        setError("Something went wrong. Please try again.");
        setAuthh(false);
      });
  };

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sign In</DialogTitle>
          <DialogDescription>
            <div className="space-y-4 py-4">
              <div className="flex items-center gap-4">
                <Label htmlFor="name" className="w-1/4 text-right">
                  Username
                </Label>
                <Input
                  id="name"
                  className="flex-grow"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-4">
                <Label htmlFor="password" className="w-1/4 text-right">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  className="flex-grow"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {error && (
                <div className="flex items-center gap-4">
                  <div className="w-1/4"></div>
                  <div className="flex-grow text-red-500">{error}</div>
                </div>
              )}
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="justify-end">
          <Button onClick={submitData}>Sign In</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
