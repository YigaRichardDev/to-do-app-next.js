import { Task } from 'types/task';
import {
    Table, TableHead, TableRow, TableCell, TableBody,
    Checkbox, IconButton
} from '@mui/material';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import DeleteIcon from '@mui/icons-material/Delete';

interface Props {
    tasks: Task[]
    onStatusToggle: (task: Task) => void
    onDelete: (task: Task) => void
}

export default function TaskTable({ tasks, onStatusToggle, onDelete }: Props) {
    return (
        <div className="overflow-x-auto shadow rounded-lg">
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Created At</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tasks.map((task, index) => (
                            <TableRow key={task.id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{task.title}</TableCell>
                                <TableCell>
                                    <Checkbox
                                        checked={task.completed}
                                        onChange={() => onStatusToggle(task)}
                                    />
                                </TableCell>
                                <TableCell>{new Date(task.createdAt).toLocaleString()}</TableCell>
                                <TableCell align="right">
                                    <IconButton color="error" onClick={() => onDelete(task)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </div>
    )
}
