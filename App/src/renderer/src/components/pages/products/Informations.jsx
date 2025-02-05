import { Card, CardContent, Stack, Typography } from '@mui/material'

const Informations = () => {
  return (
    <Stack direction="row" gap="25px" alignItems="center" justifyContent="space-between">
      <Card sx={{ width: '100%' }}>
        <CardContent>
          <Typography variant="h6">Menos Vendido</Typography>
          <Typography variant="h4">Hamburguer</Typography>
        </CardContent>
      </Card>

      <Card sx={{ width: '100%' }}>
        <CardContent>
          <Typography variant="h6">Mais Vendido</Typography>
          <Typography variant="h4">Pizza</Typography>
        </CardContent>
      </Card>

      <Card sx={{ width: '100%' }}>
        <CardContent>
          <Typography variant="h6">Total de produtos</Typography>
          <Typography variant="h4">100</Typography>
        </CardContent>
      </Card>
    </Stack>
  )
}

export { Informations }
