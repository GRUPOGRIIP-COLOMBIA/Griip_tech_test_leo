import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    wrapper: {
        [theme.breakpoints.down('xs')]: {
            height: '100vh',
        },
    },
    container: {
        width: 400,
        height: 'min-content',
        margin: 'auto',
        marginTop: 180,
        backgroundColor: '#37399D',
        color: 'white',
        boxShadow: 'var(--shd,0 1px 4px rgba(0,0,0,.6))',
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 20,
        paddingTop: 40,
        textAlign: 'center',
        position: 'relative',
        [theme.breakpoints.down('xs')]: {
            width: 300,
            marginTop: 150,
        },
    },
    title: {
        textTransform: 'capitalize',
        width: '80%',
        textAlign: 'center',
        height: 'min-content',
    },
    date: {
        display: 'flex',
        width: 170,
        justifyContent: 'space-between',
        fontSize: '1.3rem'
    },
    infoButton: {
        backgroundColor: '#07e0b0',
        color: 'white',
        fontWeight: 'bolder',
        '&:hover': {
            backgroundColor: '#08FFC8'
        },
        margin: '10px 5px',
    },
    cancel: {
        position: 'absolute',
        top: 0,
        right: 0,
        cursor: 'pointer',
        '&:hover': {
            color: '#08FFC8',
        }
    },
    button: {
        backgroundColor: '#07e0b0',
        color: 'white',
        fontWeight: 'bolder',
        '&:hover': {
            backgroundColor: '#08FFC8'
        },
        margin: '10px 5px',
    },
    editContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: 400,
        height: 600,
        margin: '100px auto',
        backgroundColor: '#37399D',
        textAlign: 'center',
        borderRadius: 5,
        boxShadow: 'var(--shd,0 1px 4px rgba(0,0,0,.6))',
        paddingBottom: 20,
        position: 'relative',
        [theme.breakpoints.down('xs')]: {
            width: 300,
            marginTop: 20,
        },
    },
    header: {
        color: 'white',
        fontWeight: '100',
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
    dates: {
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
        margin: '0 5px',
    },
    back: {
        border: '2px solid white',
        borderRadius: '50%',
        position: 'absolute',
        top: 5,
        left: 5,
        cursor: 'pointer',
        '&:hover': {
            color: '#08FFC8',
            borderColor: '#08FFC8'
        },
    },
}));