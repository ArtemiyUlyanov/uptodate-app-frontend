export type CustomTextareaProps = React.HTMLProps<HTMLTextAreaElement> & {
    placeholder?: string
    translativePlaceholder?: string
    customClassName?: string
    inputClassName?: string
    fullBordered: boolean
    handleChange?: (value: string) => void
}