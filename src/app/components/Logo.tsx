import Image from './Image'

export default function Logo() {
  return (
    <div className="flex flex-row justify-between items-center">
      <Image
        className="w-8 h-8 rounded mr-2"
        src="/assets/images/brer-logo-bg-brown.png"
        width="200"
        height="200"
        alt="Brer"
      />
      <Image
        className="h-4 w-auto"
        src="/assets/images/brer-signature.png"
        width="300"
        height="108"
        alt=""
      />
    </div>
  )
}
