import {Button, Grid, TextField} from '@mui/material';

function QueryInput({handleClick, setQuery, query}) {
  return (
    <div>
      <Grid
        component='form'
        onSubmit={(e) => {
          e.preventDefault();
          handleClick();
        }}
        sx={{display: 'flex', alignContent: 'center'}}
        mb={2}
      >
        <TextField
          value={query}
          fullWidth
          onChange={(e) => setQuery(e.target.value)}
          helperText='Введите слово для перевода'
          autoComplete='off'
          autoFocus
        />
        <Button
          sx={{alignSelf: 'start', padding: '16.5px', marginLeft: '20px'}}
          onClick={handleClick}
        >
          Перевести
        </Button>
      </Grid>
    </div>
  );
}

export default QueryInput;
