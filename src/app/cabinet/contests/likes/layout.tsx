import ContestSettings from "../ContestSettings"

export default async function RootLayout({
    children,
    wallModal,
  }: {
    children: React.ReactNode,
    wallModal: React.ReactNode
  }) {
  return (
        <div>
            {/* <ContestSettings /> */}
            {wallModal}
            {children}
        </div>
  )
}