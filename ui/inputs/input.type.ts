export type CustomInputProps = React.HTMLProps<HTMLInputElement> & {
    placeholder?: string
    translativePlaceholder?: string
    customClassName?: string
    inputClassName?: string
    fullBordered: boolean
    startContent?: React.ReactNode
    handleChange?: (value: string) => void
}