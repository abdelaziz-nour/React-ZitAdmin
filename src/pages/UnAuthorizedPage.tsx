

import {Box, Container, Typography} from "@mui/material";
import {useTranslation} from "react-i18next";

const UnAuthorizedPage = () => {
    const {i18n} = useTranslation();
    document.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';

    return (
        <Container maxWidth='lg'>
            <Box
                sx={{
                    backgroundColor: '#ece9e9',
                    mt: '2rem',
                    height: '15rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Typography
                    variant='h2'
                    component='h1'
                    sx={{ color: '#1f1e1e', fontWeight: 500 }}
                >
                    Unauthorized Page
                </Typography>
            </Box>
        </Container>
    );
};

export default UnAuthorizedPage;
