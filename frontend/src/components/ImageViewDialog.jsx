import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box } from '@mui/system';

const ImageViewDialog = ({ imageUrl, title, show, onClose }) => {

    return (
        <Dialog
            open={show}
            onClose={onClose}>
            <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
            <DialogContent>
                <img style={{
                    maxWidth: "100%",
                    maxHeight: "calc(100vh - 64px)"
                }}
                    src={imageUrl} alt={title} />
            </DialogContent>
        </Dialog>
    );
};

export default ImageViewDialog;