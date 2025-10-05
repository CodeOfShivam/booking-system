import Link from "next/link";
import Image from "next/image";

import {
  Bell,
  ChevronDown,
  CreditCard,
  HelpCircle,
  LogOut,
  Mail,
  Settings,
  Shield,
  User,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";

import { SearchBar } from "@/layouts/admin/search";

export function Header() {
  return (
    <header
      className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-border 
      bg-background/70 dark:bg-neutral-900/70 backdrop-blur-md supports-[backdrop-filter]:backdrop-blur-md
       dark:border-neutral-800 px-4 md:px-6"
    >
      <div className="flex items-center gap-2 lg:gap-4">
        <SidebarTrigger className="h-9 w-9 xl:hidden" />
        <Image
          className="xl:hidden"
          src="/logo-short.png"
          alt="Logo"
          width={40}
          height={40}
        />
        <div className="hidden md:flex">
          <SearchBar />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <NotificationsDropdown />
        <MessagesDropdown />
        <ProfileDropdown />
      </div>
    </header>
  );
}

function NotificationsDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="relative h-9 w-9 rounded-full"
        >
          <Bell className="h-4 w-4" />
          <Badge className="absolute -right-1 -top-1 h-4 w-4 rounded-full p-0 text-xs bg-orange-400">
            3
          </Badge>
          <span className="sr-only">Notifications</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[380px]">
        <DropdownMenuLabel className="flex items-center justify-between">
          Notifications
          <Button
            variant="ghost"
            size="sm"
            className="h-auto text-xs font-normal hover:bg-transparent"
          >
            Mark all as read
          </Button>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="max-h-[300px] overflow-auto">
          {notifications.map((notification) => (
            <DropdownMenuItem
              key={notification.id}
              className="flex flex-col items-start p-4"
            >
              <div className="flex w-full items-start gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={notification.avatar || "/placeholder.svg"}
                    alt={notification.name}
                  />
                  <AvatarFallback>{notification.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {notification.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {notification.message}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {notification.time}
                  </p>
                </div>
                {notification.unread && (
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                )}
              </div>
            </DropdownMenuItem>
          ))}
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="justify-center">
          <Link href="/notifications">View all notifications</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function MessagesDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="relative h-9 w-9 rounded-full"
        >
          <Mail className="h-4 w-4" />
          <Badge
            className="absolute -right-1 -top-1 h-4 w-4 rounded-full p-0 text-xs"
            variant={"destructive"}
          >
            5
          </Badge>
          <span className="sr-only">Messages</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[380px]">
        <DropdownMenuLabel className="flex items-center justify-between">
          Messages
          <Button
            variant="ghost"
            size="sm"
            className="h-auto text-xs font-normal hover:bg-transparent"
          >
            Mark all as read
          </Button>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="max-h-[300px] overflow-auto">
          {messages.map((message) => (
            <DropdownMenuItem
              key={message.id}
              className="flex flex-col items-start p-4"
            >
              <div className="flex w-full items-start gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={message.avatar || "/placeholder.svg"}
                    alt={message.name}
                  />
                  <AvatarFallback>{message.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {message.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {message.message}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {message.time}
                  </p>
                </div>
                {message.unread && (
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                )}
              </div>
            </DropdownMenuItem>
          ))}
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="justify-center">
          <Link href="/messages">View all messages</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function ProfileDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-9 gap-1 ">
          <Avatar className="h-6 w-6">
            <AvatarImage
              src="/users/user-1.jpg?height=32&width=32"
              alt="User"
            />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <span className="hidden md:inline-flex">John Doe</span>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CreditCard className="mr-2 h-4 w-4" />
            <span>Billing</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Bell className="mr-2 h-4 w-4" />
            <span>Notifications</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem>
            <HelpCircle className="mr-2 h-4 w-4" />
            <span>Support</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Shield className="mr-2 h-4 w-4" />
            <span>Privacy</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <LogOut className="mr-2 h-4 w-4 text-red-500" />
          <span className="text-red-500">Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// Sample data
const notifications = [
  {
    id: 1,
    name: "Alex Johnson",
    message: "Commented on your recent post",
    time: "2 minutes ago",
    avatar: "/users/user-1.jpg?height=32&width=32",
    unread: true,
  },
  {
    id: 2,
    name: "Sarah Williams",
    message: "Mentioned you in a comment",
    time: "1 hour ago",
    avatar: "/users/user-2.jpg?height=32&width=32",
    unread: true,
  },
  {
    id: 3,
    name: "System",
    message: "Your account has been verified",
    time: "2 hours ago",
    avatar: "/users/user-3.jpg?height=32&width=32",
    unread: true,
  },
  {
    id: 4,
    name: "Michael Brown",
    message: "Shared your post with their followers",
    time: "Yesterday",
    avatar: "/users/user-4.jpg?height=32&width=32",
    unread: false,
  },
  {
    id: 5,
    name: "Emily Davis",
    message: "Liked your comment",
    time: "2 days ago",
    avatar: "/users/user-5.jpg?height=32&width=32",
    unread: false,
  },
];

const messages = [
  {
    id: 1,
    name: "Jane Smith",
    message: "Hi there! Just checking in on the project status.",
    time: "5 minutes ago",
    avatar: "/users/user-1.jpg?height=32&width=32",
    unread: true,
  },
  {
    id: 2,
    name: "Robert Johnson",
    message: "Can we schedule a meeting for tomorrow?",
    time: "30 minutes ago",
    avatar: "/users/user-5.jpg?height=32&width=32",
    unread: true,
  },
  {
    id: 3,
    name: "Lisa Anderson",
    message: "I've sent you the files you requested.",
    time: "2 hours ago",
    avatar: "/users/user-3.jpg?height=32&width=32",
    unread: true,
  },
  {
    id: 4,
    name: "David Wilson",
    message: "Thanks for your help with the presentation!",
    time: "Yesterday",
    avatar: "/users/user-6.jpg?height=32&width=32",
    unread: true,
  },
  {
    id: 5,
    name: "Sarah Thompson",
    message: "Let's discuss the new design changes.",
    time: "2 days ago",
    avatar: "/users/user-2.jpg?height=32&width=32",
    unread: true,
  },
];
