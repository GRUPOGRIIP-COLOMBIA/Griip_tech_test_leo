import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    container: {
        width: 400,
        height: 500,
        margin: 'auto',
        marginTop: 120,
        backgroundColor: 'white',
        color: 'black',
        boxShadow: theme.shadows[5],
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        [theme.breakpoints.down('xs')]: {
            width: 300,
            marginTop: 50,
            height: 480,
        },
    },
    login: {
        backgroundColor: '#07e0b0',
        color: 'white',
        fontWeight: 'bolder',
        '&:hover': {
            backgroundColor: '#08FFC8'
        },
        [theme.breakpoints.down('xs')]: {
            marginTop: 35,
        },
    },
    fieldsContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: 350,
        height: 350,
        marginTop: 20,
        justifyContent: 'space-around',
        alignItems: 'center',
        [theme.breakpoints.down('xs')]: {
            width: 300,
            height: 300
        },
    },
    headerContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: 280,
        padding: '35px 35px 0 35px',
        textAlign: 'center',
        [theme.breakpoints.down('xs')]: {
            width: 300,
            padding: '20px 0',
        },
    },
    textField: {
        width: 280,
        '& label.Mui-focused': {
            color: '#37399D',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#37399D',
        },
        [theme.breakpoints.down('xs')]: {
            width: 250
        },
    },
    textDiv: {
        width: 280,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    error: {
        color: 'red',
        fontSize: '0.7rem',
        alignSelf: 'start',
        marginTop: 3,
        [theme.breakpoints.down('xs')]: {
            marginLeft: 15,
        },
    },
    header: {
        margin: 0,
    },
    subHeader: {
        fontSize: '0.75rem',
        marginTop: 8,
    },
    subLink: {
        color: '#37399D',
        cursor: 'pointer',
        '&:hover': {
            color: '#08FFC8',
        },
    },
    loading: {
        color: '#37399D',
        marginTop: 20,
    },
    textWrapper: {
        zIndex: 10,
        margin: '70px 0'
    },
    title: {
        textAlign: 'center',
        color: 'black',
        fontSize: '1.8rem',
    },
    message: {
        fontSize: '0.75rem',
        color: '#A52CEE',
        textAlign: 'center',
    },
}));