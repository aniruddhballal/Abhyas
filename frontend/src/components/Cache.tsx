import { useState } from 'react';
import { createCacheEntry} from '../api/api';
import type { CacheEntry} from '../api/api';

interface EntryPosition {
  x: number;
  y: number;
}

const Cache = () => {
  const [entries, setEntries] = useState<(CacheEntry & EntryPosition)[]>([]);
  const [isCreating, setIsCreating] = useState(false);

  const handleClick = async (e: React.MouseEvent<HTMLDivElement>) => {
    // Get click position relative to the viewport
    const x = e.clientX;
    const y = e.clientY;

    // Check if click is on an existing entry (we'll ignore those clicks)
    const target = e.target as HTMLElement;
    if (target.closest('.cache-entry-box')) {
      return;
    }

    if (isCreating) return;
    
    setIsCreating(true);
    
    try {
      const newEntry = await createCacheEntry({
        title: '',
        body: ''
      });
      
      console.log('Created new cache entry:', newEntry);
      
      // Add the new entry with its position
      setEntries([...entries, { ...newEntry, x, y }]);
    } catch (error) {
      console.error('Error creating cache entry:', error);
    } finally {
      setIsCreating(false);
    }
  };

  const handleTitleChange = (id: string, value: string) => {
    setEntries(entries.map(entry => 
      entry._id === id ? { ...entry, title: value } : entry
    ));
  };

  const handleBodyChange = (id: string, value: string) => {
    setEntries(entries.map(entry => 
      entry._id === id ? { ...entry, body: value } : entry
    ));
  };

  const formatTimestamp = (timestamp: Date) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div 
      className="w-full h-screen bg-gray-50 cursor-pointer relative overflow-auto"
      onClick={handleClick}
    >
      {entries.length === 0 && !isCreating && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <p className="text-2xl text-gray-400">Click/tap to jot</p>
        </div>
      )}
      
      {isCreating && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <p className="text-xl text-gray-500">Creating...</p>
        </div>
      )}

      {entries.map((entry) => (
        <div
          key={entry._id}
          className="cache-entry-box absolute bg-white rounded-lg shadow-lg p-4 border-2 border-gray-200"
          style={{
            left: `${entry.x}px`,
            top: `${entry.y}px`,
            width: '300px',
            transform: 'translate(-50%, -50%)' // Center the box on click position
          }}
        >
          <div className="mb-3">
            <label className="block text-xs font-semibold text-gray-500 mb-1">
              Timestamp
            </label>
            <div className="text-sm text-gray-700 bg-gray-50 px-2 py-1 rounded">
              {formatTimestamp(entry.timestamp)}
            </div>
          </div>

          <div className="mb-3">
            <label className="block text-xs font-semibold text-gray-500 mb-1">
              Title
            </label>
            <input
              type="text"
              value={entry.title}
              onChange={(e) => handleTitleChange(entry._id, e.target.value)}
              placeholder="Enter title..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          <div className="mb-2">
            <label className="block text-xs font-semibold text-gray-500 mb-1">
              Body
            </label>
            <textarea
              value={entry.body}
              onChange={(e) => handleBodyChange(entry._id, e.target.value)}
              placeholder="Enter body text..."
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cache;