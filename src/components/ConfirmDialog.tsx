'use client';

import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface ConfirmDialogProps {
    open: boolean;
    title: string;
    description: string;
    onClose: () => void;
    onConfirm: () => void;
}

export const ConfirmDialog = ({ open, title, description, onClose, onConfirm }: ConfirmDialogProps) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            sx={{
                '& .MuiPaper-root': {
                    borderRadius: 6,
                },
            }}
        >
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography sx={{ fontWeight: 800, color: 'plat.textDark' }}>{title}</Typography>
                <IconButton onClick={onClose} size="small"><CloseIcon /></IconButton>
            </DialogTitle>
            <DialogContent>
                <Typography sx={{ color: 'plat.textMuted', fontSize: '14px' }}>{description}</Typography>
            </DialogContent>
            <DialogActions sx={{ p: 2, gap: 1 }}>
                <Button onClick={onClose} sx={{ borderRadius: 3, textTransform: 'none' }}>
                    Отмена
                </Button>
                <Button
                    onClick={() => { onConfirm(); onClose(); }}
                    variant="contained"
                    sx={{ borderRadius: 3, textTransform: 'none' }}
                >
                    Удалить
                </Button>
            </DialogActions>
        </Dialog>
    );
};
