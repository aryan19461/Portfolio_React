function NetlifyIcon({ size = 20, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 256 256"
      fill="currentColor"
      {...props}
    >
      <path d="M128 0L256 128L128 256L0 128L128 0Z" fill="currentColor"/>
      <path d="M128 48L208 128L128 208L48 128L128 48Z" fill="white"/>
    </svg>
  )
}
