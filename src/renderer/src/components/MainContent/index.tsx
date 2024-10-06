import { useEditorStates } from "@renderer/states/editor";
import { useCallback } from "react";
import Editor from "../Editor";
import Preview from "../View";
import { EditorWrapper } from "../EditorWrapper";
import { Explorer } from "../Explorer";
import { motion } from "framer-motion";
import { transitions } from "@renderer/lib/transitions";

export const MainContent = () => {
    const doc = useEditorStates(state => state.doc);
    const setDoc = useEditorStates(state => state.setDoc);

    const handleDocChange = useCallback((newDoc: string) => {
        setDoc(newDoc)
    }, [])

    const variants = {
        initial: {
            opacity: 0,
            scale: 0,
        },
        animate: {
            opacity: 1,
            scale: 1,
        },
        exit: {
            opacity: 0,
            scale: 0,
        }
    }

    return (
        <motion.div
            animate="animate"
            exit="exit"
            initial="initial"
            className="h-[100vh] flex flex-row w-full fixed inset-0"
            transition={transitions}
            variants={variants}
        >
            <Explorer content={doc} />
            <EditorWrapper view={<Preview doc={doc} />} editor={<Editor onChange={handleDocChange} initialDoc={doc} />} />
        </motion.div>
    )
}