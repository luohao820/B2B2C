
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend } from 'recharts';
import { Calendar, Search, Filter, Download, ArrowUpRight, TrendingUp, ShoppingBag, CreditCard, ChevronDown, Package, LayoutGrid, FileText } from 'lucide-react';

const ProductReports: React.FC = () => {
  const [dateRange, setDateRange] = useState('2023-10-01 ~ 2023-10-27');

  const productData = [
    { name: 'iPhone 15 Pro', sales: 420, revenue: 3780000, settlement: 3444000, margin: '8.8%', stock: 120 },
    { name: '北面冲锋衣', sales: 1250, revenue: 1998750, settlement: 1500000, margin: '24.9%', stock: 45 },
    { name: '索尼 XM5', sales: 310, revenue: 774690, settlement: 651000, margin: '15.9%', stock: 220 },
    { name: '九阳破壁机', sales: 840, revenue: 503160, settlement: 420000, margin: '16.5%', stock: 180 },
    { name: 'AirPods Pro', sales: 1560, revenue: 2338440, settlement: 2100000, margin: '10.1%', stock: 95 },
  ];

  const chartData = [
    { name: '手机', value: 3780000 },
    { name: '户外', value: 1998750 },
    { name: '穿戴', value: 2338440 },
    { name: '厨电', value: 503160 },
  ];

  const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
           <h1 className="text-2xl font-bold text-gray-800">商品维度销售分析</h1>
           <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Product-Based GTV & Performance Analysis</p>
        </div>
        <div className="flex space-x-3">
          <div className="bg-white border px-4 py-2.5 rounded-xl flex items-center text-sm font-bold text-gray-600 shadow-sm cursor-pointer hover:bg-gray-50 transition">
             <Calendar size={18} className="mr-2 text-blue-600" /> {dateRange} <ChevronDown size={14} className="ml-2" />
          </div>
          <button className="px-4 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-100 flex items-center hover:bg-blue-700">
             <Download size={18} className="mr-2" /> 导出报表
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl border shadow-sm relative overflow-hidden group">
          <div className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">已统计商品数</div>
          <div className="text-3xl font-black text-gray-900 italic">451 <span className="text-sm font-normal text-gray-400 uppercase">Skus</span></div>
          <div className="text-[10px] text-green-600 mt-2 font-black">+12 较上期</div>
        </div>
        <div className="bg-white p-6 rounded-3xl border shadow-sm relative overflow-hidden group">
          <div className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">商品总成交额 (GTV)</div>
          <div className="text-3xl font-black text-blue-600">￥8.24M</div>
          <div className="text-[10px] text-blue-400 mt-2 font-black">↑ 8.2% 转化提升</div>
        </div>
        <div className="bg-white p-6 rounded-3xl border shadow-sm relative overflow-hidden group">
          <div className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">累计销量</div>
          <div className="text-3xl font-black text-gray-900 italic">12.5k <span className="text-sm font-normal text-gray-400 uppercase">Items</span></div>
          <div className="text-[10px] text-orange-600 mt-2 font-black">客单价 ￥659.2</div>
        </div>
        <div className="bg-white p-6 rounded-3xl border shadow-sm relative overflow-hidden group">
          <div className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">平均毛利率 (Margin)</div>
          <div className="text-3xl font-black text-purple-600">14.2%</div>
          <div className="text-[10px] text-purple-400 mt-2 font-black">系统核心利润率趋势</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl border shadow-sm">
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-sm font-black text-gray-800 uppercase tracking-widest flex items-center">
              <TrendingUp size={18} className="mr-2 text-blue-600" /> Top 5 商品销量贡献分析
            </h3>
            <div className="flex space-x-2">
               <span className="flex items-center text-[10px] font-bold text-gray-400"><div className="w-2 h-2 rounded-full bg-blue-500 mr-1.5"></div> 销售数量</span>
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={productData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f3f4f6" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} width={100} tick={{fill: '#4b5563', fontSize: 11, fontWeight: 'bold'}} />
                <Tooltip 
                   cursor={{fill: 'transparent'}}
                   contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                />
                <Bar dataKey="sales" fill="#3b82f6" radius={[0, 10, 10, 0]} barSize={20}>
                   {productData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border shadow-sm">
           <h3 className="text-sm font-black text-gray-800 uppercase tracking-widest flex items-center mb-10">
              <LayoutGrid size={18} className="mr-2 text-purple-600" /> 类目金额占比 (Revenue)
            </h3>
           <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={8}
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{fontSize: '10px', fontWeight: 'bold'}} />
                </PieChart>
              </ResponsiveContainer>
           </div>
           <div className="mt-6 space-y-3">
              <div className="flex justify-between text-xs font-bold border-t pt-4">
                 <span className="text-gray-400">主力类目</span>
                 <span className="text-blue-600 font-black">数码通讯 (45.9%)</span>
              </div>
              <p className="text-[10px] text-gray-400 leading-relaxed italic">当前销售额高度集中于高价值电子产品。建议后续增加高毛利日用百货的活动曝光。</p>
           </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl border shadow-sm overflow-hidden">
        <div className="p-6 border-b flex justify-between items-center bg-gray-50/20">
           <h2 className="text-sm font-black text-gray-900 uppercase tracking-widest flex items-center">
             <FileText size={16} className="mr-2 text-blue-600" /> 商品级报表明细流水
           </h2>
           <div className="relative w-72">
             <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
             <input type="text" placeholder="搜索具体商品名或SKU..." className="w-full pl-12 pr-4 py-2.5 border rounded-2xl text-xs focus:ring-4 focus:ring-blue-50 outline-none transition-all" />
           </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] font-black text-gray-400 uppercase tracking-widest border-b">
                <th className="py-5 px-8">商品名称 (Product)</th>
                <th className="py-5 px-6 text-center">成交数量</th>
                <th className="py-5 px-6 text-right">总成交金额 (GTV)</th>
                <th className="py-5 px-6 text-right">已结算金额</th>
                <th className="py-5 px-6 text-center">利润率 (Margin)</th>
                <th className="py-5 px-6 text-center">状态</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {productData.map((p, i) => (
                <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-5 px-8">
                    <div className="flex items-center">
                       <div className="w-8 h-8 bg-gray-50 rounded-lg mr-3 flex items-center justify-center text-gray-300">
                          <Package size={16} />
                       </div>
                       <span className="text-sm font-bold text-gray-800">{p.name}</span>
                    </div>
                  </td>
                  <td className="py-5 px-6 text-center font-bold text-gray-600">{p.sales} <span className="text-[10px] font-normal opacity-50 uppercase">qty</span></td>
                  <td className="py-5 px-6 text-right font-black text-gray-900">￥{p.revenue.toLocaleString()}</td>
                  <td className="py-5 px-6 text-right font-black text-blue-600">￥{p.settlement.toLocaleString()}</td>
                  <td className="py-5 px-6 text-center">
                     <span className="px-2 py-0.5 bg-green-50 text-green-600 rounded text-[10px] font-black">{p.margin}</span>
                  </td>
                  <td className="py-5 px-6 text-center">
                     <div className="flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2 shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
                        <span className="text-[10px] font-black text-gray-400 uppercase">On Sale</span>
                     </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductReports;
