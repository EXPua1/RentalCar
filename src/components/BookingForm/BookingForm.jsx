import React, { useState } from 'react';
import { Formik, Field, Form } from 'formik';
import { TextField, Button, Modal, Box, Typography } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers';
import css from './BookingForm.module.css';

const BookingForm = () => {
    const [open, setOpen] = useState(false);

    const handleClose = (resetForm) => {
        setOpen(false);
        resetForm();
    };

    const styles = {
        fontFamily: 'var(--font-family)',
        background: 'var(--inputs)',
        width: '100%',
        border: 'none',
        '& .MuiInputBase-root': {
            border: 'none',
            '& .MuiOutlinedInput-notchedOutline': {
                border: 'none',
            },
        },
    }
    return (
        <div className={css.container}>
            <h2 className={css.title}>Book your car now</h2>
            <p className={css.description}>Please fill out the form below to book your car</p>

            <Formik
                initialValues={{
                    name: '',
                    email: '',
                    bookingDate: null,
                    comment: '',
                }}
                onSubmit={(values, { resetForm }) => {
                    setOpen(true);
                    const formattedValues = {
                        ...values,
                        bookingDate: values.bookingDate ? values.bookingDate.format('YYYY-MM-DD') : null,
                    };
                    console.log(formattedValues);

                    setTimeout(() => resetForm(), 0);
                }}
            >
                {({ setFieldValue, values, handleChange, resetForm }) => (
                    <>
                        <Form>
                            <div className={css.formField}>
                                <Field name="name">
                                    {({ field }) => (
                                        <TextField
                                            {...field}
                                            label="Name"
                                            variant="outlined"
                                            fullWidth
                                            required
                                            sx={styles}
                                        />
                                    )}
                                </Field>
                            </div>

                            <div className={css.formField}>
                                <Field name="email">
                                    {({ field }) => (
                                        <TextField
                                            {...field}
                                            label="Email"
                                            type="email"
                                            variant="outlined"
                                            fullWidth
                                            required
                                            sx={styles}
                                        />
                                    )}
                                </Field>
                            </div>

                            <div className={css.formField}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                  <Field name="bookingDate">
    {({ field }) => (
        <MobileDatePicker
            label="Booking Date"
            {...field}
            value={values.bookingDate}
            onChange={(date) => setFieldValue('bookingDate', date)}
           
            sx={styles}
            textField={(params) => (
                <TextField
                    {...params}
                    label="Booking Date"
                    variant="outlined"
                    fullWidth
                    required
                    placeholder="Enter date"
                    InputProps={{
                        ...params.InputProps,
                        disableUnderline: true,  
                    }}
                    sx={{
                        width: '100%',
                        border: 'none',  
                        '& .MuiInputBase-root': {
                            border: 'none',  
                            '& .MuiOutlinedInput-notchedOutline': {
                                border: 'none',  
                            },
                        },
                    }}
                />
            )}
        />
    )}
</Field>
                                </LocalizationProvider>
                            </div>

                            <div>
                                <Field
                                    as="textarea"
                                    name="comment"
                                    placeholder="Your comment"
                                    value={values.comment}
                                    onChange={handleChange}
                                    style={{
                                        width: '100%',
                                        height: '100px',
                                        resize: 'none',
                                        border: 'none',
                                        borderRadius: '12px',
                                        background: 'var(--inputs)',
                                        fontFamily: 'var(--font-family)',
                                        padding: '12px',
                                        outline: 'none',
                                    }}
                                    
                                  
                                />
                            </div>

                            <div className={css.button}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    sx={{
                                        borderRadius: '12px',
                                        width: '156px',
                                        fontFamily: 'var(--font-family)',
                                        fontWeight: '600',
                                        fontSize: '16px',
                                    }}
                                >
                                    Send
                                </Button>
                            </div>
                        </Form>

                        <Modal open={open} onClose={() => handleClose(resetForm)}>
                            <Box
                                sx={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    width: 400,
                                    bgcolor: 'background.paper',
                                    boxShadow: 24,
                                    p: 4,
                                    borderRadius: 2,
                                }}
                            >
                                <Typography variant="h6">Booking Confirmed!</Typography>
                                <Typography sx={{ mt: 2 }}>
                                    Your booking has been successfully submitted.
                                </Typography>

                                <Button
                                    onClick={() => handleClose(resetForm)}
                                    sx={{ mt: 3}}
                                    variant="contained"
                                    fullWidth
                                >
                                    OK
                                </Button>
                            </Box>
                        </Modal>
                    </>
                )}
            </Formik>
        </div>
    );
};

export default BookingForm;
