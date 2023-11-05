'use client'

import { ApiProvider } from "@reduxjs/toolkit/dist/query/react"
import { Provider, useDispatch } from "react-redux"
import { api } from "../Services/baseApi"
import { store } from "./store"
// import { SessionProvider } from "next-auth/react"

export default function provider({ children }: any) {
  return (
    // <SessionProvider>
    <ApiProvider api={api}>
    <Provider store={store}>
        {children}
    </Provider>
    </ApiProvider>
    // </SessionProvider>
  )
}