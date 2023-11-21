import { useState, useEffect } from 'react';

import { Container } from 'semantic-ui-react';

import NavBar from '../components/NavBar';
import { useLoading } from '../hooks/useLoading';
import { Activity } from '../models/activity';
import { initiallActivity } from '../libs/activity/constants';
import ActivityDashboard from '../features/activities/dashboard/ActivityDashboard';
import { agent } from '../libs/activity/functions';
import { getYearMonthDay } from '../libs/utility.functions';
import Loading from '../components/Loading';

function App() {
  const [data, setData] = useState<Activity[]>([]);
  const [activity, setActivity] = useState<Activity>(initiallActivity);
  const [openForm, setOpenForm] = useState(false);
  const { loading, setLoading } = useLoading();

  const fetchActivities = async () => {
    const data = await agent.activities.list();
    const newData = data.map((item) => ({...item, date: getYearMonthDay(item.date)}));
    setData(newData);
    setLoading(false);
  }

  useEffect(() => {
    fetchActivities();
  }, []);

  const handleCreate = () => {
    setActivity(initiallActivity);
    setOpenForm(true);
  }

  return (
    <>
      <NavBar create={handleCreate} />
      {loading ? <Loading /> : 
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard 
          activities={data} 
          openForm={openForm} 
          setOpenForm={setOpenForm} 
          activity={activity} 
          setActivity={setActivity}
          updateList={fetchActivities}
        />
      </Container>}
    </>
  )
}

export default App
