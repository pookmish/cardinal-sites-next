"use client"

import Obfuscate from 'react-obfuscate';

const Email = ({email}: { email: string }) => {
  return (
    <Obfuscate email={email}/>
  )
}
export default Email