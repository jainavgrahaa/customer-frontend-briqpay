import React from 'react'

import DFHeader from './DFHeader'
import Footer from './Footer'
import AlertUI from './AlertUI'
import DFFooter from './DFFooter'
import { useRouter } from 'next/router'
import ABHeader from './ABHeader'
import LoginModal from './loginModal'
// import { staticDomain } from '@/_utils/environment'

export default function Layout({ children }) {
  const { asPath } = useRouter()
  const isStatic = asPath?.split("/")?.at(1) === "static"
  return (
    <>
      {isStatic && <ABHeader />}
      <div className={isStatic ? 'page-wrapper' : ""}>{children}</div>
      <AlertUI></AlertUI>
      {isStatic && <Footer />}
      <LoginModal />
    </>
  )
}