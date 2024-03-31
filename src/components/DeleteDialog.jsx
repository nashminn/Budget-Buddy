import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete'

export default function DeleteDialog({ deleteHandle, id, promptTitle, prompt, ...props}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = ()=>{
    deleteHandle(id)
    handleClose()

    if(props.handleClose !== undefined) {
      props.handleClose()
    }
    
    if(props.resetCounter !== undefined) {
      props.setResetCounter(props.resetCounter + 1)
    }
  }

  return (
    <React.Fragment>
      {props.showIcon&&(<IconButton variant="outlined" onClick={handleClickOpen}>
        <DeleteIcon />
      </IconButton>)}
      {!props.showIcon&&(<div onClick={handleClickOpen}>{props.children}</div>)}
      
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {promptTitle}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {prompt}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={handleDelete} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
