'use client';

import { useState } from 'react';
import { updateTask, deleteTask } from '../lib/api';

export default function TaskCard({ task, onTaskUpdated }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleStatus = async () => {
    setIsLoading(true);
    try {
      const newStatus = task.status === 'PENDING' ? 'COMPLETED' : 'PENDING';
      await updateTask(task.id, { status: newStatus });
      onTaskUpdated();
    } catch (error) {
      console.error('Failed to update task:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    
    setIsLoading(true);
    try {
      await deleteTask(task.id);
      onTaskUpdated();
    } catch (error) {
      console.error('Failed to delete task:', error);
      setIsLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={`card p-4 transition-all duration-200 ${isLoading ? 'opacity-50' : ''}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center mb-2">
            <h3 className={`font-medium ${
              task.status === 'COMPLETED' 
                ? 'text-gray-500 line-through' 
                : 'text-gray-800'
            }`}>
              {task.title}
            </h3>
            
            <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${
              task.status === 'COMPLETED'
                ? 'bg-green-100 text-green-800'
                : 'bg-orange-100 text-orange-800'
            }`}>
              {task.status}
            </span>
          </div>

          {task.description && (
            <p className={`text-sm mb-2 ${
              task.status === 'COMPLETED' 
                ? 'text-gray-400' 
                : 'text-gray-600'
            }`}>
              {task.description}
            </p>
          )}

          <p className="text-xs text-gray-400">
            Created: {formatDate(task.createdAt)}
          </p>
        </div>

        <div className="flex space-x-2 ml-4">
          <button
            onClick={handleToggleStatus}
            disabled={isLoading}
            className={`btn text-sm ${
              task.status === 'COMPLETED' 
                ? 'btn-secondary' 
                : 'btn-success'
            }`}
            title={task.status === 'COMPLETED' ? 'Mark as pending' : 'Mark as completed'}
          >
            {task.status === 'COMPLETED' ? (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </button>

          <button
            onClick={handleDelete}
            disabled={isLoading}
            className="btn btn-danger text-sm"
            title="Delete task"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}