"use client";

import { Book02Icon, File01Icon, LinkSquare02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { useWebHaptics } from "web-haptics/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { BookTextIcon, BookTextIconHandle } from "../ui/book-text";
import { useRef } from "react";

export function BlogCard({
  blog,
}: {
  blog: { _id: string; title: string; description: string; href: string };
}) {
    const { trigger } = useWebHaptics();
    const ref = useRef<BookTextIconHandle>(null)

  return (
      <Card
          className="hover:bg-gray-50 shadow-sm transition-colors p-2 pr-4"
          onMouseEnter={() => ref.current?.startAnimation()}
          onMouseLeave={() => ref.current?.stopAnimation()}
      >
      <CardContent className="flex items-center gap-4 px-0">
        <div className="shrink-0 size-14 flex items-center justify-center bg-secondary/50 rounded-md ring ring-border shadow-sm">
          <BookTextIcon
            size={40}
            className="text-secondary-foreground/50"
            ref={ref}
          />
        </div>
        <div className="min-w-0 w-full flex flex-col">
          <CardTitle className="truncate">{blog.title}</CardTitle>
          <CardDescription className="mt-0.5 truncate text-xs text-gray-600">
            {blog.description}
          </CardDescription>
          <CardFooter className="mt-1 justify-end items-end px-0">
            <Link
              href={blog.href}
              onClick={() => trigger("medium")}
              className="group flex items-center justify-end gap-1 text-xs text-gray-700 hover:text-blue-500 transition-all"
            >
              <HugeiconsIcon
                icon={LinkSquare02Icon}
                size={12}
                className="text-gray-500 group-hover:text-blue-500"
              />
              Read Article
            </Link>
          </CardFooter>
        </div>
      </CardContent>
    </Card>
  );
}
