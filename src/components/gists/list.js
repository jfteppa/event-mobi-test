import React, { Suspense } from "react";
import { useSelector } from 'react-redux';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { selectGists } from './gists-slice';

const MemoizedListItem = React.lazy(() => import('./list-item'));

export default function List() {
  const { list, loading, error } = useSelector(selectGists);

  if (loading) {
    return <p>Loading gists, please wait!</p>
  }

  if (error) {
    return <p>There was an error. { error?.message }</p>
  }

  if (!list.length) {
    return <p>There are no gists.</p>
  }

  return (
    <Row>
      { list.map((item) => (
        <Col className="mb-4" key={item.id} md={6}>
          <Suspense fallback={<p>loading...</p>}>
            <MemoizedListItem item={item} />
          </Suspense>
        </Col>  
      ))}
    </Row>
  )
}
