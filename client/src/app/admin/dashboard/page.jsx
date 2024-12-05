import { CircleChart } from "@/components/charts/circle";
import { TotalCountCard } from "@/components/totalCount";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
  const events = [
    {
      title: "Book Fair",
      description: "Browse and purchase books at our annual school book fair.",
      start: "08:00",
      end: "10:00",
    },
    {
      title: "Sports day",
      description: "A fun-filled day of athletic events and team competitions.",
      start: "10:00",
      end: "12:00",
    },
  ];
  return (
    <main className="flex ">
      {/* flex-wrap */}
      <section className="">
        <div className="flex flex-wrap gap-2">
          <div className="grid grid-cols-2 gap-2">
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
          </div>
          <div className="grid grid-cols-2 gap-2">
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
        </div>
        <section>
          <CircleChart />
        </section>
        <div>bottom</div>
      </section>
      <section>
        <ScrollArea>
          <section>
            <Calendar
              className="h-full w-full flex"
              classNames={{
                months:
                  "flex w-full flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 flex-1",
                month: "space-y-4 w-full flex flex-col",
                table: "w-full h-full border-collapse space-y-1",
                head_row: "",
                row: "w-full mt-2",
              }}
            />
          </section>
          <section>
            <strong className="text-2xl">Events</strong>
            <div className="flex flex-col gap-2">
              {events.map((event, id) => (
                <Card
                  key={id}
                  className="bg-white text-black rounded-md border border-t-4 border-lamaPurple p-2"
                >
                  <CardHeader className="flex flex-row items-center justify-between p-0">
                    <CardTitle className="p-0">{event.title}</CardTitle>
                    <span className="opacity-50 text-sm">
                      {event.start} - {event.end}
                    </span>
                  </CardHeader>
                  <CardContent className="p-0">{event.description}</CardContent>
                </Card>
              ))}
            </div>
          </section>
        </ScrollArea>
      </section>
    </main>
  );
};

export default Dashboard;
