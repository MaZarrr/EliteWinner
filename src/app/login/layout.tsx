import Login from './LoginHandler';

export default async function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
  return (
      <div>
            {/* <Login /> */}
            <div>
                {children}
            </div>
        </div>
  )
}