import React, { useEffect, useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { DataInsights } from './components/insights/DataInsights';
import { AddEntityForm } from './components/AddEntityForm';
import { Plus, Menu, AlertCircle } from 'lucide-react';
import { useStore } from './store';

function App() {
  const [showSidebar, setShowSidebar] = useState(true);
  const [activeEntity, setActiveEntity] = useState<'provider' | 'simCard' | 'device' | 'customer' | null>(null);
  const { fetchAllData, loading } = useStore();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        if (!import.meta.env.VITE_AIRTABLE_TOKEN || !import.meta.env.VITE_AIRTABLE_BASE_ID) {
          setError('Airtable credentials are missing. Please check your environment variables.');
          return;
        }
        await fetchAllData();
      } catch (error: any) {
        console.error('Failed to fetch data:', error);
        setError(error?.message || 'Failed to load data. Please check your configuration.');
      }
    };

    initializeApp();
  }, [fetchAllData]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={() => setShowSidebar(!showSidebar)}
                className="p-2 rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <Menu className="h-6 w-6" />
              </button>
              <h1 className="ml-4 text-xl font-semibold text-gray-900">Device Management System</h1>
            </div>
          </div>
        </div>
      </header>

      {error && (
        <div className="bg-red-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-red-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      <div className="flex">
        {showSidebar && (
          <aside className="w-64 bg-white shadow-sm h-[calc(100vh-4rem)] p-4">
            <nav className="space-y-2">
              {['provider', 'simCard', 'device', 'customer'].map((entity) => (
                <button
                  key={entity}
                  onClick={() => setActiveEntity(entity as any)}
                  className="w-full px-4 py-2 text-left text-sm font-medium text-gray-700 rounded-md hover:bg-gray-50"
                >
                  {entity.charAt(0).toUpperCase() + entity.slice(1)}s
                </button>
              ))}
            </nav>
          </aside>
        )}

        <main className="flex-1 p-8">
          <Dashboard />
          <DataInsights />
          
          <button
            onClick={() => setActiveEntity('provider')}
            className="fixed bottom-8 right-8 p-4 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Plus className="h-6 w-6" />
          </button>

          {activeEntity && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-lg p-6 max-w-md w-full">
                <h2 className="text-lg font-semibold mb-4">
                  Add New {activeEntity.charAt(0).toUpperCase() + activeEntity.slice(1)}
                </h2>
                <AddEntityForm
                  type={activeEntity}
                  onClose={() => setActiveEntity(null)}
                />
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;