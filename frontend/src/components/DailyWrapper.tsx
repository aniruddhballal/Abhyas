import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Daily from './Daily'
import AddActivityForm from './AddActivityForm'

interface Activity {
  _id: string;
  date: string;
  category: string;
  title: string;
  description?: string;
  duration: number;
  timestamp: string;
}

function DailyWrapper() {
  const navigate = useNavigate()
  const { date } = useParams<{ date: string }>()
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(false)
  
  if (!date) {
    navigate('/')
    return null
  }
  
  const selectedDate = new Date(date)
  const dateString = date // YYYY-MM-DD format

  useEffect(() => {
    fetchActivities()
  }, [dateString])

  const fetchActivities = async () => {
    setLoading(true)
    try {
      const response = await fetch(`http://localhost:5000/api/activities/${dateString}`)
      const data = await response.json()
      setActivities(data.activities)
    } catch (error) {
      console.error('Failed to fetch activities:', error)
    } finally {
      setLoading(false)
    }
  }

  const isToday = dateString === new Date().toISOString().split('T')[0]
  
  return (
    <>
      {isToday && <AddActivityForm onActivityAdded={fetchActivities} />}
      <Daily 
        selectedDate={selectedDate} 
        onBack={() => navigate('/')}
        activities={activities}
        loading={loading}
      />
    </>
  )
}

export default DailyWrapper