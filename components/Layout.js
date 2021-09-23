import Link from 'next/link'

export default function Layout ({ children, session }) {
  return (
    <>
      <nav>
        <Link href="/">
          <a>Home</a>
        </Link>
        {session &&
          <Link href='/users/profile'>
            <a>Profile</a>
          </Link>
        }
      </nav>
      <main>{children}</main>
      <footer>
        <p>Copyright 2021</p>
      </footer>
    </>
  )
}
