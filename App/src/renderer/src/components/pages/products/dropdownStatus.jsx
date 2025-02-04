import { useState } from 'react'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Fade from '@mui/material/Fade'

const DropDownStatus = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [label, setLabel] = useState('Ativo')
  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = (label) => {
    setAnchorEl(null)
    setLabel(label)
  }

  return (
    <div>
      <Button
        id="fade-button"
        aria-controls={open ? 'fade-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        {label}
      </Button>
      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button'
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={() => handleClose('Desativar')}>Desativar</MenuItem>
        <MenuItem onClick={() => handleClose('Excluir')}>Excluir</MenuItem>
      </Menu>
    </div>
  )
}

export { DropDownStatus }
