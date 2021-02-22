import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        [theme.breakpoints.down('xs')]: {
            height: '105vh',
        },
    },
    title: {
        color: '#37399D',
        fontSize: '2.5rem',
        fontWeight: 100,
        marginTop: 100,
        [theme.breakpoints.down('xs')]: {
            marginTop: 30,
            fontSize: '1.9rem',
        },
    },
    banner: {
        width: 500,
        height: 380,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#37399D',
        color: 'white',
        fontSize: '1.5rem',
        textAlign: 'center',
        borderRadius: 5,
        boxShadow: 'var(--shd,0 1px 4px rgba(0,0,0,.6))',
        marginTop: 70,
        [theme.breakpoints.down('xs')]: {
            width: 300,
            height: 430,    
            marginTop: 50,
        },
    },
    calendar: {
        width: 150
    },
    text: {
        fontWeight: '100',
        fontSize: '1.3rem',
        width: 400,
        [theme.breakpoints.down('xs')]: {
            width: 260,
        },
    },
}));