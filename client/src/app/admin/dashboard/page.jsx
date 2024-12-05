import { TotalCountCard } from "@/components/totalCount";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import axios from "axios";
import { Ellipsis } from "lucide-react";
import { OptionIcon } from "lucide-react";
import React from "react";

const Dashboard = async () => {
  const { data: users } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/users`,
  );
  const admins = users.filter((user) => user.role === "admin");
  const teachers = users.filter((user) => user.role === "teacher");
  const students = users.filter((user) => user.role === "student");
  const parents = users.filter((user) => user.role === "parent");
  return (
    <main className="flex">
      <section className="">
        <div className="grid gap-2 grid-cols-4">
          <TotalCountCard
            className="bg-lamaPurple "
            role={"admin"}
            total={admins.length}
          />
          <TotalCountCard
            className="bg-lamaYellow"
            role={"teacher"}
            total={teachers.length}
          />
          <TotalCountCard
            className="bg-lamaPurple "
            role={"student"}
            total={students.length}
          />
          <TotalCountCard
            className="bg-lamaYellow"
            role={"parent"}
            total={parents.length}
          />
        </div>
        <div>mid</div>
        <div>bottom</div>
      </section>
      <section>
        <ScrollArea>Dashboard aside</ScrollArea>
      </section>
    </main>
  );
};

export default Dashboard;
