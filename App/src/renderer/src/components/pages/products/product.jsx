import {
  Stack,
  Avatar,
  Card,
  CardContent,
  Divider,
  Typography,
  IconButton,
  Chip
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import QueryStatsIcon from '@mui/icons-material/QueryStats'
import { DropDownStatus } from './dropdownStatus'

const Product = ({ product }) => {
  return (
    <Card>
      <CardContent>
        <Stack direction="row" alignItems="center" justifyContent="space-around" gap="20px">
          <Avatar sx={{ width: 56, height: 56 }} src={product.imagePath} />

          <Divider orientation="vertical" variant="middle" flexItem />

          <Stack direction="column" alignItems="start" justifyContent="center">
            <Typography>{product.name}</Typography>
            <Typography>R$ {product.price}</Typography>
            <Chip
              label={`${product.category.icon} - ${product.category.name}`}
              color="success"
              variant="outlined"
              size="small"
              sx={{ marginTop: 1, padding: '0 10px' }}
            />
          </Stack>

          <Divider orientation="vertical" variant="middle" flexItem />

          <Stack direction="column" alignItems="start" justifyContent="center">
            <Typography>{product.description}</Typography>
          </Stack>

          <Divider orientation="vertical" variant="middle" flexItem />

          <Stack direction="row" alignItems="end" justifyContent="center">
            <IconButton size="large" color="inherit">
              <QueryStatsIcon />
            </IconButton>

            <IconButton size="large" color="inherit">
              <EditIcon />
            </IconButton>

            <DropDownStatus />
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}

export { Product }
