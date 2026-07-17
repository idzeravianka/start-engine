import {ReactNode} from "react";
import {Container, Paper} from "@mui/material";


export default function PageContainer({ children }: { children: ReactNode }) {
    return (
        <Container sx={{pb: 2, px: 2}}>
            <Paper elevation={0}>
                <div style={{
                    display: 'flex',
                    flexFlow: 'row nowrap',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                </div>
                {children}
            </Paper>
        </Container>
    )
}