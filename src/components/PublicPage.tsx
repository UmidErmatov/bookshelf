import { Box } from "@mui/material"
import Hero from "./Hero"
import Footer from "./Footer"
import AppAppBar from "./AppAppBar"
import { toggleColorMode } from "../store/slices/appSlice";
import { useSelector } from "react-redux";
import { RootState } from "../store";

function PublicPage() {
    const mode = useSelector((state: RootState) => state.app.mode)

    return (
        <>
            <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />
            <Hero />
            <Box sx={{ bgcolor: 'background.default' }}>
                <Footer />
            </Box>
        </>
    )
}

export default PublicPage