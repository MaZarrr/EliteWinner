import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

  import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Button } from '@/components/ui/button'

const invoices = [
    {
      invoice: "02.01.21 13:03",
      totalAmount: "$250.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "02.01.21 13:03",
    //   paymentStatus: "Pending",
      totalAmount: "$150.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "02.01.21 13:03",
    //   paymentStatus: "Unpaid",
      totalAmount: "$350.00",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "02.01.21 13:03",
    //   paymentStatus: "Paid",
      totalAmount: "$450.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "02.01.21 13:03",
    //   paymentStatus: "Paid",
      totalAmount: "$550.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "02.01.21 13:03",
      totalAmount: "$200.00",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "02.01.21 13:03",
      totalAmount: "$300.00",
      paymentMethod: "Credit Card",
    },
  ]

export default function Payments() {
  return (<>
    <h1 className='max-sm:text-2xl'>Платежи и подписки</h1>
    <Card className='w-[60%] max-sm:w-full'>
        <CardHeader>
            <CardTitle>Подписка</CardTitle>
            <CardDescription>Цена: от 90 рублей в месяц</CardDescription>
        </CardHeader>
        {/* <CardContent>
            <p>Card Content</p>
        </CardContent> */}
        {/* В случае оплаты все заменить на "Полписка оформлена" с указанием действия даты */}
        <CardFooter>
            <div className='flex justify-between items-center w-full max-sm:flex-col max-sm:items-start'>
                <div className='max-sm:mb-1'><span className=' text-red-500'>не активна</span></div>
                <div>
                    <Button variant={'outline'} className='rounded-md bg-blue-500 text-white'>Оформить подписку</Button>
                </div>
            </div>
        </CardFooter>
    </Card>
    <h3>История платежей</h3>
    {/* Если есть то список если нет то Нет платежей */}
    <Table>
      {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
      <TableHeader>
        <TableRow>
          <TableHead className="w-[200px]">Дата</TableHead>
          <TableHead>Операция</TableHead>
          <TableHead className="text-right">Сумма</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.invoice}>
            <TableCell className="font-medium">{invoice.invoice}</TableCell>
            <TableCell>{invoice.paymentMethod}</TableCell>
            <TableCell className="text-right">{invoice.totalAmount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </>
  )
}
