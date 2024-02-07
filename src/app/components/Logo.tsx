import Image from './Image'

interface LogoParams {
  size?: 'md' | 'lg'
  layout?: 'portrait' | 'landscape'
}

export default function Logo({
  size = 'md',
  layout = 'landscape',
}: LogoParams) {
  let logoSize = size === 'md' ? 'w-8 h-8' : 'w-24 h-24'
  let signatureSize = size === 'md' ? 'h-4' : 'h-5'
  let alignment = layout === 'landscape' ? 'flex-row' : 'flex-col'

  return (
    <div className={'flex justify-between items-center gap-3 ' + alignment}>
      <Image
        className={'rounded ' + logoSize}
        src="/assets/images/brer-logo-bg-brown.png"
        width="200"
        height="200"
        alt="Brer"
      />
      <Image
        className={'w-auto ' + signatureSize}
        src="/assets/images/brer-signature.png"
        width="300"
        height="108"
        alt=""
      />
    </div>
  )
}
