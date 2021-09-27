import Link from 'next/link'
import { useContext, useState } from 'react'
import { AuthContext } from '../hooks/useAuth'
import { signIn, signOut } from 'next-auth/client'
import Image from 'next/image'
import styles from '../styles/nav.module.css'
import page from '../styles/pages.module.css'

const shimmer = (w, h) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`

const toBase64 = (str) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str)

export default function Layout ({ children }) {
  const [session] = useContext(AuthContext)
  const [menuOpen, setMenuOpen] = useState(false)
  const toggleHamburger = () => {
    setMenuOpen(prev => !prev)
  }
  return (
    <>
      <nav className={styles.navbar}>
        {/** This wrapper div is required to style a next/image: https://stackoverflow.com/questions/65527407/next-image-not-taking-class-properties */}
        <div className={styles.logo}><Image
          src="https://picsum.photos/200"
          height={42}
          width={42}
          placeholder="blur"
          blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
        /></div>
        <Link href="/" >
          <a className={styles.link}>Home</a>
        </Link>
        <Link href="/tournaments" >
          <a className={styles.link}>Tournaments</a>
        </Link>
        <div className={styles.menu}>
          <button onClick={toggleHamburger} className={`hamburger hamburger--squeeze ${menuOpen ? 'is-active' : ''}`} type="button">
            <span className="hamburger-box">
              <span className="hamburger-inner">
              </span>
            </span>
          </button>
          <div className={`${styles.menuGroup} ${menuOpen ? styles.display : ''}`}>
            {session &&
            <>
              <Link href='/users/profile' >
                <a className={`${styles.link} ${styles.menuItem}`}>Profile</a>
              </Link>
              <button onClick={() => signOut()} className={`${styles.link} ${styles.menuItem}`}>Sign out</button>
            </>
            }
            {!session &&
            <button onClick={() => signIn('google')} className={`${styles.link} ${styles.menuItem}`}>Sign in</button>
            }
          </div>
        </div>
      </nav>
      <main className={page.container}>{children}</main>
      <footer className={styles.footer}>
        <p>Copyright 2021</p>
      </footer>
    </>
  )
}
