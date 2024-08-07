'use client'

export const CustomButton = ({ title, onClick , className}) => {
  return (
    <button  onClick={onClick} className={`rounded ${className}`}>
        {title}
    </button>
  )
}
