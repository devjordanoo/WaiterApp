import { Card, CardContent } from '@mui/material'

const FiltersBar = () => {
  return (
    <Card
      sx={{
        width: 200,
        height: 'calc(100vh - 200px)',
        position: 'sticky',
        top: 160
      }}
    >
      <CardContent>FiltersBar</CardContent>
    </Card>
  )
}

export { FiltersBar }
