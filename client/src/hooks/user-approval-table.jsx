"use client";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import axios from "axios";

export default function UserApprovalTable(props) {
  const [users, setUsers] = useState(props.userList);
  useEffect(() => {
    setUsers(props.userList);
  }, [props.userList]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [action, setAction] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleAction = (user, actionType) => {
    setSelectedUser(user);
    setAction(actionType);
    setDialogOpen(true);
  };

  const confirmAction = async (id) => {
    setDialogOpen(false);
    if (action == "approve") {
      await axios.patch(
        process.env.NEXT_PUBLIC_API_URL + "/approve-user/" + selectedUser._id,
      );
    } else {
      await axios.patch(
        process.env.NEXT_PUBLIC_API_URL + "/reject-user/" + selectedUser._id,
      );
    }
    props.fetchUsers();
  };

  return (
    <div className="w-full overflow-x-auto">
      <Table className="text-lg w-full ">
        <TableHeader className="bg-black ">
          <TableRow>
            <TableHead className="text-white">Full Name</TableHead>
            <TableHead className="text-white">Email</TableHead>
            <TableHead className="text-white">Phone Number</TableHead>
            <TableHead className="text-white">Role</TableHead>
            <TableHead className="text-white">Approved</TableHead>

            <TableHead className="text-white">Father's Name</TableHead>
            <TableHead className="text-white">Mother's Name</TableHead>
            <TableHead className="text-white"> Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user._id}>
              <TableCell>{user.fullName}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phoneNumber}</TableCell>
              <TableCell>
                <Badge
                  variant={user.role === "admin" ? "default" : "secondary"}
                >
                  {user.role}
                </Badge>
              </TableCell>
              <TableCell>{user.isVerified ? "Approved" : "Pending"}</TableCell>

              <TableCell>{user.fatherName}</TableCell>
              <TableCell>{user.motherName}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    onClick={() => handleAction(user, "approve")}
                  >
                    Approve
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleAction(user, "reject")}
                  >
                    Reject
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Action</DialogTitle>
            <DialogDescription>
              Are you sure you want to {action} the registration for{" "}
              {selectedUser?.fullName}?
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end space-x-2l">
            <Button
              className=" text-2xl"
              variant="outline"
              onClick={() => setDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button className=" text-2xl" onClick={() => confirmAction()}>
              Confirm
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
