"use client";
import React from "react";
import {
  Dialog,
  DialogClose,
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
import { useState } from "react";
import { addTokenToLocalStorage } from "@/lib/utils";

const AuthModal = ({ children }: { children: React.ReactNode }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthh } = useAuthStore();

  const submitData = () => {
    Login(username, password)
      .then((data) => {
        console.log(data);
        //  addToken(data?.firstName, data?.image, data?.token);
        if (data) {
          addTokenToLocalStorage(data?.firstName, data?.imgLink, data?.token);
          setAuthh(true);
        }
      })
      .catch((err) => {
        console.error("Something Went Wrong Please Try Logging in again");
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
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Username
                </Label>
                <Input
                  id="name"
                  className="col-span-3"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  className="col-span-3"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>
            <Button onClick={submitData}>Sign In</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
