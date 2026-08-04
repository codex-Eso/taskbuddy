interface OverlayProps {
    setOverlay: React.Dispatch<React.SetStateAction<boolean>>;
}

function Overlay({ setOverlay }: OverlayProps) {
    return (
        <div id='overlay' onClick={() => setOverlay(false)} />
    )
}

export default Overlay