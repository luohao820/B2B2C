
import React, { useState, useMemo } from 'react';
import { OrderStatus } from '../../types';
import { Search, Filter, Download, User, Truck, CreditCard, Clock, X, Info, Edit, FileText, CheckCircle, MapPin, AlertTriangle, Ban, Calendar, ChevronDown, Tag, Package, ShoppingCart, Eye, Calculator } from 'lucide-react';

const OrderManagement: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState<OrderStatus | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [skuFilter, setSkuFilter] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [showModal, setShowModal] = useState<'price' | 'address' | 'cancel' | 'view' | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const [orders, setOrders] = useState<any[]>([
    {
      id: 'ORDER_20231026_001',
      user: '王小美',
      phone: '138****5678',
      amount: 2999.00,
      payment: '微信支付',
      status: OrderStatus.UNPAID,
      time: '2023-10-26 15:45:00',
      address: '浙江省杭州市西湖区古翠路1号XXX园',
      products: [{ name: 'AirPods Pro (第2代)', sku: 'SKU_APPLE_01', batch: 'BATCH_2023_A1', qty: 1, price: 2999 }]
    },
    {
      id: 'ORDER_20231026_002',
      user: '李大壮',
      phone: '139****1122',
      amount: 85.50,
      payment: '里程抵扣',
      status: OrderStatus.PAID,
      time: '2023-10-26 14:20:00',
      address: '上海市徐汇区XXXX路',
      products: [{ name: '抽纸10包', sku: 'SKU_PAPER_99', batch: 'BATCH_2023_C2', qty: 2, price: 42.75 }]
    },
    {
      id: 'ORDER_20231027_003',
      user: '赵小雅',
      phone: '137****3344',
      amount: 4599.00,
      payment: '支付宝',
      status: OrderStatus.SHIPPED,
      time: '2023-10-27 09:00:00',
      address: '北京市朝阳区三里屯',
      products: [{ name: 'iPad Air 5', sku: 'SKU_APPLE_IPAD', batch: 'BATCH_2023_B1', qty: 1, price: 4599 }]
    }
  ]);

  // 状态统计看板数据
  const stats = useMemo(() => {
    const counts = { all: orders.length, unpaid: 0, paid: 0, shipped: 0, completed: 0, cancelled: 0 };
    orders.forEach(o => {
      if (o.status === OrderStatus.UNPAID) counts.unpaid++;
      else if (o.status === OrderStatus.PAID) counts.paid++;
      else if (o.status === OrderStatus.SHIPPED) counts.shipped++;
      else if (o.status === OrderStatus.COMPLETED) counts.completed++;
      else if (o.status === OrderStatus.CANCELLED) counts.cancelled++;
    });
    return counts;
  }, [orders]);

  // 高级多维度过滤逻辑
  const filteredOrders = useMemo(() => {
    return orders.filter(o => {
      const matchStatus = filterStatus === 'all' || o.status === filterStatus;
      const matchSearch = !searchQuery || o.id.includes(searchQuery) || o.user.includes(searchQuery);
      const matchSkuBatch = !skuFilter || o.products.some((p: any) => p.sku.includes(skuFilter) || p.batch.includes(skuFilter));
      return matchStatus && matchSearch && matchSkuBatch;
    });
  }, [orders, filterStatus, searchQuery, skuFilter]);

  const handleAction = (type: 'price' | 'address' | 'cancel' | 'view', order: any) => {
    setSelectedOrder(order);
    setShowModal(type);
  };

  const handleUpdateOrder = (id: string, updates: any) => {
    setOrders(orders.map(o => o.id === id ? { ...o, ...updates } : o));
    setShowModal(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
           <h1 className="text-2xl font-bold text-gray-800">平台全量订单中心</h1>
           <p className="text-xs text-gray-400 mt-1 font-medium italic">管理全站交易流水、售后干预及物流履约追踪</p>
        </div>
        <button className="px-6 py-2.5 bg-blue-600 text-white rounded-2xl text-xs font-black shadow-lg shadow-blue-100 flex items-center hover:bg-blue-700 transition">
           <Download size={18} className="mr-2" /> 导出本期订单流水
        </button>
      </div>

      {/* 订单状态统计看板 */}
      <div className="grid grid-cols-6 gap-4">
        {[
          { id: 'all', label: '全部订单', count: stats.all, color: 'text-gray-900', bg: 'bg-white', icon: ShoppingCart },
          { id: OrderStatus.UNPAID, label: '待支付', count: stats.unpaid, color: 'text-orange-600', bg: 'bg-orange-50/50', icon: Clock },
          { id: OrderStatus.PAID, label: '待发货', count: stats.paid, color: 'text-blue-600', bg: 'bg-blue-50/50', icon: CreditCard },
          { id: OrderStatus.SHIPPED, label: '已发货', count: stats.shipped, color: 'text-purple-600', bg: 'bg-purple-50/50', icon: Truck },
          { id: OrderStatus.COMPLETED, label: '交易完成', count: stats.completed, color: 'text-green-600', bg: 'bg-green-50/50', icon: CheckCircle },
          { id: OrderStatus.CANCELLED, label: '已取消', count: stats.cancelled, color: 'text-gray-400', bg: 'bg-gray-50', icon: Ban },
        ].map((stat) => (
          <div 
            key={stat.id}
            onClick={() => setFilterStatus(stat.id as any)}
            className={`p-4 rounded-[28px] border-2 cursor-pointer transition-all ${filterStatus === stat.id ? 'border-blue-500 bg-white shadow-xl shadow-blue-50 translate-y-[-4px]' : 'border-transparent bg-white shadow-sm hover:border-blue-200'}`}
          >
            <div className="flex justify-between items-start mb-2">
              <stat.icon size={20} className={stat.color} />
              <span className={`text-lg font-black italic ${stat.color}`}>{stat.count}</span>
            </div>
            <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* 高级过滤搜索区 */}
      <div className="bg-white p-6 rounded-[32px] border shadow-sm flex flex-wrap gap-4 items-center">
         <div className="flex-1 min-w-[200px] relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="搜索订单ID、买家姓名、手机号..." 
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border-transparent rounded-2xl text-sm font-medium focus:bg-white focus:ring-4 focus:ring-blue-50 outline-none transition-all"
            />
         </div>
         <div className="relative">
            <Tag size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="商品批次号 / SKU编码" 
              value={skuFilter}
              onChange={e => setSkuFilter(e.target.value)}
              className="w-64 pl-12 pr-4 py-3 bg-gray-50 border-transparent rounded-2xl text-sm font-medium focus:bg-white focus:ring-4 focus:ring-blue-50 outline-none"
            />
         </div>
         <div className="flex items-center bg-gray-50 rounded-2xl px-4 py-3 border border-transparent hover:border-gray-200 transition-colors cursor-pointer">
            <Calendar size={18} className="text-gray-400 mr-2" />
            <span className="text-xs font-bold text-gray-500">下单日期区间</span>
            <ChevronDown size={14} className="ml-4 text-gray-400" />
         </div>
         <button onClick={() => {setSearchQuery(''); setSkuFilter(''); setFilterStatus('all')}} className="px-6 py-3 text-xs font-bold text-gray-400 hover:text-blue-600 transition-colors uppercase tracking-widest">Reset</button>
      </div>

      <div className="bg-white rounded-[32px] shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-4 font-black text-gray-400 uppercase text-[10px] tracking-widest">订单/SKU快照</th>
                <th className="px-6 py-4 font-black text-gray-400 uppercase text-[10px] tracking-widest">总计与支付</th>
                <th className="px-6 py-4 font-black text-gray-400 uppercase text-[10px] tracking-widest">实时状态</th>
                <th className="px-6 py-4 font-black text-gray-400 uppercase text-[10px] tracking-widest text-right">精细化干预</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredOrders.length > 0 ? filteredOrders.map((o) => (
                <tr key={o.id} className="hover:bg-gray-50 transition group">
                  <td className="px-6 py-5">
                    <div className="font-black text-gray-900 group-hover:text-blue-600 transition-colors italic">{o.id}</div>
                    <div className="text-[9px] text-gray-400 mt-1 font-bold uppercase tracking-widest flex items-center">
                       <Package size={10} className="mr-1" /> {o.products[0].sku} <span className="mx-2">|</span> {o.time}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="font-black text-red-600 text-lg italic">￥{o.amount.toFixed(2)}</div>
                    <div className="text-[9px] text-gray-400 uppercase font-black">{o.payment}</div>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border flex items-center w-fit ${
                      o.status === OrderStatus.UNPAID ? 'bg-orange-50 text-orange-600 border-orange-100' :
                      o.status === OrderStatus.CANCELLED ? 'bg-gray-50 text-gray-400 border-gray-100' :
                      o.status === OrderStatus.PAID ? 'bg-blue-50 text-blue-600 border-blue-100' :
                      'bg-green-50 text-green-600 border-green-100'
                    }`}>
                       {o.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex justify-end space-x-2 opacity-60 group-hover:opacity-100 transition-opacity">
                       <button onClick={() => handleAction('view', o)} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-white rounded-xl transition shadow-sm border border-transparent hover:border-blue-100"><Eye size={18} /></button>
                       {o.status === OrderStatus.UNPAID && (
                         <button onClick={() => handleAction('price', o)} className="p-2 text-gray-400 hover:text-orange-600 hover:bg-white rounded-xl transition shadow-sm border border-transparent hover:border-orange-100"><Calculator size={18} /></button>
                       )}
                       {(o.status === OrderStatus.PAID || o.status === OrderStatus.UNPAID) && (
                         <button onClick={() => handleAction('address', o)} className="p-2 text-gray-400 hover:text-green-600 hover:bg-white rounded-xl transition shadow-sm border border-transparent hover:border-green-100"><MapPin size={18} /></button>
                       )}
                       {o.status !== OrderStatus.CANCELLED && o.status !== OrderStatus.COMPLETED && (
                         <button onClick={() => handleAction('cancel', o)} className="p-2 text-gray-300 hover:text-red-500 hover:bg-white rounded-xl transition shadow-sm border border-transparent hover:border-red-100"><Ban size={18} /></button>
                       )}
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={4} className="py-20 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-300">
                       <ShoppingCart size={48} className="mb-4 opacity-20" />
                       <span className="text-[10px] font-black uppercase tracking-widest italic">未能检索到匹配条件的订单明细</span>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 详情模态框 */}
      {showModal === 'view' && selectedOrder && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-[40px] w-full max-w-2xl overflow-hidden shadow-2xl animate-in zoom-in duration-200">
             <div className="p-6 border-b flex justify-between items-center bg-gray-50">
               <h3 className="text-xl font-black italic uppercase text-gray-800">订单全景透视 - {selectedOrder.id}</h3>
               <button onClick={() => setShowModal(null)} className="p-2 hover:bg-white rounded-full"><X size={24}/></button>
             </div>
             <div className="p-10 space-y-10 overflow-y-auto max-h-[70vh]">
                <section className="grid grid-cols-2 gap-8">
                   <div className="space-y-4">
                      <h4 className="text-[10px] font-black text-blue-600 uppercase tracking-widest border-l-4 border-blue-600 pl-2">买家档案</h4>
                      <div className="bg-gray-50 p-4 rounded-3xl space-y-2">
                         <div className="font-bold text-gray-900">{selectedOrder.user}</div>
                         <div className="text-xs text-gray-400 font-mono">{selectedOrder.phone}</div>
                         <div className="text-xs text-gray-500 italic mt-2"><MapPin size={12} className="inline mr-1" /> {selectedOrder.address}</div>
                      </div>
                   </div>
                   <div className="space-y-4">
                      <h4 className="text-[10px] font-black text-orange-600 uppercase tracking-widest border-l-4 border-orange-600 pl-2">状态节点</h4>
                      <div className="bg-orange-50/50 p-4 rounded-3xl space-y-2">
                         <div className="text-sm font-black text-orange-700 uppercase tracking-tighter">{selectedOrder.status}</div>
                         <div className="text-[10px] text-orange-400 font-bold uppercase tracking-widest">下单于: {selectedOrder.time}</div>
                      </div>
                   </div>
                </section>

                <section className="space-y-4">
                   <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest border-l-4 border-gray-400 pl-2">SKU 清单</h4>
                   <div className="space-y-2">
                      {selectedOrder.products.map((p: any, i: number) => (
                        <div key={i} className="flex justify-between items-center p-4 border rounded-3xl bg-white shadow-sm">
                           <div className="flex items-center">
                              <div className="w-10 h-10 bg-gray-50 rounded-xl mr-3 flex items-center justify-center text-gray-300"><Package size={20}/></div>
                              <div>
                                 <div className="text-sm font-bold text-gray-800">{p.name}</div>
                                 <div className="text-[9px] text-gray-400 font-mono uppercase">Batch: {p.batch}</div>
                              </div>
                           </div>
                           <div className="text-right">
                              <div className="font-black text-gray-900">￥{p.price.toFixed(2)}</div>
                              <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Qty: {p.qty}</div>
                           </div>
                        </div>
                      ))}
                   </div>
                </section>
             </div>
             <div className="p-8 border-t bg-gray-50 text-right">
                <button onClick={() => setShowModal(null)} className="px-10 py-3 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg">确认并关闭</button>
             </div>
          </div>
        </div>
      )}

      {/* 修改价格弹窗 */}
      {showModal === 'price' && selectedOrder && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-[32px] w-full max-w-md overflow-hidden shadow-2xl animate-in zoom-in duration-200">
             <div className="p-6 border-b flex justify-between bg-gray-50">
               <h3 className="font-black text-gray-800 uppercase italic">订单价格重置干预</h3>
               <button onClick={() => setShowModal(null)}><X size={20}/></button>
             </div>
             <div className="p-8 space-y-6">
                <div className="flex justify-between p-4 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-100">
                   <span className="text-xs font-bold text-gray-400">当前实收金额</span>
                   <span className="font-black text-gray-900 italic">￥{selectedOrder.amount.toFixed(2)}</span>
                </div>
                <div>
                   <label className="text-[10px] font-black text-blue-600 uppercase block mb-1 tracking-widest italic">修订后金额 (￥)</label>
                   <input type="number" id="new_price" className="w-full border-2 border-blue-100 rounded-2xl p-4 outline-none focus:ring-4 focus:ring-blue-50 font-black text-2xl text-blue-600" defaultValue={selectedOrder.amount} />
                </div>
             </div>
             <div className="p-6 border-t flex space-x-3 bg-gray-50">
                <button onClick={() => setShowModal(null)} className="flex-1 py-3 bg-white border rounded-xl text-xs font-black uppercase text-gray-400">放弃</button>
                <button onClick={() => {
                   const val = (document.getElementById('new_price') as HTMLInputElement).value;
                   handleUpdateOrder(selectedOrder.id, { amount: parseFloat(val) });
                }} className="flex-2 py-3 bg-blue-600 text-white rounded-xl text-xs font-black uppercase shadow-lg">确认价格生效</button>
             </div>
          </div>
        </div>
      )}

      {/* 修改地址弹窗 */}
      {showModal === 'address' && selectedOrder && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-[32px] w-full max-w-lg overflow-hidden shadow-2xl animate-in zoom-in duration-200">
             <div className="p-6 border-b flex justify-between bg-gray-50">
               <h3 className="font-black text-gray-800 uppercase italic">配送地址精准纠偏</h3>
               <button onClick={() => setShowModal(null)}><X size={20}/></button>
             </div>
             <div className="p-8 space-y-6">
                <div className="bg-green-50 p-4 rounded-2xl border border-green-100 flex items-start">
                   <Info size={16} className="text-green-600 mr-2 mt-1" />
                   <p className="text-[11px] text-green-700 leading-relaxed font-medium uppercase tracking-tighter">该订单处于锁定状态，同步更新后将实时分发至承运商与供应商后台。</p>
                </div>
                <div>
                   <label className="text-[10px] font-black text-gray-400 uppercase block mb-1 tracking-widest">原始留存地址</label>
                   <p className="text-xs text-gray-500 italic mb-6 leading-relaxed">{selectedOrder.address}</p>
                   <label className="text-[10px] font-black text-blue-600 uppercase block mb-1 tracking-widest">新收货详细地址</label>
                   <textarea id="new_address" className="w-full border-2 border-gray-100 rounded-2xl p-4 outline-none focus:ring-4 focus:ring-blue-50 text-sm font-bold h-24 shadow-inner" placeholder="请输入完整、精准的新收货地址信息..."></textarea>
                </div>
             </div>
             <div className="p-6 border-t flex space-x-3 bg-gray-50">
                <button onClick={() => setShowModal(null)} className="flex-1 py-3 bg-white border rounded-xl text-xs font-black text-gray-400 uppercase">取消</button>
                <button onClick={() => {
                   const val = (document.getElementById('new_address') as HTMLInputElement).value;
                   if(!val) return alert('地址不能为空');
                   handleUpdateOrder(selectedOrder.id, { address: val });
                }} className="flex-2 py-3 bg-green-600 text-white rounded-xl text-xs font-black shadow-lg uppercase">完成重定向</button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderManagement;
