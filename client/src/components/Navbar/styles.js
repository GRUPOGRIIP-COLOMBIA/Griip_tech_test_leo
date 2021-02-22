import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between',
        background: '#37399D',
        padding: 10,
        height: '8.4vh',
    },
    rigthNav: {
        display: 'flex',
        width: 'min-content',
    },
    navButton: {
        color: 'white',
        alignSelf: 'center',
        textAlign: 'center',
        whiteSpace: 'nowrap',
        margin: '0 25px',
        textDecoration: 'none',
        cursor: 'pointer',
        '&:hover': {
            color: '#08FFC8'
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: '0.8rem',
            margin: '0 10px',
        },
    },
    logo: {
        marginLeft: 25,
        [theme.breakpoints.down('xs')]: {
            width: 100,
            marginLeft: 5,
        },
    },
}));