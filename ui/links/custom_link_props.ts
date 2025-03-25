export type CustomLinkProps = React.HTMLProps<HTMLAnchorElement> & {
    text: string
    link: string
    actived: boolean
    arrowPlacement?: 'left' | 'right'
    arrowActived?: boolean
    underliningActived?: boolean
    customClassName?: string
}