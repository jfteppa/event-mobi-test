import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { fetchGistsByUsername, selectGists } from './gists-slice';

export default function Search() {
  const [username, setUsername] = useState('');
  const { loading } = useSelector(selectGists);
  const dispatch = useDispatch();
  // username for testing "gamozolabs" (with forks)

  return (
    <InputGroup className="mb-3">
      <FormControl
        value={username}
        placeholder="Search gists by username"
        aria-label="Recipient's username"
        onChange={e => setUsername(e.target.value)}
      />
      <Button 
        variant="outline-secondary" 
        id="button-addon2" 
        disabled={loading} 
        onClick={() => dispatch(fetchGistsByUsername(username))}>
          Search
      </Button>
    </InputGroup>
  )
}
