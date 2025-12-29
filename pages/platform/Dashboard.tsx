
import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area 
} from 'recharts';
import { TrendingUp, Users, ShoppingBag, CreditCard, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const PlatformDashboard: React.FC = () => {
  const data = [
    { name: '10-20', revenue: 4000, orders: 240 },
    { name: '10-21', revenue: 3000, orders: 139 },
    { name: '10-22', revenue: 2000, orders: 980 },
    { name: '10-23', revenue: 2780, orders: 390 },
    { name: '10-24', revenue: 1890, orders: 480 },
    { name: '10-25', revenue: 2390, orders: 380 },
    { name: '10-26', revenue: 3490, orders: 430 },
  ];

  const stats = [
    { label: '今日销售额', value: '￥24,500', trend: '+12.5%', isUp: true, icon: CreditCard, color: 'blue' },
    { label: '活跃用户', value: '12,840', trend: '+5.2%', isUp: true, icon: Users, color: 'purple' },
    { label: '新增订单', value: '1,205', trend: '-2.4%', isUp: false, icon: ShoppingBag, color: 'green' },
    { label: '平台毛利', value: '￥4,200', trend: '+8.1%', isUp: true, icon: TrendingUp, color: 'orange' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">数据概览</h1>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-white border rounded-lg text-sm text-gray-600 hover:bg-gray-50">近7天</button>
          <button className="px-4 py-2 bg-white border rounded-lg text-sm text-gray-600 hover:bg-gray-50">近30天</button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">导出数据</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-lg bg-${stat.color}-50 text-${stat.color}-600`}>
                  <Icon size={24} />
                </div>
                <div className={`flex items-center text-xs font-medium ${stat.isUp ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.trend}
                  {stat.isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border">
          <h3 className="text-lg font-semibold mb-6">销售趋势</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                />
                <Area type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h3 className="text-lg font-semibold mb-6">类目销售占比</h3>
          <div className="space-y-4">
            {[
              { label: '数码家电', value: 45, color: 'bg-blue-500' },
              { label: '时尚服装', value: 25, color: 'bg-purple-500' },
              { label: '美妆个护', value: 15, color: 'bg-pink-500' },
              { label: '生鲜食品', value: 10, color: 'bg-green-500' },
              { label: '其他', value: 5, color: 'bg-gray-400' },
            ].map((item, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{item.label}</span>
                  <span className="font-semibold">{item.value}%</span>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full ${item.color}`} style={{width: `${item.value}%`}}></div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 pt-6 border-t">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">平均订单金额</span>
              <span className="font-bold text-gray-900">￥142.00</span>
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-sm text-gray-500">累计成交人数</span>
              <span className="font-bold text-gray-900">42,501</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlatformDashboard;
