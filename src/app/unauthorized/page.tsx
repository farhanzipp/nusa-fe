import Link from 'next/link'
import React from 'react'

export default function UnauthorizedPage() {
  return (
    <div>
        <h1>Access Denied</h1>
        <p>You do not have access to this page</p>
        <Link href="/login">Login</Link>
    </div>
  )
}
