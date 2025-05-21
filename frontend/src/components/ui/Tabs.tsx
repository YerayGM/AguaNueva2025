import React, { useState } from 'react';

interface Tab {
  id: string;
  label: string;
}

interface TabsProps {
  tabs: Tab[];
  children: React.ReactNode[];
}

const Tabs: React.FC<TabsProps> = ({ tabs, children }) => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  // Asegurarse de que hay un hijo para cada tab
  const childrenArray = React.Children.toArray(children);
  if (childrenArray.length !== tabs.length) {
    console.warn(`El número de tabs (${tabs.length}) no coincide con el número de contenidos (${childrenArray.length})`);
  }

  return (
    <div>
      <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
        <ul className="flex flex-wrap -mb-px">
          {tabs.map((tab) => (
            <li key={tab.id} className="mr-2">
              <button
                className={`inline-block py-2 px-4 font-medium text-sm transition-colors
                  ${activeTab === tab.id 
                    ? 'text-blue-600 dark:text-blue-500 border-b-2 border-blue-600 dark:border-blue-500' 
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
      
      {React.Children.map(children, (child, index) => {
        if (index < tabs.length) {
          return (
            <div className={activeTab === tabs[index].id ? '' : 'hidden'}>
              {child}
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

export default Tabs;