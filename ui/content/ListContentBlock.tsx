export const ListContentBlock: React.FC<React.HTMLProps<HTMLLIElement>> = ({
    children,
    ...props
}) => {
    return (
        <li className="font-interTight font-medium text-base text-primaryText" {...props}>
            {children}
        </li>
    );
}