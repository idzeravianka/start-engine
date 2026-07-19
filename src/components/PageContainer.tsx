import {ReactNode} from "react";
import {Container, Paper, SxProps} from "@mui/material";


export default function PageContainer({ children, customSx }: { children: ReactNode, customSx?: SxProps }) {
    return (
        <Container sx={{pb: 2, px: 2, ...customSx}}>
            <Paper elevation={0}>
                {children}
            </Paper>
        </Container>
    )
}