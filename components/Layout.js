import Link from 'next/link'
import React, { useState } from 'react'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import styles from '../styles/nav.module.css'
import utils from '../styles/utilities.module.css'
import PropTypes from 'prop-types'
import BackButton from './BackButton'

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
  const { status } = useSession()
  const [menuOpen, setMenuOpen] = useState(false)
  const toggleHamburger = () => {
    setMenuOpen(prev => !prev)
  }
  return (
    <>
      <nav className={styles.navbar}>
        <BackButton />
        {/** This wrapper div is required to style a next/image: https://stackoverflow.com/questions/65527407/next-image-not-taking-class-properties */}
        <div className={styles.logo}><Image
          src="https://picsum.photos/200"
          height={42}
          width={42}
          placeholder="blur"
          blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
        /></div>
        <Link href="/" >
          <a className={utils.button}>Home</a>
        </Link>
        <Link href="/tournaments" >
          <a className={utils.button}>Tournaments</a>
        </Link>
        <Link href="/teams" >
          <a className={utils.button}>Teams</a>
        </Link>
        <div className={styles.menu}>
          <button onClick={toggleHamburger} className={`hamburger hamburger--squeeze ${menuOpen ? 'is-active' : ''}`} type="button">
            <span className="hamburger-box">
              <span className="hamburger-inner">
              </span>
            </span>
          </button>
          <div className={`${styles.menuGroup} ${menuOpen ? styles.display : ''}`}>
            {status === 'authenticated' &&
            <>
              <Link href='/users/profile' >
                <a className={`${utils.button} ${styles.menuItem}`}>Profile</a>
              </Link>
              <button onClick={() => signOut({ callbackUrl: `${window.location.origin}` })} className={`${utils.button} ${styles.menuItem}`}>Sign out</button>
            </>
            }
            {status !== 'authenticated' &&
            <Link href='/signin' >
              <a className={`${utils.button} ${styles.menuItem}`}>Sign In</a>
            </Link>
            }
          </div>
        </div>
      </nav>
      <main className={utils.container}>{children}</main>
      <footer className={styles.footer}>
        <p>Copyright 2021</p>
      </footer>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node
}
