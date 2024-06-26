import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { toggleModal, openModal } from '../store/slices/appSlice';
import { LoadingButton } from '@mui/lab';
import { Box } from '@mui/material';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

type Props = {
    title: string;
    isLoading: boolean;
    saveFunc: (event: React.FormEvent<HTMLFormElement>) => void;
    children: React.ReactNode
}

export default function CustomizedDialogs({ title, children, saveFunc, isLoading }: Props) {
    const open = useSelector(openModal)
    const dispatch = useDispatch()
    const handleClose = () => {
        dispatch(toggleModal())
    };

    return (
        <React.Fragment>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <Box component="form" noValidate onSubmit={saveFunc}>
                    <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                        {title}
                    </DialogTitle>
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <DialogContent dividers>
                        {children}

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>
                            Bekor qilish
                        </Button>
                        <LoadingButton type='submit' loading={isLoading}>
                            Saqlash
                        </LoadingButton>
                    </DialogActions>
                </Box>
            </BootstrapDialog>
        </React.Fragment>
    );
}
