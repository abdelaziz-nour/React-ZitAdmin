
import React from 'react';
import {Divider, Grid, Paper, Stack, Typography} from "@mui/material";


type Props = {
    children: React.ReactNode;
    headerText?: string;
}

const ViewArea = (props: Props) => {
    return (
        <Paper
            sx={{
                margin: 1,
                padding: 1,
                height: 'Calc(100vh - 8rem)',
                width: '100%',
                overflow: 'scroll',
                backgroundColor: 'primary.paper',
                boxShadow: '3px 3px 3px 3px #A0A0A0',
            }}
        >
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Stack
                        direction="row"
                        spacing={1}
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <Typography sx={{
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                            marginX: 2,
                        }}>
                            {props.headerText}
                        </Typography>
                    </Stack>
                </Grid>
                {
                    props.headerText &&
                    <Grid item xs={12}>
                        <Divider/>
                    </Grid>
                }
                <Grid item xs={12}>
                    {props.children}
                </Grid>
            </Grid>
        </Paper>
    );
};

export default ViewArea;
