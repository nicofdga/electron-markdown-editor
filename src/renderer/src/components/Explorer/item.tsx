import { MdDelete } from "react-icons/md";
import { Button } from "../Button";
import { File, renameFile, useExplorerStates } from "@renderer/states/explorer";
import { useRef, useState } from "react";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { IoIosCloseCircleOutline } from "react-icons/io";

export const FileItem = ({
    file
}: {
    file: File;
}) => {
    const ref = useRef(null);
    const setFile = useExplorerStates(state => state.setCurrentFile);
    const [editMode, setEditMode] = useState<boolean>(false);

    const [newName, setNewName] = useState<string>("");

    const handleSetFile = () => {
        setFile(file)
    }

    const handleFileRename = () => {
        const newFile = {
            filename: newName,
            filepath: file.filepath
        };

        renameFile(file, newFile);
        setEditMode(false);
    }

    return (
        <li
            ref={ref}
            onDoubleClick={() => { setEditMode(true) }}
            onClick={handleSetFile}
            className="bg-[#222] px-2 cursor-pointer text-sm inline-flex h-[40px] items-center justify-between rounded-sm"
        >
            {editMode &&
                <>
                    <input
                        type="text"
                        onChange={(e) => setNewName(e.target.value)}
                        defaultValue={file.filename}
                        className="p-0 m-0 w-full bg-[#222] text-white placeholder:text-white outline-0 text-sm flex items-center"
                    />
                    <Button
                        variant="default"
                        onClick={() => setEditMode(false)}
                        className="group !bg-transparent h-min w-min p-0 transition-colors duration-200 rounded-sm"
                    >
                        <IoIosCloseCircleOutline className="fill-white/60 group-hover:fill-[#f00] transition-colors duration-200 size-6" />
                    </Button>
                    <Button
                        variant="default"
                        onClick={() => handleFileRename()}
                        className="group !bg-transparent h-min w-min p-0 transition-colors duration-200 rounded-sm"
                    >
                        <IoIosCheckmarkCircleOutline className="fill-white/60 group-hover:fill-[#0f0] transition-colors duration-200 size-6" />
                    </Button>
                </>}
            {!editMode &&
                <>
                    <span className="select-none flex items-center text-sm">{file.filename}</span>
                    <Button variant="default" className="group-hover:bg-[#444] group bg-transparent h-min px-2 transition-colors duration-200 rounded-sm">
                        <MdDelete className="fill-white/60 group-hover:fill-white transition-colors duration-200" />
                    </Button>
                </>
            }
        </li>
    )
}