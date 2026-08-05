interface OverlayProps {
    setOverlay: React.Dispatch<React.SetStateAction<boolean>>;
    activateEle?: React.Dispatch<React.SetStateAction<"update" | null>>;
    setActivateBtn?: React.Dispatch<React.SetStateAction<"theme" | "settings" | "add" | null>>;
}

function Overlay({ setOverlay, activateEle, setActivateBtn }: OverlayProps) {
    return (
        <div id='overlay' onClick={() => {
            setOverlay(false);
            if (activateEle != undefined) activateEle(null);
            if (setActivateBtn != undefined) setActivateBtn(null);
        }} />
    )
}

export default Overlay