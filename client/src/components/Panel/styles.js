import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        justifyContent: 'space-around',
        width: '90vw',
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column',
            alignItems: 'center',
            margin: 'auto',
            height: '150vh',
            paddingBottom: 100,
        },
    },
    leftDiv: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: 400,
        height: 600,
        marginTop: 100,
        backgroundColor: '#37399D',
        textAlign: 'center',
        borderRadius: 5,
        boxShadow: 'var(--shd,0 1px 4px rgba(0,0,0,.6))',
        paddingBottom: 20,
        [theme.breakpoints.down('xs')]: {
            width: 300,
            marginTop: 20,
        },
    },
    header: {
        color: 'white',
        fontWeight: '100',
        [theme.breakpoints.down('xs')]: {
            fontSize: '1.5rem',
        },
    },
    form: {
        backgroundColor: 'white',
        width: '80%',
        height: '75%',
        borderRadius: 5,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    textField: {
        width: '80%',
    },
    body: {
        [theme.breakpoints.down('xs')]: {
            width: '80%',
        },
    },
    date: {
        [theme.breakpoints.down('xs')]: {
            width: '80%',
        },
    },
    login: {
        backgroundColor: '#07e0b0',
        color: 'white',
        fontWeight: 'bolder',
        '&:hover': {
            backgroundColor: '#08FFC8'
        },
    },
    rigthDiv: {
        height: 600,
        marginTop: 100,
        [theme.breakpoints.down('xs')]: {
            width: 300,
            marginTop: 10,
            height: 500,
        },
    },
    rightTitle: {
        color: '#37399D',
        fontWeight: '100',
        textAlign: 'center',
    },
    reminders: {
        width: 500,
        height: 540,
        overflowX: 'hidden',
        overflow: 'scroll',
        [theme.breakpoints.down('xs')]: {
            width: 300,
            height: 400
        },
    },
}));