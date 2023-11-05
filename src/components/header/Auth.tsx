// 'use client'
// import 'server-only'
import hrefRedirect from "@/app/lib/hrefRedirect";
import { Button } from "@/components/ui/button"
import {
  // Cloud,
  CreditCard,
  // Github,
  // Keyboard,
  LifeBuoy,
  LogOut,
  // Mail,
  // MessageSquare,
  // Plus,
  // PlusCircle,
  // Settings,
  User,
  // UserPlus,
  Users,
} from "lucide-react"

import { ChevronDownIcon } from "@radix-ui/react-icons"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  // DropdownMenuLabel,
  // DropdownMenuPortal,
  // DropdownMenuShortcut,
  // DropdownMenuSub,
  // DropdownMenuSubContent,
  // DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link";
import { cn } from "@/lib/utils";


function Auth(props) {
  return (
  <div>
    {!props?.mee ? 
      <button className='bg-white px-5 py-2 rounded-lg hover:bg-orange-300'>
              <a href={hrefRedirect()}>Войти</a>
      </button> : 
              <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className='p-2 rounded-[5px] hover:bg-gray-100'>
                  <ChevronDownIcon className="mr-1 h-5 w-5" /> {props.mee?.first_name}
              </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-46 mr-2 mt-2 bg-white rounded-[12px]">
                {/* <DropdownMenuLabel>Мои группы</DropdownMenuLabel> */}
                <DropdownMenuGroup>
                <Link href={'/settings'}>
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Настройки аккаунта</span>
                  </DropdownMenuItem>
                  </Link>
                  <Link href={'/payments'}>
                  <DropdownMenuItem>
                    <CreditCard className="mr-2 h-4 w-4" />
                    <span>Платежи</span>
                  </DropdownMenuItem>
                  </Link>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                <Link href={'/mygroups'}>
                  <DropdownMenuItem>
                    <Users className="mr-2 h-4 w-4" />
                    <span>Мои группы</span>
                  </DropdownMenuItem>
                  </Link>
                  <Link href={'/support'}>
                  <DropdownMenuItem>
                  <LifeBuoy className="mr-2 h-4 w-4" />
                  <span>Поддержка</span>
                </DropdownMenuItem>
                </Link>
                </DropdownMenuGroup>
                <DropdownMenuSeparator className='bg-cyan-300' />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Выйти</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
      }
  </div>
  )
}

export default Auth;

