import PropTypes from 'prop-types'
import { Stack, Typography } from '@mui/material'
import Image from '../../components/image';
import { StyledContent, StyledRoot, StyledSection, StyledSectionBg } from './styles'

const LoginLayout = ({ children, illustration, title }) => {
    return (
        <StyledRoot>
            <StyledSection>
                <Typography variant="h3" sx={{ mb: 10, maxWidth: 480, textAlign: 'center' }}>
                    {title || 'Bienvenido'}
                </Typography>
                <Image
                    disabledEffect
                    visibleByDefault
                    alt="auth"
                    src={illustration || '/assets/illustrations/logo_gin.jpeg'}
                    sx={{ maxWidth: 720 }}
                />
                <StyledSectionBg />
            </StyledSection>
            <StyledContent>
                <Stack sx={{ width: 1 }}> {children} </Stack>
            </StyledContent>
        </StyledRoot>
    )
}

LoginLayout.propTypes = {
    title: PropTypes.string,
    children: PropTypes.node,
    illustration: PropTypes.string,
}

export default LoginLayout
