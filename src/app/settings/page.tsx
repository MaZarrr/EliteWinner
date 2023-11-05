'use client'

import React from 'react'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
 
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
import { toast } from "@/components/ui/use-toast"

const FormSchema = z.object({
    email: z.string().min(5, {
      message: "Email must be at least 2 characters.",
    }),
    password: z.string().min(5, {
        message: "Password must be at least 2 characters.",
      }),
    password_confirm: z.string().min(5, {
        message: "Password must be at least 2 characters.",
    }),
  })

export default function Settings() {

const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
})

function onSubmit(data: z.infer<typeof FormSchema>) {
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
    <div>
        <h1>Настройки авторизации</h1>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Пароль</FormLabel>
              <FormControl>
                <Input placeholder="пароль" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password_confirm"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Подтвердить пароль</FormLabel>
              <FormControl>
                <Input placeholder="подтвердите пароль" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <h3>Авторизация через Вконтакте</h3>
        <Button variant="destructive" type="submit">Сохранить</Button>
      </form>
    </Form>
    </div>
  )
}
