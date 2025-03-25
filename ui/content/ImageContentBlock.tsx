export type ImageContentBlockProps = React.HTMLProps<HTMLImageElement> & {
    url: string
}

export const ImageContentBlock: React.FC<ImageContentBlockProps> = ({
    url,
    ...props
}) => {
    return (
        <img
            src={url} 
            className="w-full h-auto rounded-lg"
        />
    );
}