import { cn } from "@/lib/utils";

const { Ellipsis } = require("lucide-react");
const { Button } = require("./ui/button");
const { Card, CardHeader, CardTitle, CardContent } = require("./ui/card");

export const TotalCountCard = ({ role, total, className, ...props }) => {
  return (
    <Card
      {...props}
      className={cn("flex-grow aspect-video max-w-52 max-h-32 p-2", className)}
    >
      <CardHeader className="p-0">
        <div className="flex justify-between items-center gap-2">
          <CardTitle>
            <h1 className="rounded-full w-[7ch] capitalize text-green-300 text-sm font-normal -sm bg-white px-1">
              {role}
            </h1>
          </CardTitle>
          <Button variant="ghost" className="hover:bg-none">
            <Ellipsis />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col p-0">
        <strong>{total}</strong>
        <strong className="justify-start capitalize">
          {`${role}${total > 1 ? "s" : ""}`}
        </strong>
      </CardContent>
    </Card>
  );
};
