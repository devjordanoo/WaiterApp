import NotificationsIcon from '@mui/icons-material/Notifications'
import Settings from '@mui/icons-material/Settings'
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Badge,
  Stack,
  Container
} from '@mui/material'

export const Navbar = () => {
  return (
    <Box sx={{ flexGrow: 1, position: 'sticky', top: 0, zIndex: 1000 }}>
      <AppBar position="static">
        <Container>
          <Toolbar sx={{ padding: '0 !important' }}>
            <Stack direction="row" alignItems="center" justifyContent="flex-end" useFlexGap>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ display: { xs: 'none', sm: 'block' } }}
              >
                Nome da Lanchonete
              </Typography>

              <Typography>
                <a href="/">Home</a>
                <a href="/products">Produtos</a>
              </Typography>
            </Stack>

            <Box sx={{ flexGrow: 1 }} />

            <Box>
              <Stack direction="row" alignItems="center" justifyContent="flex-end" useFlexGap>
                <IconButton size="large" aria-label="show 17 new notifications" color="inherit">
                  <Badge badgeContent={17} color="error">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
                <IconButton size="large" aria-label="show 17 new notifications" color="inherit">
                  <Settings badgeContent={17} color="white">
                    <NotificationsIcon />
                  </Settings>
                </IconButton>
              </Stack>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  )
}
