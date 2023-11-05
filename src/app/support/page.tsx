"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Mail } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { useForm } from "react-hook-form"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
 
const FormSchema = z.object({
    email: z.string().email({ message: "Введите корректный email адрес" }).refine(value => !value.includes("&"), {
        message: "Введите корректный email адрес"
        // message: "Символ '#' запрещен"
      }),
    help: z.string()
      .max(500, 'Вы превысили максимальное количество текста')
      .min(10, 'Ваш вопрос должен быть более 10 символов')
      .regex(new RegExp("^(?!.*[<>_&%^$']).{10,500}$"), "Удалите лишние символы")
      
  })

export default function page() {
    const { toast } = useToast()

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })
    
    function onSubmit(data: z.infer<typeof FormSchema>) {
        console.log("data__data", data);
        toast({
          title: "You submitted the following values:",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">{JSON.stringify(data, null, 2)}</code>
            </pre>
          ),
        })
      }

    return (
        <div><h1>Свяжитесь с нами</h1>   
            <Link href="https://vk.com/im?sel=-161250465">
        <div className="grid w-full gap-2 mb-20">
                <Button className='bg-blue-600  text-white  hover:bg-blue-500 hover:text-yellow-50' type="submit">
                    <Mail className="mr-2 h-4 w-4" /> Написать Вконтакте</Button>
        </div>
            </Link>
        <h3 className="mb-5">Написать на почту</h3>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email для связи</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value} type='email' placeholder="Введите ваш email"  />
                  </FormControl>
                  {/* <FormDescription>Введите ваш email</FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="help"
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel>Email для связи</FormLabel> */}
                    <Textarea {...field} value={field.value} placeholder="Напишите ваш вопрос" />
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid w-full gap-2">
                <Button className='bg-green-300' type="submit">Отправить вопрос</Button>
            </div>
          </form>
        </Form>
        </div>
      )
    
}
