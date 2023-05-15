"use client"

import Obfuscate from 'react-obfuscate';

const Telephone = ({tel}: { tel: string }) => {
  return (
    <Obfuscate
      tel={tel.replace(/[^\d]+/g, '')}
      className="foobar"
    >
      {tel}
    </Obfuscate>
  )
}
export default Telephone