import Layout from '../components/Layout';
import { useState } from 'react';
import axios from 'axios';
import { Typography, TextField, Button } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { getError } from '../utils/error';
import useStyles from '../utils/styles';
import { IoSend } from "react-icons/io5";


export default function ContactUs() {
    const classes = useStyles();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        closeSnackbar();
        if (!fullName || !email || !subject || !message) {
            enqueueSnackbar('Please complete all required fields.', { variant: 'error' });
            return;
        }
        setIsLoading(true);
        try {
            await axios.post('/api/contactUs', { fullName, email, phoneNumber, subject, message });
            enqueueSnackbar("Thank you for taking the time to contact us!", { variant: 'success' });
            setFullName('');
            setEmail('');
            setPhoneNumber('');
            setSubject('');
            setMessage('');
        } catch (error) {
            enqueueSnackbar(getError(error), { variant: 'error' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Layout title="Contact us || SOLAR MART">
            <div className="contact-us-container">
                <form onSubmit={handleSubmit} className={classes.form}>
                    <TextField
                        variant="outlined"
                        fullWidth
                        id="fullName"
                        label="First and last name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        margin="normal"
                    />
                    <TextField
                        variant="outlined"
                        fullWidth
                        id="email"
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        margin="normal"
                    />
                    <TextField
                        variant="outlined"
                        fullWidth
                        id="phoneNumber"
                        label="Phone number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        margin="normal"
                    />
                    <TextField
                        variant="outlined"
                        fullWidth
                        id="subject"
                        label="Subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        margin="normal"
                    />
                    <TextField
                        variant="outlined"
                        fullWidth
                        id="message"
                        label="Message"
                        multiline
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        margin="normal"
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        disabled={isLoading}
                        className={classes.sendButton}
                    >
                        {isLoading ? "Sending..." : "Sending message"}
                        <IoSend className={classes.sendIcon}/>
                    </Button>
                </form>
            </div>
        </Layout>
    );
}
