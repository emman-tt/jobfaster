export default function Overlay ({ className }) {
  return (
    <section
      className={` fixed w-full h-screen z-50 transition-all duration-300 ease-in-out  ${className}`}
    ></section>
  )
}
