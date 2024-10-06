import { useAppSettings } from "./states/appSettings";
import { SettingsPanel } from "./components/Settings";
import { MainContent } from "./components/MainContent";
import { AnimatePresence } from "framer-motion";

function App(): JSX.Element {
  const showSettings = useAppSettings(state => state.showSettings);

  return (
    <div className="relative bg-[#0d1117]">
      <AnimatePresence>
        {!showSettings && <MainContent />}
      </AnimatePresence>
      <AnimatePresence>
        {showSettings && <SettingsPanel />}
      </AnimatePresence>
    </div>
  )
}

export default App
