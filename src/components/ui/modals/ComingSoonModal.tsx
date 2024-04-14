import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

export function ComingSoonModal({
  onOpenChange,
  open,
}: {
  onOpenChange: (open: boolean) => void;
  open: boolean;
}) {

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="">
          <DialogTitle>Coming Soon</DialogTitle>
          <DialogDescription className="text-md">
            This feature is coming soon
          </DialogDescription>
        </DialogHeader>
        {/* <DialogFooter>
          <Button type="submit" className="bg-dark hover:bg-dark">
            Close
          </Button>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}
