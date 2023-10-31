import axios from 'axios';
import { useState, useEffect, useCallback } from 'react';
import './App.css'

import { List, Header } from 'semantic-ui-react'

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/activities').then((response) => {
      setData(response.data);
    })
  }, []);

  const renderList = useCallback(() => {
    if (data?.length) {
      return <List>
        {data.map(({title}) => (
          <List.Item>{title}</List.Item>
        ))}
    </List>
    }
    return null
  }, [data])

  return (
    <>
      <Header as="h2" icon="users" content="Reactivities" />
      {renderList()}
    </>
  )
}

export default App
