import Container from 'react-bootstrap/Container';
import {Search, List} from './components/gists';

function App() {
  return (
    <Container className="p-3">
        <Search />
        <List />
      </Container>
  );
}

export default App;
