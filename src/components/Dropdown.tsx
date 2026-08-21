import { useEffect, useState, useRef } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

interface DropdownProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setApiCall: React.Dispatch<React.SetStateAction<string>>;
}

function Dropdown({ open, setOpen, setApiCall }: DropdownProps) {
    const [currentFilter, setCurrentFilter] = useState<string>("Incompleted");
    const pageRef = useRef<HTMLDivElement | null>(null);
    const toggleMenu = () => {
        setOpen((prev) => !prev);
    }
    useEffect(() => {
        const handler = (event: MouseEvent | TouchEvent) => {
            if (
                open &&
                pageRef.current &&
                !pageRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        document.addEventListener("touchstart", handler);
        return () => {
            document.removeEventListener("mousedown", handler);
            document.removeEventListener("touchstart", handler);
        };
    }, [open]);
    return (
        <div id="dropdown" ref={pageRef}>
            <button onClick={() => toggleMenu()}>{currentFilter}{open ? <FaChevronUp /> : <FaChevronDown />}</button>
            {open && (
                <div>
                    <span onClick={() => { setCurrentFilter("Incompleted"); setApiCall("?completed=false"); toggleMenu(); }}>Incompleted</span>
                    <span onClick={() => { setCurrentFilter("In Progress"); setApiCall("?in_progress=true"); toggleMenu(); }}>In Progress</span>
                    <span onClick={() => { setCurrentFilter("Completed"); setApiCall("?completed=true"); toggleMenu(); }}>Completed</span>
                </div>
            )}
        </div>
    )
}

export default Dropdown