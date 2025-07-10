import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button
} from '@mui/material'
import { useState } from 'react'

interface Props {
  open: boolean
  onClose: () => void
  onSave: (title: string) => void
}

export default function TaskModal({ open, onClose, onSave }: Props) {
  const [title, setTitle] = useState('')

  const handleSubmit = () => {
    if (title.trim()) {
      onSave(title)
      setTitle('')
    }
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Task</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus fullWidth label="Task Title"
          value={title} onChange={(e) => setTitle(e.target.value)}
          margin="dense"
        required />
      </DialogContent>
      <DialogActions>
        <Button size='small' onClick={onClose}>Cancel</Button>
        <Button size='small' onClick={handleSubmit} variant="contained">Save</Button>
      </DialogActions>
    </Dialog>
  )
}
