export default function Header() {
  return (
    <header className="text-center mb-12">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary-500 to-cyan-500 rounded-2xl mb-4">
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      </div>
      
      <h1 className="text-4xl font-bold text-gray-800 mb-2">
        Task Manager
      </h1>
      
      <p className="text-lg text-gray-600 mb-1">
        Stay organized and productive with your personal task manager
      </p>
      
      <p className="text-sm text-gray-500">
        Created by <span className="font-medium text-primary-600">Omar Hashmi</span>
      </p>
    </header>
  );
}