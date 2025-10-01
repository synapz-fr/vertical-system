import React from 'react';
import {
  TrendingUp, Users, DollarSign, Target,
  Phone, Mail, Calendar, Award
} from 'lucide-react';
import KPICard from '../components/Dashboard/KPICard';
import ChartCard from '../components/Dashboard/ChartCard';
import ProgressRing from '../components/Dashboard/ProgressRing';
import MetricBar from '../components/Dashboard/MetricBar';
import { translations as t } from '../i18n/translations';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text section-gradient-dashboard">
            {t.dashboard.title}
          </h1>
          <p className="text-gray-400 mt-2">
            {t.dashboard.subtitle}
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-sm text-gray-400">{t.common.today}</p>
            <p className="text-lg font-semibold text-white">
              {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title={t.dashboard.totalRevenue}
          value="$127,450"
          change="+12.5%"
          icon={DollarSign}
          trend="up"
        />
        <KPICard
          title={t.dashboard.activeLeads}
          value="1,247"
          change="+8.2%"
          icon={Users}
          trend="up"
        />
        <KPICard
          title={t.dashboard.conversionRate}
          value="18.7%"
          change="+2.1%"
          icon={Target}
          trend="up"
        />
        <KPICard
          title={t.dashboard.monthlyGrowth}
          value="23.4%"
          change="+5.3%"
          icon={TrendingUp}
          trend="up"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title={t.dashboard.revenueTrend}>
          <div className="w-full space-y-4">
            <MetricBar label={t.dashboard.january} value={85} maxValue={100} color="#ef4444" />
            <MetricBar label={t.dashboard.february} value={92} maxValue={100} color="#f97316" />
            <MetricBar label={t.dashboard.march} value={78} maxValue={100} color="#eab308" />
            <MetricBar label={t.dashboard.april} value={95} maxValue={100} color="#22c55e" />
            <MetricBar label={t.dashboard.may} value={88} maxValue={100} color="#06b6d4" />
            <MetricBar label={t.dashboard.june} value={100} maxValue={100} color="#8b5cf6" />
          </div>
        </ChartCard>

        <ChartCard title={t.dashboard.performanceMetrics}>
          <div className="grid grid-cols-2 gap-12 px-8">
            <ProgressRing
              percentage={87}
              size={140}
              strokeWidth={12}
              color="#ef4444"
              label={t.dashboard.leadQuality}
            />
            <ProgressRing
              percentage={92}
              size={140}
              strokeWidth={12}
              color="#f97316"
              label={t.dashboard.closeRate}
            />
          </div>
        </ChartCard>
      </div>

      {/* Activity Feed & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ChartCard title={t.dashboard.recentActivity}>
            <div className="w-full space-y-4">
              {[
                { icon: Phone, text: "Call scheduled with John Doe", time: "2 hours ago", color: "text-blue-400" },
                { icon: Mail, text: "Proposal sent to ABC Corp", time: "4 hours ago", color: "text-green-400" },
                { icon: Calendar, text: "Meeting with design team", time: "6 hours ago", color: "text-purple-400" },
                { icon: Award, text: "Deal closed with XYZ Inc", time: "1 day ago", color: "text-yellow-400" }
              ].map((activity, index) => (
                <div key={index} className="flex items-center space-x-4 p-3 bg-gray-800/30 rounded-lg">
                  <activity.icon className={`h-5 w-5 ${activity.color}`} />
                  <div className="flex-1">
                    <p className="text-sm text-white">{activity.text}</p>
                    <p className="text-xs text-gray-400">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </ChartCard>
        </div>

        <div className="space-y-6">
          <ChartCard title={t.dashboard.quickActions}>
            <div className="w-full space-y-3">
              {[
                { label: t.dashboard.addNewLead, color: "from-teal-400 to-cyan-600" },
                { label: t.dashboard.createProposal, color: "from-blue-400 to-purple-600" },
                { label: t.dashboard.scheduleCall, color: "from-emerald-500 to-indigo-600" },
                { label: t.dashboard.generateReport, color: "from-rose-400 to-amber-500" }
              ].map((action, index) => (
                <button
                  key={index}
                  className={`w-full p-3 rounded-lg bg-gradient-to-r ${action.color} opacity-80 hover:opacity-100 transition-all duration-200 text-white font-medium`}
                >
                  {action.label}
                </button>
              ))}
            </div>
          </ChartCard>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;