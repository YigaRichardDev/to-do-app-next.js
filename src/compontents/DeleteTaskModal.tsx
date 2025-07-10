import {
  Dialog, DialogTitle, DialogContent,
  DialogActions, Button, Typography
} from '@mui/material';

interface Props {
  open: boolean
  onConfirm: () => void
  onCancel: () => void
}

export default function ConfirmDeleteModal({ open, onConfirm, onCancel }: Props) {
  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>Delete Task</DialogTitle>
      <DialogContent>
        <Typography>Are you sure you want to delete this task?</Typography>
      </DialogContent>
      <DialogActions>
        <Button size='small' onClick={onCancel}>Cancel</Button>
        <Button size='small' color="error" onClick={onConfirm}>Delete</Button>
      </DialogActions>
    </Dialog>
  )
}
