export type DrawerTriggerProps = {
    children: (onClick: () => void) => React.ReactNode
}

export type DrawerBodyProps = {
    children: React.ReactNode | ((onClose: () => void) => React.ReactNode)
}

export const DrawerTrigger: React.FC<DrawerTriggerProps> = ({
    children
}) => {
    return children(() => {});
}

export const DrawerBody: React.FC<DrawerBodyProps> = ({
    children
}) => {
    return typeof children === 'function' ? children(() => {}) : children;
}