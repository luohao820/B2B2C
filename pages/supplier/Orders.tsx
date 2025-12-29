
import React, { useState } from 'react';
import { ShoppingCart, Truck, Search, Eye, Clipboard, User, MapPin, X, Package, FileText, Printer, CheckCircle, Info, CreditCard, Clock, ReceiptText } from 'lucide-react';

const SupplierOrders: React.FC = () => {
  const [activeTab, setActiveTab] = useState('waiting_ship');
  const [showShipModal, setShowShipModal] = useState<any>(null);
  const [showDetailModal, setShowDetailModal] = useState<any>(null);

  const orders = [
    {
      id: 'SUB_ORDER_1001',
      order_time: '2023-10-26 18:00:22',
      status: 'paid',
      payment_status: 'paid',
      payment_method: '微信支付 + 里程抵扣',
      customer: '王*美',
      phone: '138****5678',
      address: '浙江省 杭州市 西湖区 古翠路1号XXX园3号楼201',
      items: [
        { product_id: 'PROD_001', name: '户外防风冲锋衣 2023旗舰版', qty: 1, price: 1599.00, specs: '黑色 / L' }
      ],
      order_amount: 1599.00,
      discount_amount: 200.00,
      mileage_deduction: 150.00,
      payment_amount: 1249.00,
      need_invoice: true,
      invoice_info: { type: '企业', title: '杭州某某科技公司', tax_no: '91330100MAXXXXX', content: '服装配件' },
      estimated_delivery: '2023-10-29'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">子订单履约中心</h1>
        <div className="flex space-x-3">
          <button className="px-4 py-2.5 bg-white border rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 flex items-center shadow-sm">
            <Printer size={16} className="mr-2" /> 批量打印发货单
          </button>
        </div>
      </div>

      {/* 订单详情 - 深度补齐 2.2 字段 */}
      {showDetailModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl animate-in zoom-in duration-200 flex flex-col max-h-[90vh]">
            <div className="p-6 border-b flex justify-between items-center bg-gray-50">
              <div>
                <h3 className="text-lg font-bold">订单详情</h3>
                <p className="text-xs text-gray-400 font-mono">SUB_ID: {showDetailModal.id}</p>
              </div>
              <button onClick={() => setShowDetailModal(null)} className="text-gray-400 hover:text-gray-600 transition-colors"><X size={24} /></button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-8 space-y-8">
              {/* 状态步骤条模拟 */}
              <div className="flex justify-between mb-10 px-4">
                {['下单成功', '支付完成', '商家备货', '物流运输', '交易完成'].map((step, i) => (
                  <div key={i} className="flex flex-col items-center relative flex-1">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold mb-2 z-10 ${i <= 1 ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'bg-gray-100 text-gray-400'}`}>
                      {i < 1 ? <CheckCircle size={14} /> : i + 1}
                    </div>
                    <span className={`text-[10px] font-bold ${i <= 1 ? 'text-blue-600' : 'text-gray-400'}`}>{step}</span>
                    {i < 4 && <div className={`absolute top-4 left-1/2 w-full h-[2px] -z-0 ${i < 1 ? 'bg-blue-600' : 'bg-gray-100'}`}></div>}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-8">
                <section className="space-y-4">
                  <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center"><Info size={14} className="mr-2" /> 费用结算明细</h4>
                  <div className="bg-gray-50 p-6 rounded-3xl space-y-3">
                    <div className="flex justify-between text-sm"><span>订单原价:</span><span className="font-mono">￥{showDetailModal.order_amount.toFixed(2)}</span></div>
                    <div className="flex justify-between text-sm text-red-500"><span>优惠券抵扣:</span><span className="font-mono">-￥{showDetailModal.discount_amount.toFixed(2)}</span></div>
                    <div className="flex justify-between text-sm text-orange-600"><span>里程积分抵扣:</span><span className="font-mono">-￥{showDetailModal.mileage_deduction.toFixed(2)}</span></div>
                    <div className="pt-3 border-t flex justify-between items-center">
                      <span className="text-sm font-bold text-gray-800">用户实付:</span>
                      <span className="text-xl font-black text-blue-600">￥{showDetailModal.payment_amount.toFixed(2)}</span>
                    </div>
                  </div>
                </section>

                <section className="space-y-4">
                  <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center"><ReceiptText size={14} className="mr-2" /> 发票与送达要求</h4>
                  <div className="bg-blue-50/50 p-6 rounded-3xl space-y-4 border border-blue-50">
                    <div className="flex justify-between text-sm"><span>是否需要发票:</span><span className={showDetailModal.need_invoice ? 'text-blue-600 font-bold' : 'text-gray-400'}>{showDetailModal.need_invoice ? '是 (REQUIRED)' : '否'}</span></div>
                    {showDetailModal.need_invoice && (
                      <div className="text-[11px] space-y-1 bg-white p-3 rounded-xl shadow-sm">
                        <div className="text-gray-400">抬头: <span className="text-gray-700 font-bold">{showDetailModal.invoice_info.title}</span></div>
                        <div className="text-gray-400">税号: <span className="text-gray-700 font-mono">{showDetailModal.invoice_info.tax_no}</span></div>
                        <div className="text-gray-400">内容: <span className="text-gray-700">{showDetailModal.invoice_info.content}</span></div>
                      </div>
                    )}
                    <div className="flex justify-between text-sm"><span>预计到达:</span><span className="font-bold text-gray-700">{showDetailModal.estimated_delivery}</span></div>
                  </div>
                </section>
              </div>

              <section className="space-y-4">
                <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center"><User size={14} className="mr-2" /> 收货人信息</h4>
                <div className="p-5 border-2 border-dashed rounded-3xl flex items-start space-x-4">
                  <div className="bg-gray-100 p-3 rounded-2xl text-gray-400"><MapPin size={24} /></div>
                  <div>
                    <div className="font-bold text-gray-900 text-lg">{showDetailModal.customer} <span className="text-sm font-normal text-gray-400 ml-2">{showDetailModal.phone}</span></div>
                    <div className="text-sm text-gray-500 mt-1">{showDetailModal.address}</div>
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center"><Package size={14} className="mr-2" /> 商品清单</h4>
                <div className="space-y-3">
                  {showDetailModal.items.map((item: any, i: number) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-white border rounded-2xl shadow-sm">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-gray-50 rounded-xl mr-4 flex items-center justify-center text-gray-300 border"><Package size={20} /></div>
                        <div>
                          <div className="text-sm font-bold text-gray-900">{item.name}</div>
                          <div className="text-[10px] text-gray-400 font-mono uppercase mt-1">ID: {item.product_id} | {item.specs}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-black text-gray-900">￥{item.price.toFixed(2)}</div>
                        <div className="text-xs text-gray-400 font-bold">x {item.qty}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
            <div className="p-6 border-t bg-gray-50 flex justify-end space-x-3 shadow-inner">
               <button onClick={() => setShowDetailModal(null)} className="px-10 py-3 bg-blue-600 text-white rounded-2xl font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition">确定并返回</button>
            </div>
          </div>
        </div>
      )}

      {/* 列表渲染保持之前的优化版并增加“查看详情”调用 */}
      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
        <div className="p-4 border-b flex justify-between items-center bg-gray-50/20">
          <div className="flex space-x-4">
            {[{ id: 'all', name: '全部' }, { id: 'waiting_ship', name: '待发货', count: 1 }, { id: 'shipped', name: '已发货' }].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 text-xs font-bold rounded-xl transition-all relative ${
                  activeTab === tab.id ? 'bg-blue-600 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'
                }`}
              >
                {tab.name}
                {tab.count && <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full flex items-center justify-center text-[8px] border border-white">{tab.count}</span>}
              </button>
            ))}
          </div>
          <div className="relative w-72">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="搜索订单号、手机号、收件人" className="w-full pl-12 pr-4 py-2.5 border rounded-2xl text-sm focus:outline-none bg-white" />
          </div>
        </div>

        <div className="divide-y">
          {orders.map((order) => (
            <div key={order.id} className="p-6 hover:bg-gray-50 transition group">
              <div className="flex justify-between items-start mb-6">
                <div className="flex space-x-10">
                  <div className="space-y-1">
                    <span className="text-[10px] text-gray-400 uppercase font-black tracking-widest block">子订单号</span>
                    <span className="text-sm font-black text-gray-900 font-mono">{order.id}</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] text-gray-400 uppercase font-black tracking-widest block">实收总额</span>
                    <span className="text-sm font-black text-blue-600 italic">￥{order.payment_amount.toFixed(2)}</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] text-gray-400 uppercase font-black tracking-widest block">物流要求</span>
                    <span className="text-[10px] bg-orange-50 text-orange-600 px-2 py-0.5 rounded font-bold">{order.estimated_delivery}前送达</span>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <button onClick={() => setShowDetailModal(order)} className="px-4 py-1.5 border rounded-xl text-xs font-bold text-gray-600 hover:bg-white shadow-sm flex items-center"><Eye size={14} className="mr-1.5" /> 详情</button>
                  <button onClick={() => setShowShipModal(order)} className="bg-blue-600 text-white px-5 py-1.5 rounded-xl text-xs font-black shadow-lg hover:bg-blue-700 flex items-center transition"><Truck size={14} className="mr-1.5" /> 立即发货</button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-3 bg-white p-3 rounded-2xl border border-gray-50">
                    <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-gray-300"><Package size={16} /></div>
                    <div className="flex-1">
                      <div className="text-[11px] font-bold text-gray-800 truncate">{item.name}</div>
                      <div className="text-[9px] text-gray-400">{item.specs} x{item.qty}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SupplierOrders;
