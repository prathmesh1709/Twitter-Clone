interface ButtonProps {
  label: string;
  secondary?: boolean;
  fullWidth?: boolean;
  large?: boolean;
  disabled?: boolean;
  outline?: boolean;
  onClick: () => void;
}

export default function Button({
  label,
  secondary,
  fullWidth,
  large,
  disabled,
  outline,
  onClick,
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`
        rounded-full
        font-semibold
        hover:opacity-80
        transition
        border-2

        disabled:opacity-70
        disabled:cursor-not-allowed

        ${fullWidth ? "w-full" : "w-fit"}
        ${
          secondary
            ? "bg-white text-black border-black"
            : "bg-sky-500 text-white border-sky-500"
        }
        ${large ? "text-xl px-5 py-3" : "text-md px-4 py-2"}
        ${outline ? "bg-transparent border-white text-white" : ""}
    `}
    >
      {label}
    </button>
  );
}
