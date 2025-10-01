import React from 'react';
import {
  Home, Users, TrendingUp, FileText, DollarSign, UserPlus,
  Package, Bot, MessageSquare, Gift, ChevronDown, ChevronRight,
  CreditCard, Settings
} from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { useAuth } from '../../contexts/AuthContext';
import { usePermissions } from '../../hooks/usePermissions';
import { Link, useLocation } from 'react-router-dom';
import { translations as t } from '../../i18n/translations';

interface MenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  path?: string;
  gradient: string;
  section: string;
  children?: {
    label: string;
    path: string;
  }[];
}

const menuItems: MenuItem[] = [
  {
    id: 'dashboard',
    label: t.sidebar.dashboard,
    icon: Home,
    path: '/dashboard',
    gradient: 'section-gradient-dashboard',
    section: 'dashboard'
  },
  {
    id: 'leads',
    label: t.sidebar.leads,
    icon: Users,
    gradient: 'section-gradient-leads',
    section: 'leads',
    children: [
      { label: t.sidebar.leadsCRM, path: '/leads/crm' },
      { label: t.sidebar.leadMetrics, path: '/leads/metrics' }
    ]
  },
  {
    id: 'sales',
    label: t.sidebar.sales,
    icon: TrendingUp,
    gradient: 'section-gradient-sales',
    section: 'sales',
    children: [
      { label: t.sidebar.salesPipeline, path: '/sales/pipeline' },
      { label: t.sidebar.salesCRM, path: '/sales/crm' },
      { label: t.sidebar.salesMetrics, path: '/sales/metrics' },
      { label: t.sidebar.setterReports, path: '/sales/setter-reports' },
      { label: t.sidebar.closerReports, path: '/sales/closer-reports' }
    ]
  },
  {
    id: 'documents',
    label: t.sidebar.documents,
    icon: FileText,
    gradient: 'section-gradient-documents',
    section: 'documents',
    children: [
      { label: t.sidebar.proposals, path: '/documents/proposals' },
      { label: t.sidebar.contracts, path: '/documents/contracts' },
      { label: t.sidebar.invoices, path: '/documents/invoices' }
    ]
  },
  {
    id: 'finances',
    label: t.sidebar.finances,
    icon: DollarSign,
    gradient: 'section-gradient-finances',
    section: 'finances',
    children: [
      { label: t.sidebar.financialDashboard, path: '/finances/dashboard' },
      { label: t.sidebar.cashIn, path: '/finances/cash-in' },
      { label: t.sidebar.cashOut, path: '/finances/cash-out' },
      { label: t.sidebar.receivables, path: '/finances/receivables' },
      { label: t.sidebar.calendar, path: '/finances/calendar' }
    ]
  },
  {
    id: 'onboarding',
    label: t.sidebar.operations,
    icon: UserPlus,
    gradient: 'section-gradient-onboarding',
    section: 'operations',
    children: [
      { label: t.sidebar.oneClickOnboarding, path: '/onboarding/one-click' },
      { label: t.sidebar.employeeOnboarding, path: '/onboarding/employee' }
    ]
  }
];

const Sidebar: React.FC = () => {
  const { sidebarCollapsed, setSidebarCollapsed, activeSidebarItem, setActiveSidebarItem } = useApp();
  const { role } = useAuth();
  const { hasPermission } = usePermissions(role);
  const location = useLocation();

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const toggleMenuItem = (itemId: string) => {
    if (activeSidebarItem === itemId) {
      setActiveSidebarItem(null);
    } else {
      setActiveSidebarItem(itemId);
    }
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Filter menu items based on permissions
  const filteredMenuItems = menuItems.filter(item => 
    hasPermission(item.section as any)
  );

  return (
    <>
      {/* Mobile Overlay */}
      {!sidebarCollapsed && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-gray-900/50 backdrop-blur-sm border-r border-gray-800/50 transition-all duration-300 z-50 ${
        sidebarCollapsed ? 'w-16' : 'w-64'
      }`}>
        
        {/* Toggle Button */}
        <button
          onClick={toggleSidebar}
          className="absolute -right-3 top-4 w-6 h-6 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center transition-colors"
        >
          {sidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>

        {/* Navigation */}
        <nav className="p-4 space-y-2 overflow-y-auto h-full">
          {filteredMenuItems.map((item) => (
            <div key={item.id}>
              {/* Main Menu Item */}
              <div>
                {item.path ? (
                  <Link
                    to={item.path}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 group ${
                      isActive(item.path) 
                        ? 'bg-gray-800 text-white' 
                        : 'hover:bg-gray-800/50 text-gray-300 hover:text-white'
                    }`}
                  >
                    <item.icon className="h-5 w-5 flex-shrink-0" />
                    {!sidebarCollapsed && (
                      <span className="font-medium">{item.label}</span>
                    )}
                  </Link>
                ) : (
                  <button
                    onClick={() => toggleMenuItem(item.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 group ${
                      activeSidebarItem === item.id 
                        ? 'bg-gray-800 text-white' 
                        : 'hover:bg-gray-800/50 text-gray-300 hover:text-white'
                    }`}
                  >
                    <item.icon className="h-5 w-5 flex-shrink-0" />
                    {!sidebarCollapsed && (
                      <>
                        <span className="font-medium flex-1 text-left">{item.label}</span>
                        {item.children && (
                          <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${
                            activeSidebarItem === item.id ? 'rotate-180' : ''
                          }`} />
                        )}
                      </>
                    )}
                  </button>
                )}
              </div>

              {/* Submenu */}
              {item.children && !sidebarCollapsed && (
                <div className={`overflow-hidden transition-all duration-200 ${
                  activeSidebarItem === item.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="ml-8 mt-2 space-y-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.path}
                        to={child.path}
                        className={`block px-3 py-2 text-sm rounded-lg transition-all duration-200 ${
                          isActive(child.path)
                            ? `gradient-text ${item.gradient} font-medium`
                            : 'text-gray-400 hover:text-white hover:bg-gray-800/30'
                        }`}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;