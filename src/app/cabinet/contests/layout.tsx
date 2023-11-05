import ContestSettings from "./ContestSettings"

export default async function RootLayout({
    children,
  }: {
    children: React.ReactNode,
  }) {
  return (
      <div>
      {/* <div className='flex'> */}
          {children}
          <ContestSettings />
        {/* </div> */}
      </div>
  )
}