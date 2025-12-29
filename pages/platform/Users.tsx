
import React, { useState } from 'react';
// Added Users to the imports from lucide-react
import { User, Users, Shield, Star, Smartphone, Calendar, Search, Tag, History, Ban, CheckCircle, MessageSquare, MoreHorizontal, Filter, X } from 'lucide-react';
import { UserLevel, UserStatus } from '../../types';

const UserManagement: React.FC = () => {
  const [showDetail, setShowDetail] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('all');

  const users = [
    { 
      id: 'USER_001', 
      name: '小王同学', 
      phone: '138****1234', 
      email: 'wang@example.com',
      level: UserLevel.VIP, 
      mileage: 12500.5, 
      orders: 42, 
      spent: 8900.00, 
      status: UserStatus.NORMAL, 
      reg_source: '小程序',
      reg_time: '2023-01-12 10:00:00',
      last_login: '2023-10-26 22:30:15',
      tags: ['高价值', '活跃用户'],
      notes: [
        { time: '2023-09-15', content: '用户咨询积分兑换规则' },
        { time: '2023-10-01', content: '协助处理物流延迟问题' }
      ]
    },
    { 
      id: 'USER_002', 
      name: '资深购物狂', 
      phone: '139****5678', 
      email: 'shopping@mall.com',
      level: UserLevel.SVIP, 
      mileage: 45000.0, 
      orders: 156, 
      spent: 56000.00, 
      status: UserStatus.NORMAL, 
      reg_source: 'APP',
      reg_time: '2022-05-20 14:30:00',
      last_login: '2023-10-27 09:15:00',
      tags: ['忠实粉丝', '数码达人', '高客单价'],
      notes: []
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">全域用户管理</h1>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition">
            用户分群看板
          </button>
        </div>
      </div>

      {/* User Detail Modal */}
      {showDetail && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-4xl overflow-hidden shadow-2xl animate-in zoom-in duration-200 h-[85vh] flex flex-col">
            <div className="p-6 border-b flex justify-between items-center bg-gray-50">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 font-bold text-xl mr-4 shadow-inner">
                  {showDetail.name[0]}
                </div>
                <div>
                  <h3 className="text-lg font-bold">{showDetail.name}</h3>
                  <p className="text-xs text-gray-400 font-mono">UID: {showDetail.id}</p>
                </div>
              </div>
              <button onClick={() => setShowDetail(null)} className="text-gray-400 hover:text-gray-600 transition-colors"><X size={24} /></button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-8 bg-white grid grid-cols-3 gap-8">
              {/* Left Column: Basic Info & Profile */}
              <div className="space-y-8">
                <section>
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center">
                    <Shield size={14} className="mr-2" /> 账户基础信息
                  </h4>
                  <div className="space-y-4 bg-gray-50 p-4 rounded-2xl">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">手机号码</span>
                      <span className="font-bold">{showDetail.phone}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">绑定邮箱</span>
                      <span className="font-bold">{showDetail.email}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">注册来源</span>
                      <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded text-[10px] font-bold">{showDetail.reg_source}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">注册时间</span>
                      <span className="text-gray-600 font-mono text-[11px]">{showDetail.reg_time}</span>
                    </div>
                  </div>
                </section>

                <section>
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center">
                    <Tag size={14} className="mr-2" /> 用户标签
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {showDetail.tags.map((tag: string) => (
                      <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium border border-gray-200">
                        {tag}
                      </span>
                    ))}
                    <button className="px-3 py-1 border border-dashed border-blue-300 text-blue-500 rounded-full text-xs font-bold hover:bg-blue-50 transition">+ 管理标签</button>
                  </div>
                </section>
              </div>

              {/* Middle Column: Assets & Behavior */}
              <div className="space-y-8 col-span-2">
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-orange-400 to-orange-600 p-6 rounded-3xl text-white shadow-lg shadow-orange-100">
                    <div className="text-xs opacity-80 mb-1">里程积分余额</div>
                    <div className="text-3xl font-black">{showDetail.mileage.toLocaleString()}</div>
                    <div className="mt-4 flex space-x-2">
                      <button className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded-lg text-xs font-bold transition">流水</button>
                      <button className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded-lg text-xs font-bold transition">发放</button>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-6 rounded-3xl text-white shadow-lg shadow-blue-100">
                    <div className="text-xs opacity-80 mb-1">累计消费金额</div>
                    <div className="text-3xl font-black">￥{showDetail.spent.toLocaleString()}</div>
                    <div className="mt-4 flex space-x-2">
                      <span className="bg-white/20 px-3 py-1 rounded-lg text-xs font-bold">成交 {showDetail.orders} 单</span>
                    </div>
                  </div>
                </div>

                <section>
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center">
                      <MessageSquare size={14} className="mr-2" /> 客服沟通记录
                    </h4>
                    <button className="text-xs text-blue-600 font-bold hover:underline">新增记录</button>
                  </div>
                  <div className="space-y-3">
                    {showDetail.notes.length > 0 ? showDetail.notes.map((note: any, i: number) => (
                      <div key={i} className="bg-gray-50 p-4 rounded-2xl border border-gray-100 flex items-start">
                        <div className="bg-blue-100 text-blue-600 p-2 rounded-xl mr-3">
                          <MessageSquare size={16} />
                        </div>
                        <div>
                          <p className="text-sm text-gray-700 leading-relaxed">{note.content}</p>
                          <span className="text-[10px] text-gray-400 mt-2 block font-mono uppercase">{note.time} · 客服专员01</span>
                        </div>
                      </div>
                    )) : (
                      <div className="py-10 text-center text-gray-300 bg-gray-50 rounded-2xl">
                        <History size={32} className="mx-auto mb-2 opacity-20" />
                        <p className="text-xs">暂无沟通记录</p>
                      </div>
                    )}
                  </div>
                </section>
              </div>
            </div>

            <div className="p-6 border-t bg-gray-50 flex justify-between items-center">
              <div className="flex space-x-3">
                <button className="px-6 py-2.5 bg-red-50 text-red-600 border border-red-100 rounded-xl font-bold hover:bg-red-100 transition flex items-center">
                  <Ban size={16} className="mr-2" /> 封禁账户
                </button>
                <button className="px-6 py-2.5 border bg-white text-gray-600 rounded-xl font-bold hover:bg-gray-100 transition">重置密码</button>
              </div>
              <button onClick={() => setShowDetail(null)} className="px-10 py-2.5 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition">
                确认并关闭
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-3xl border shadow-sm flex items-center">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mr-4">
            <Users size={24} />
          </div>
          <div>
            <div className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">累计用户</div>
            <div className="text-2xl font-black">124,501</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border shadow-sm flex items-center">
          <div className="w-12 h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mr-4">
            <History size={24} />
          </div>
          <div>
            <div className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">活跃用户 (MAU)</div>
            <div className="text-2xl font-black text-green-600">42,800</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border shadow-sm flex items-center">
          <div className="w-12 h-12 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mr-4">
            <Shield size={24} />
          </div>
          <div>
            <div className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">高风险用户</div>
            <div className="text-2xl font-black text-red-600">85</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border overflow-hidden">
        <div className="p-6 border-b flex justify-between items-center bg-gray-50/20">
          <div className="flex space-x-3">
            {['all', 'vip', 'svip', 'new'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 text-sm font-bold rounded-2xl transition-all ${
                  activeTab === tab ? 'bg-blue-600 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'
                }`}
              >
                {tab === 'all' ? '全部' : tab.toUpperCase()}
              </button>
            ))}
          </div>
          <div className="relative w-80">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="搜索用户名、手机号、标签"
              className="w-full pl-12 pr-4 py-3 border rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-5 font-bold text-gray-700 tracking-widest uppercase text-[10px]">核心画像</th>
                <th className="px-6 py-5 font-bold text-gray-700 tracking-widest uppercase text-[10px]">等级/来源</th>
                <th className="px-6 py-5 font-bold text-gray-700 tracking-widest uppercase text-[10px]">里程积分</th>
                <th className="px-6 py-5 font-bold text-gray-700 tracking-widest uppercase text-[10px]">消费统计</th>
                <th className="px-6 py-5 font-bold text-gray-700 tracking-widest uppercase text-[10px]">账户状态</th>
                <th className="px-6 py-5 font-bold text-right text-[10px]">快捷操作</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-gray-50 transition group">
                  <td className="px-6 py-5">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-400 mr-4 shadow-inner">
                        <User size={20} />
                      </div>
                      <div>
                        <div className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{u.name}</div>
                        <div className="text-[10px] text-gray-400 flex items-center mt-1">
                          <Smartphone size={10} className="mr-1" /> {u.phone}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex flex-col space-y-1">
                      <span className={`w-fit px-2 py-0.5 rounded text-[10px] font-bold tracking-widest uppercase ${
                        u.level === UserLevel.SVIP ? 'bg-purple-100 text-purple-700' :
                        u.level === UserLevel.VIP ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {u.level}
                      </span>
                      <span className="text-[10px] text-gray-400 font-bold">{u.reg_source}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 font-mono font-bold text-orange-600">{u.mileage.toLocaleString()}</td>
                  <td className="px-6 py-5">
                    <div className="font-bold text-gray-900">￥{u.spent.toLocaleString()}</div>
                    <div className="text-[10px] text-gray-400 font-bold mt-1 uppercase tracking-tighter">{u.orders} 笔订单</div>
                  </td>
                  <td className="px-6 py-5">
                    {u.status === UserStatus.NORMAL ? (
                      <span className="px-2.5 py-1 bg-green-50 text-green-700 rounded-lg text-[10px] font-bold uppercase tracking-widest flex items-center w-fit">
                        <CheckCircle size={10} className="mr-1" /> 正常
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 bg-red-50 text-red-700 rounded-lg text-[10px] font-bold uppercase tracking-widest flex items-center w-fit">
                        <Ban size={10} className="mr-1" /> 封禁
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex justify-end space-x-2">
                      <button 
                        onClick={() => setShowDetail(u)}
                        className="px-4 py-1.5 bg-blue-50 text-blue-600 rounded-xl text-xs font-bold hover:bg-blue-100 transition shadow-sm"
                      >
                        详情/管理
                      </button>
                      <button className="p-2 text-gray-400 hover:text-blue-600 transition"><MoreHorizontal size={18} /></button>
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

export default UserManagement;
