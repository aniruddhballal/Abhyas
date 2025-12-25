import { ArrowLeft, Clock } from 'lucide-react';

interface Activity {
  _id: string;
  date: string;
  category: string;
  title: string;
  description?: string;
  duration: number;
  timestamp: string;
}

interface DailyProps {
  selectedDate: Date;
  onBack: () => void;
  activities: Activity[];
  loading: boolean;
}

const categoryColors: Record<string, string> = {
  physical: 'bg-blue-100 text-blue-800 border-blue-300',
  spiritual: 'bg-purple-100 text-purple-800 border-purple-300',
  academic: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  project: 'bg-green-100 text-green-800 border-green-300',
  entertainment: 'bg-pink-100 text-pink-800 border-pink-300'
};

const Daily = ({ selectedDate, onBack, activities, loading }: DailyProps) => {
  const formatDate = (date: Date) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                    'July', 'August', 'September', 'October', 'November', 'December'];
    return `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const totalDuration = activities.reduce((sum, activity) => sum + activity.duration, 0);
  
  const categoryCounts = activities.reduce((acc, activity) => {
    acc[activity.category] = (acc[activity.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-gray-600">Loading activities...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back to Calendar</span>
        </button>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {formatDate(selectedDate)}
          </h1>
          <p className="text-gray-500 mb-8">View your activities and progress for this day</p>

          <div className="mb-8 flex gap-6">
            <div className="bg-blue-50 rounded-lg p-4 flex-1">
              <div className="text-2xl font-bold text-blue-600">{activities.length}</div>
              <div className="text-sm text-blue-700">Total Activities</div>
            </div>
            <div className="bg-green-50 rounded-lg p-4 flex-1">
              <div className="text-2xl font-bold text-green-600">{formatDuration(totalDuration)}</div>
              <div className="text-sm text-green-700">Total Duration</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 flex-1">
              <div className="text-2xl font-bold text-purple-600">
                {Object.keys(categoryCounts).length}
              </div>
              <div className="text-sm text-purple-700">Categories</div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Activities</h2>
            
            {activities.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No activities recorded for this day
              </div>
            ) : (
              <div className="space-y-3">
                {activities.map((activity) => (
                  <div
                    key={activity._id}
                    className={`border-l-4 rounded-r-lg p-4 hover:shadow-md transition-shadow ${categoryColors[activity.category] || 'bg-gray-100 border-gray-300'}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-lg">
                            {activity.title}
                          </h3>
                          <span className="text-xs uppercase font-medium px-2 py-1 rounded">
                            {activity.category}
                          </span>
                        </div>
                        {activity.description && (
                          <p className="text-sm mt-2 opacity-90 whitespace-pre-wrap">
                            {activity.description}
                          </p>
                        )}
                        <div className="flex items-center gap-4 text-xs mt-3 opacity-75">
                          <div className="flex items-center gap-1">
                            <Clock size={14} />
                            <span>{formatTime(activity.timestamp)}</span>
                          </div>
                          <span>Duration: {formatDuration(activity.duration)}</span>
                        </div>
                      </div>
                      <div className="text-sm font-semibold ml-4">
                        {formatDuration(activity.duration)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Daily;