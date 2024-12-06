import { cn } from "@/lib/utils";

const { Ellipsis } = require("lucide-react");
const { Button } = require("./ui/button");
const { Card, CardHeader, CardTitle, CardContent } = require("./ui/card");

export const TotalCountCard = ({ role, total, className, ...props }) => {
  return (
    <Card
      {...props}
      className={cn("w-full aspect-auto p-[30px]", className)}
    >
      <CardHeader className="p-0">
        <div className="flex justify-between items-center gap-2">
          <CardTitle>
            <h1 className="rounded-full w-[8ch] capitalize text-green-400 text-sm font-normal bg-white shadow-sm px-2 cursor-default">
              {role}
            </h1>
          </CardTitle>
          <Button variant="ghost" className="hover:bg-transparent">
            <Ellipsis />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col p-0">
        <strong className="text-black text-3xl">{total}</strong>
        <strong className="justify-start capitalize text-black opacity-60">
          {`${role}${total > 1 ? "s" : ""}`}
        </strong>
      </CardContent>
    </Card>
  );
};
