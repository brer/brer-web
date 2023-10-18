import NextImage from 'next/image'

const customLoader = (img: any) => {
  return img.src
}

export default function Image(props: any) {
  return <NextImage {...props} loader={customLoader} />
}
