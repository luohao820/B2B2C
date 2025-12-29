
import React, { useState } from 'react';
import { RotateCcw, Search, MessageSquare, AlertCircle, CheckCircle, XCircle, X, ShoppingBag, User, MapPin, History, Info, ArrowRight } from 'lucide-react';
import { AfterSaleStatus, AfterSaleType } from '../../types';

const AfterSaleManagement: React.FC = () => {
  const [showAudit, setShowAudit] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('pending');

  const cases = [
    {
      id: 'AS_20231026_001',
      order_id: 'ORDER_001',
      user: '王小美',
      phone: '138****5678',
      type: AfterSaleType.RETURN,
      amount: 2999.00,
      mileage: 269.97,
      reason: '商品质量问题 - 屏幕亮点',
      desc: '收到手机后发现屏幕右上方有一个常亮绿点，非常影响使用。',
      images: ['https://picsum.photos/400/400?random=51', 'https://picsum.photos/400/400?random=52'],
      status: AfterSaleStatus.PENDING,
      time: '2023-10-26 16:30:15',
      supplier: '数码官方旗舰店'
    },
    {
      id: 'AS_20231026_002',
      order_id: 'ORDER_005',
      user: '李大壮',
      phone: '139****1122',
      type: AfterSaleType.REFUND,
      amount: 45.00,
      mileage: 0,
      reason: '买错了/不想要了',
      desc: '拍错规格了，申请退款。',
      status: AfterSaleStatus.APPROVED,
      time: '2023-10-26 14:15:22',
      supplier: '日常百货生活馆'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">售后仲裁中心</h1>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-white border rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 flex items-center shadow-sm">
            售后概况分析
          </button>
        </div>
      </div>

      {/* After-Sale Audit Modal */}
      {showAudit && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-4xl overflow-hidden shadow-2xl animate-in zoom-in duration-200 h-[85vh] flex flex-col">
            <div className="p-6 border-b flex justify-between items-center bg-gray-50">
              <h3 className="text-lg font-bold">售后服务申请审核</h3>
              <button onClick={() => setShowAudit(null)} className="text-gray-400 hover:text-gray-600 transition-colors"><X size={24} /></button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-8 grid grid-cols-2 gap-8">
              <div className="space-y-8">
                <section className="space-y-4">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center">
                    <Info size={14} className="mr-2" /> 申请基本信息
                  </h4>
                  <div className="bg-gray-50 p-6 rounded-3xl space-y-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">售后单号</span>
                      <span className="font-bold font-mono">{showAudit.id}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">关联订单</span>
                      <span className="text-blue-600 font-bold hover:underline cursor-pointer">{showAudit.order_id}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">申请类型</span>
                      <span className="bg-orange-50 text-orange-600 px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-widest">
                        {showAudit.type === AfterSaleType.RETURN ? '退货退款' : '仅退款'}
                      </span>
                    </div>
                  </div>
                </section>

                <section className="space-y-4">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center">
                    <MessageSquare size={14} className="mr-2" /> 售后描述与凭证
                  </h4>
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 italic text-sm text-gray-600">
                      "{showAudit.desc}"
                    </div>
                    {showAudit.images && (
                      <div className="grid grid-cols-3 gap-3">
                        {showAudit.images.map((img: string, i: number) => (
                          <img key={i} src={img} className="w-full aspect-square object-cover rounded-2xl shadow-sm border border-white hover:scale-105 transition-transform" />
                        ))}
                      </div>
                    )}
                  </div>
                </section>
              </div>

              <div className="space-y-8">
                <section className="space-y-4">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center">
                    <RotateCcw size={14} className="mr-2" /> 退款退款计算
                  </h4>
                  <div className="bg-blue-50 p-6 rounded-3xl space-y-4 border border-blue-100">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-700">可退款总额</span>
                      <span className="font-bold text-gray-900">￥{showAudit.amount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-700">返还里程积分</span>
                      <span className="font-bold text-orange-600">{showAudit.mileage.toLocaleString()} 里程</span>
                    </div>
                    <div className="pt-3 border-t border-blue-200 flex items-center text-[10px] text-blue-500">
                      <Info size={12} className="mr-2" /> 确认通过后，款项将原路退回支付账户，积分实时到账。
                    </div>
                  </div>
                </section>

                <section className="space-y-4">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">审核操作建议</h4>
                  <textarea className="w-full border rounded-2xl p-4 outline-none focus:ring-2 focus:ring-blue-500 h-32 text-sm" placeholder="请输入审核反馈，将展示给消费者..."></textarea>
                  <div className="bg-orange-50 p-4 rounded-2xl border border-orange-100 flex items-start">
                    <AlertCircle size={16} className="text-orange-600 mr-2 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-orange-700 leading-relaxed">
                      对于退货申请，建议先联系供应商确认库存及接收地址是否变动。
                    </p>
                  </div>
                </section>
              </div>
            </div>

            <div className="p-6 border-t bg-gray-50 flex justify-between items-center">
              <button className="flex items-center text-blue-600 font-bold hover:underline">
                <MessageSquare size={18} className="mr-2" /> 联系消费者/供应商
              </button>
              <div className="flex space-x-3">
                <button className="px-8 py-2.5 bg-red-50 text-red-600 border border-red-100 rounded-xl font-bold hover:bg-red-100 transition">拒绝申请</button>
                <button className="px-10 py-2.5 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition">通过审核并退款</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-3xl shadow-sm border overflow-hidden">
        <div className="p-6 border-b flex justify-between items-center bg-gray-50/20">
          <div className="flex space-x-3">
            {['pending', 'approved', 'rejected', 'completed'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 text-sm font-bold rounded-2xl transition-all ${
                  activeTab === tab ? 'bg-blue-600 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'
                }`}
              >
                {tab === 'pending' ? '待处理仲裁' : tab === 'approved' ? '已通过' : tab === 'rejected' ? '已驳回' : '已完结'}
              </button>
            ))}
          </div>
          <div className="relative w-80">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="搜索售后单号、买家手机号" className="w-full pl-12 pr-4 py-3 border rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-5 font-bold text-gray-700 tracking-widest uppercase text-[10px]">售后详情</th>
                <th className="px-6 py-5 font-bold text-gray-700 tracking-widest uppercase text-[10px]">买家画像</th>
                <th className="px-6 py-5 font-bold text-gray-700 tracking-widest uppercase text-[10px]">售后类型/原因</th>
                <th className="px-6 py-5 font-bold text-gray-700 tracking-widest uppercase text-[10px] text-right">拟退金额/里程</th>
                <th className="px-6 py-5 font-bold text-gray-700 tracking-widest uppercase text-[10px]">当前状态</th>
                <th className="px-6 py-5 font-bold text-right text-[10px]">仲裁操作</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {cases.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50 transition group">
                  <td className="px-6 py-5">
                    <div className="font-black text-gray-900 group-hover:text-blue-600 transition-colors">{c.id}</div>
                    <div className="text-[10px] text-gray-400 mt-1 font-mono uppercase tracking-tighter">订单: {c.order_id}</div>
                    <div className="text-[10px] text-gray-400 mt-1 flex items-center uppercase font-bold">
                      <ShoppingBag size={10} className="mr-1" /> {c.supplier}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="text-sm font-bold text-gray-700">{c.user}</div>
                    <div className="text-[10px] text-gray-400 font-bold mt-1 uppercase tracking-tighter">{c.phone}</div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex flex-col space-y-1">
                      <span className={`w-fit px-2 py-0.5 rounded text-[10px] font-bold tracking-widest uppercase ${
                        c.type === AfterSaleType.RETURN ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {c.type === AfterSaleType.RETURN ? '退货退款' : '仅退款'}
                      </span>
                      <span className="text-[10px] text-gray-400 font-bold line-clamp-1">{c.reason}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="font-mono font-black text-red-600 text-base">￥{c.amount.toFixed(2)}</div>
                    <div className="text-[10px] text-orange-600 font-bold uppercase tracking-tighter">+{c.mileage.toLocaleString()} 里程</div>
                  </td>
                  <td className="px-6 py-5">
                    {c.status === AfterSaleStatus.PENDING ? (
                      <span className="px-2.5 py-1 bg-yellow-50 text-yellow-700 rounded-lg text-[10px] font-bold uppercase tracking-widest flex items-center w-fit border border-yellow-100">
                        <AlertCircle size={10} className="mr-1" /> 待处理仲裁
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 bg-green-50 text-green-700 rounded-lg text-[10px] font-bold uppercase tracking-widest flex items-center w-fit border border-green-100">
                        <CheckCircle size={10} className="mr-1" /> 仲裁已通过
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex justify-end space-x-2">
                      <button 
                        onClick={() => setShowAudit(c)}
                        className="px-4 py-1.5 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-100"
                      >
                        立即仲裁
                      </button>
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

export default AfterSaleManagement;
