'use client';

import { useState } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import Header from './components/Header';
import Stats from './components/Stats';

export default function Home() {
  const [filter, setFilter] = useState('all');
  const [refreshKey, setRefreshKey] = useState(0);

  const handleTaskCreated = () => {
    setRefreshKey(prev => prev + 1);
  };

  const handleTaskUpdated = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Header />
        
        <div className="mb-8">
          <Stats refreshKey={refreshKey} />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Task Form */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <TaskForm onTaskCreated={handleTaskCreated} />
            </div>
          </div>

          {/* Task List */}
          <div className="lg:col-span-2">
            <div className="card p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Your Tasks</h2>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => setFilter('all')}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      filter === 'all'
                        ? 'bg-primary-100 text-primary-800'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setFilter('pending')}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      filter === 'pending'
                        ? 'bg-orange-100 text-orange-800'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Pending
                  </button>
                  <button
                    onClick={() => setFilter('completed')}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      filter === 'completed'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Completed
                  </button>
                </div>
              </div>

              <TaskList 
                filter={filter} 
                refreshKey={refreshKey}
                onTaskUpdated={handleTaskUpdated}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}