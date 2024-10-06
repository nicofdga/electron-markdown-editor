import { useAppSettings } from "@renderer/states/appSettings";
import { Button } from "../Button"
import { MdClose } from "react-icons/md";
import { motion } from "framer-motion";
import { transitions } from "@renderer/lib/transitions";

export const SettingsPanel = () => {
    const openSettings = useAppSettings(state => state.openSettings);

    const variants = {
        initial: {
            opacity: 0,
            scale: 2,
        },
        animate: {
            opacity: 1,
            scale: 1,
        },
        exit: {
            opacity: 0,
            scale: 2,
        }
    }

    return (
        <motion.div
            animate="animate"
            exit="exit"
            initial="initial"
            variants={variants}
            transition={transitions}
            className="fixed inset-0 bg-[#333]"
        >
            <div className="w-full flex items-center justify-end p-4">
                <Button variant="default"
                    className="bg-transparent text-white aspect-square w-[32px] h-[32px] p-0 border border-white/20"
                    onClick={openSettings}
                >
                    < MdClose />
                </Button>
            </div>
            {/* rest of the content */}
        </motion.div>
    )
}