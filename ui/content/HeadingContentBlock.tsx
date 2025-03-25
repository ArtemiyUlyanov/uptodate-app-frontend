export const HeadingContentBlock: React.FC<React.HTMLProps<HTMLHeadingElement>> = ({
    children,
    ...props
}) => {
    return (
        <h1 className="font-interTight font-semibold text-2xl text-primaryText pb-2" {...props}>
            {children}
        </h1>
    );
}