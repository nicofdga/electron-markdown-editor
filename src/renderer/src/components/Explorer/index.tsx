import { useEffect, useState } from "react";
import { FileItem } from "./item";
import { Button } from "../Button";
import { IoFolderOpenOutline, IoSave, IoSettingsOutline } from "react-icons/io5";
import { useAppSettings } from "@renderer/states/appSettings";
import { BiFileBlank } from "react-icons/bi";
import { useEditorStates } from "@renderer/states/editor";
import { File, useExplorerStates } from "@renderer/states/explorer";

export function Explorer({ content }: {
    content: string;
}): JSX.Element {
    const openSettings = useAppSettings(state => state.openSettings);
    const files = useExplorerStates(state => state.files);
    const currentFile = useExplorerStates(state => state.currentFile);
    const setFiles = useExplorerStates(state => state.setFiles);
    const addOrUpdateFile = useExplorerStates(state => state.addOrUpdateFile);
    const setDoc = useEditorStates(state => state.setDoc);

    console.log(files);

    const [filename, setFilename] = useState('unnamed.md');

    const saveFile = (): void => window.api.saveFile({
        filename,
        content
    })

    const openFile = (): void => window.api.openFile();

    // const handleFileRetriew = () => {
    //     window.api.retrieveFiles();
    //     window.api.onFileUpdate((file: { key: string; file: File; }) => {
    //         addOrUpdateFile(file)
    //     });
    // }

    // useEffect(() => {
    //     handleFileRetriew();

    //     const handleFiles = (files: Map<string, File>) => {
    //         // Update the Zustand store with the new Map
    //         setFiles(files);
    //     };

    //     window.api.onRetriewFilesResponse(handleFiles);
    // }, [])

    return (
        <div className="flex flex-col h-[100vh] w-fit bg-[#171e29] p-1">
            {/* <ul className="text-white flex flex-col gap-4">
                {Array.from(files).map(([key, file]) => (
                    <FileItem key={key} file={file} />
                ))}
            </ul> */}
            <div className="flex flex-col gap-2">
                <Button
                    size="sm"
                    onClick={saveFile}
                    className="text-white w-full"
                >
                    <IoSave />
                </Button>
                <Button
                    size="sm"
                    onClick={openFile}
                    className="text-white w-full"
                >
                    <IoFolderOpenOutline />
                </Button>
                {/* <Button
                    onClick={() => {
                        setDoc("# Blank");
                        handleFileRetriew();
                    }}
                    variant="default"
                    size="sm"
                    className="bg-[#444] text-white px-4 py-1.5 w-full"
                >
                    <BiFileBlank />
                </Button> */}
                <Button
                    size="sm"
                    onClick={openSettings}
                    className="text-white w-full"
                >
                    <IoSettingsOutline />
                </Button>
            </div>
        </div>
    )
}