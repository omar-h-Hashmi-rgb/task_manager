'use client';

import useSWR from 'swr';
import { fetcher } from '../lib/api';

export default function Stats({ refreshKey }) {
  const { data: tasks, error } = useSWR(
    [`/api/tasks`, refreshKey],
    () => fetcher('/api/tasks')
  );

  if (error) return null;
  if (!tasks) return <StatsLoading />;

  const totalTasks = tasks.data.length;
  const completedTasks = tasks.data.filter(task => task.status === 'COMPLETED').length;
  const pendingTasks = totalTasks - completedTasks;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="card p-4 text-center">
        <div className="text-2xl font-bold text-primary-600 mb-1">{totalTasks}</div>
        <div className="text-sm text-gray-600">Total Tasks</div>
      </div>
      
      <div className="card p-4 text-center">
        <div className="text-2xl font-bold text-green-600 mb-1">{completedTasks}</div>
        <div className="text-sm text-gray-600">Completed</div>
      </div>
      
      <div className="card p-4 text-center">
        <div className="text-2xl font-bold text-orange-600 mb-1">{pendingTasks}</div>
        <div className="text-sm text-gray-600">Pending</div>
      </div>
      
      <div className="card p-4 text-center">
        <div className="text-2xl font-bold text-cyan-600 mb-1">{completionRate}%</div>
        <div className="text-sm text-gray-600">Completion</div>
      </div>
    </div>
  );
}

function StatsLoading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="card p-4 text-center animate-pulse">
          <div className="h-6 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
        </div>
      ))}
    </div>
  );
}