
import React, { useState } from 'react';
import { RotateCcw, AlertCircle, MessageSquare, CheckCircle, XCircle, X, ShoppingBag, Truck, MapPin, Info, ClipboardCheck, History, PackageCheck, SendHorizontal } from 'lucide-react';
import { AfterSaleStatus, AfterSaleType } from '../../types';

const SupplierAfterSales: React.FC = () => {
  const [showProcessModal, setShowProcessModal] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('pending');

  const tasks = [
    {
      id: 'AS_S_1001',
      sub_order_id: 'SUB_ORDER_1001',
      user: '王小美',
      type: AfterSaleType.RETURN,
      reason: '商品质量问题 - 缝线开裂',
      apply_amount: 1599.00,
      apply_time: '2023-10-27 10:00:00',
      status: AfterSaleStatus.PENDING,
      platform_decision: '平台判责：商家承担运费',
      images: ['https://picsum.photos/400/400?random=31']
    },
    {
      id: 'AS_S_1002',
      sub_order_id: 'SUB_ORDER_1005',
      user: '李大壮',
      type: AfterSaleType.EXCHANGE,
      reason: '尺码不合适，换大一码',
      status: AfterSaleStatus.RETURNING,
      apply_time: '2023-10-27 09:15:00',
      logistics_info: { company: '中通快递', number: '73192837123', received_time: null },
      return_address: { recipient: '仓库A-张三', phone: '13812345678', detail: '浙江省杭州市西湖区古翠路1号' }
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">售后服务工作台</h1>
        <div className="flex space-x-2 text-xs font-bold text-gray-400">
           <span>响应率: 99.8%</span>
           <span className="mx-2">|</span>
           <span>平均处理: 4.2h</span>
        </div>
      </div>

      {/* 售后处理弹窗 - 补齐 2.3 字段 */}
      {showProcessModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl animate-in zoom-in duration-200 h-[85vh] flex flex-col">
            <div className="p-6 border-b flex justify-between items-center bg-gray-50">
              <div>
                <h3 className="text-lg font-bold">售后受理 - {showProcessModal.id}</h3>
                <p className="text-[10px] text-gray-400 font-black uppercase">关联子订单: {showProcessModal.sub_order_id}</p>
              </div>
              <button onClick={() => setShowProcessModal(null)} className="text-gray-400 hover:text-gray-600"><X size={24} /></button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-8 space-y-8">
              <div className="grid grid-cols-2 gap-8">
                <section className="space-y-4">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center"><Info size={14} className="mr-2" /> 买家申诉及凭证</h4>
                  <div className="bg-gray-50 p-5 rounded-3xl space-y-4">
                    <div className="text-xs font-bold text-gray-700">类型：{showProcessModal.type === AfterSaleType.RETURN ? '退货退款' : showProcessModal.type === AfterSaleType.EXCHANGE ? '换货' : '仅退款'}</div>
                    <div className="text-sm italic text-gray-500 leading-relaxed border-l-4 border-blue-200 pl-3">"{showProcessModal.reason}"</div>
                    {showProcessModal.images && (
                      <div className="grid grid-cols-2 gap-2">
                        {showProcessModal.images.map((img: string, i: number) => (
                          <img key={i} src={img} className="w-full aspect-square object-cover rounded-2xl shadow-sm border border-white" />
                        ))}
                      </div>
                    )}
                    <p className="text-[10px] text-gray-400">申请时间: {showProcessModal.apply_time}</p>
                  </div>
                </section>

                <section className="space-y-4">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center"><History size={14} className="mr-2" /> 平台判责/建议</h4>
                  <div className="bg-blue-50 p-5 rounded-3xl border border-blue-100 text-xs text-blue-700 font-medium leading-relaxed">
                    {showProcessModal.platform_decision || '暂无平台仲裁记录，请优先与买家自主协商。'}
                  </div>
                  {showProcessModal.status === AfterSaleStatus.RETURNING && (
                    <div className="animate-in fade-in duration-500">
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-green-600 mb-2 flex items-center"><Truck size={14} className="mr-2" /> 回寄物流信息</h4>
                      <div className="p-4 bg-green-50 rounded-2xl border border-green-100 text-xs">
                        <p className="font-bold text-green-800">{showProcessModal.logistics_info.company} : {showProcessModal.logistics_info.number}</p>
                        <p className="text-[9px] text-green-600 mt-1 italic">退货地址: {showProcessModal.return_address.detail}</p>
                      </div>
                    </div>
                  )}
                </section>
              </div>

              <section className="space-y-4">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center"><ClipboardCheck size={14} className="mr-2" /> 供应商处理意见 (Supplier Notes)</h4>
                <textarea className="w-full border rounded-2xl p-4 outline-none focus:ring-2 focus:ring-blue-500 h-28 text-sm" placeholder="请详细填写处理方案。若拒绝申请，请说明充分理由..."></textarea>
                
                {/* 换货发货逻辑补齐 */}
                {showProcessModal.type === AfterSaleType.EXCHANGE && showProcessModal.status === AfterSaleStatus.RETURNING && (
                   <div className="p-6 bg-orange-50/50 rounded-3xl border border-orange-100 space-y-4">
                      <div className="flex items-center text-xs font-bold text-orange-700"><SendHorizontal size={16} className="mr-2" /> 换货发货信息回填</div>
                      <div className="grid grid-cols-2 gap-4">
                         <input type="text" className="border rounded-xl p-2.5 text-xs outline-none focus:ring-1 focus:ring-orange-400" placeholder="物流公司" />
                         <input type="text" className="border rounded-xl p-2.5 text-xs outline-none focus:ring-1 focus:ring-orange-400" placeholder="新单号" />
                      </div>
                   </div>
                )}
              </section>
            </div>

            <div className="p-6 border-t bg-gray-50 flex justify-between items-center">
              <button className="text-blue-600 font-bold hover:underline text-sm flex items-center"><MessageSquare size={18} className="mr-2" /> 联系买家</button>
              <div className="flex space-x-3">
                {showProcessModal.status === AfterSaleStatus.PENDING ? (
                  <>
                    <button className="px-8 py-2.5 bg-red-50 text-red-600 border border-red-100 rounded-xl font-bold hover:bg-red-100 transition">拒绝</button>
                    <button className="px-10 py-2.5 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition">同意申请并提供地址</button>
                  </>
                ) : (
                  <button className="px-10 py-2.5 bg-green-600 text-white rounded-xl font-bold shadow-lg shadow-green-100 hover:bg-green-700 transition flex items-center">
                    <PackageCheck size={18} className="mr-2" /> 确认收到退货并结案
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
        <div className="p-4 border-b flex justify-between items-center bg-gray-50/20">
          <div className="flex space-x-6">
            {['pending', 'processing', 'completed'].map(t => (
              <button 
                key={t}
                onClick={() => setActiveTab(t)}
                className={`text-xs font-bold uppercase tracking-widest transition-all pb-1 border-b-2 ${activeTab === t ? 'text-blue-600 border-blue-600' : 'text-gray-400 border-transparent'}`}
              >
                {t === 'pending' ? '待我审核' : t === 'processing' ? '进行中/待收货' : '已完结'}
              </button>
            ))}
          </div>
        </div>

        <div className="divide-y">
          {tasks.map((task) => (
            <div key={task.id} className="p-6 hover:bg-gray-50 transition group">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-6">
                  <div className="p-3 bg-orange-50 rounded-2xl text-orange-600 shadow-sm border border-orange-100 group-hover:rotate-12 transition-transform">
                    <RotateCcw size={24} />
                  </div>
                  <div>
                    <div className="font-black text-gray-900 flex items-center font-mono">
                      {task.id}
                      <span className="ml-3 bg-blue-50 text-blue-600 text-[9px] font-black px-2 py-0.5 rounded-lg border border-blue-100 uppercase">单号: {task.sub_order_id}</span>
                    </div>
                    <div className="text-[11px] text-gray-400 mt-1 font-bold">买家: {task.user} | 类型: {task.type} | 申请于: {task.apply_time}</div>
                  </div>
                </div>
                <button onClick={() => setShowProcessModal(task)} className="px-8 py-2 bg-blue-600 text-white rounded-xl text-xs font-black shadow-lg shadow-blue-100 hover:bg-blue-700 transition">处理申请</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SupplierAfterSales;
