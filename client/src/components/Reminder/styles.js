import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        width: '100%',
        height: 50,
        backgroundColor: '#37399D',
        color: 'white',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: 'var(--shd,0 1px 4px rgba(0,0,0,.6))',
        borderRadius: 10,
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: '#4043b3',
            color: '#08FFC8',
        },
        marginBottom: 10,
    },
    title: {
        maxWidth: 300,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        marginLeft: 15,
        textTransform: 'capitalize',
        [theme.breakpoints.down('xs')]: {
            maxWidth: 110,

        },
    },
    date: {
        display: 'flex',
        width: 150,
        justifyContent: 'space-between',
        marginRight: 15,
    },
}));