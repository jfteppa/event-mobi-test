import React, { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Stack from 'react-bootstrap/Stack';
import { MemoizedOwner } from './owner';

const ListItem = ({item}) => {
  const fileTags = [];
  const { files } = item;
  const [forks, setForks] = useState([]);

  for (var file in files) {
    const fileType = files[file].type;
    if (!fileTags.includes(fileType)) {
      fileTags.push(fileType);
    }
  }

  useEffect(() => {
    const fetchForks = async () => {
      // to prevent requests limit, used with username "gamozolabs"
      // if (item?.forks_url && item?.id === 'bef74c8aefc295e591514d97726d754e') {
      if (item?.forks_url) {
        const resp = await fetch(item?.forks_url).then(data => data.json());
        const forks = [];
        for (let i = 0 ; i < 3; i++) {
          const fork = resp.pop();
          fork.owner.avatar_link = fork.html_url;
          forks.push(fork.owner);
        }
        setForks(forks);
      }
    }
    
    fetchForks();
  }, [item]);

  return (
    <Card className="text-center" style={{height: '100%'}}>
      <Card.Header>
        {item?.description}
      </Card.Header>
      <Card.Body>
        <Card.Title>Forked By:</Card.Title>
        <Row>
          { forks.map((owner) => 
            <Col key={owner.id} sm={2}>
              <MemoizedOwner owner={owner} />
            </Col>
          )}
        </Row>
        <Card.Subtitle className="mb-2 text-muted">File Types:</Card.Subtitle>
        <Stack direction="horizontal" gap={3}>
          { fileTags.map((tag, index) => <Badge pill bg="secondary" key={index}>{tag}</Badge>) }
        </Stack>
      </Card.Body>
    </Card>
  )
}

const MemoizedListItem = React.memo(ListItem);

export default MemoizedListItem;
