'use client';

import useSWR from 'swr';
import TaskCard from './TaskCard';
import { fetcher } from '../lib/api';

export default function TaskList({ filter, refreshKey, onTaskUpdated }) {
  const { data: tasks, error, isLoading } = useSWR(
    [`/api/tasks`, refreshKey],
    () => fetcher('/api/tasks')
  );

  if (isLoading) return <TaskListLoading />;
  if (error) return <TaskListError />;
  if (!tasks || tasks.data.length === 0) return <EmptyState />;

  const filteredTasks = tasks.data.filter(task => {
    if (filter === 'all') return true;
    return task.status === filter;
  });

  if (filteredTasks.length === 0) {
    return <EmptyFilterState filter={filter} />;
  }

  return (
    <div className="space-y-3">
      {filteredTasks.map((task) => (
        <TaskCard 
          key={task.id} 
          task={task} 
          onTaskUpdated={onTaskUpdated}
        />
      ))}
    </div>
  );
}

function TaskListLoading() {
  return (
    <div className="space-y-3">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="card p-4 animate-pulse">
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-3/4"></div>
        </div>
      ))}
    </div>
  );
}

function TaskListError() {
  return (
    <div className="text-center py-8">
      <div className="text-red-500 text-sm">
        Failed to load tasks. Please try again.
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="text-center py-12">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      </div>
      <h3 className="text-lg font-medium text-gray-700 mb-2">No tasks yet</h3>
      <p className="text-gray-500">Create your first task to get started!</p>
    </div>
  );
}

function EmptyFilterState({ filter }) {
  const filterLabels = {
    pending: 'pending tasks',
    completed: 'completed tasks'
  };

  return (
    <div className="text-center py-8">
      <div className="text-gray-500">
        No {filterLabels[filter]} found.
      </div>
    </div>
  );
}