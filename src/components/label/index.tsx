
export function Label({label, variant = 'primary'}: { label: string, variant?: 'primary' | 'secondary' }) {
  switch (variant) {
    case "primary":
    return (
      <span className="bg-gray-200 px-2 py-1 rounded-md text-xs">
      {label}
    </span>)
    case "secondary":
    return (
      <span className="bg-gray-800 text-white px-2 py-1 rounded-md text-xs">
      {label}
    </span>)
  }
}