"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useUserDetails } from "../hooks";
import { Skeleton } from "@/components/ui/skeleton";
import { Mail, Phone, Building, MapPin } from "lucide-react";
import Image from "next/image";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface UserDetailsDialogProps {
  userId: number | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UserDetailsDialog({
  userId,
  open,
  onOpenChange,
}: UserDetailsDialogProps) {
  const { data: user, isLoading, error } = useUserDetails(userId);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] max-w-2xl sm:w-auto">
        <DialogHeader>
          {isLoading ? (
            <VisuallyHidden>
              <DialogTitle>User Details</DialogTitle>
            </VisuallyHidden>
          ) : (
            <DialogTitle>User Details</DialogTitle>
          )}
        </DialogHeader>

        {isLoading && (
          <div className="space-y-4">
            <Skeleton className="h-20 w-20 rounded-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        )}

        {error && (
          <div className="text-sm text-destructive">
            Failed to load user details. Please try again.
          </div>
        )}

        {user && (
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              {user.image && (
                <div className="relative h-20 w-20 rounded-full overflow-hidden shrink-0">
                  <Image
                    src={user.image}
                    alt={`${user.firstName} ${user.lastName}`}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>
              )}
              <div className="flex-1">
                <h3 className="text-xl font-semibold">
                  {user.firstName} {user.lastName}
                </h3>
                <p className="text-sm text-muted-foreground">
                  @{user.username}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground shrink-0" />
                <a
                  href={`mailto:${user.email}`}
                  className="hover:underline break-all"
                >
                  {user.email}
                </a>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground shrink-0" />
                <a href={`tel:${user.phone}`} className="hover:underline">
                  {user.phone}
                </a>
              </div>

              {user.company && (
                <div className="flex items-start gap-2 text-sm">
                  <Building className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium">{user.company.name}</p>
                    <p className="text-muted-foreground">
                      {user.company.title} • {user.company.department}
                    </p>
                  </div>
                </div>
              )}

              {user.address && (
                <div className="flex items-start gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                  <div>
                    <p>{user.address.address}</p>
                    <p className="text-muted-foreground">
                      {user.address.city}, {user.address.state}{" "}
                      {user.address.postalCode}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
