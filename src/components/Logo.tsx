import Image from 'next/image'
import signature from '../../public/assets/images/brer-signature.png'
import logo from '../../public/assets/images/brer-logo-bg-brown.png'

export default function Logo() {
  return (
    <div className="flex flex-row justify-between items-center">
      <Image className="w-8 h-8 rounded mr-2" src={logo} alt="" />
      <Image className="h-4 w-auto" src={signature} alt="" />
    </div>
  )
}
