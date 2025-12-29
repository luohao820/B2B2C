
import React, { useState, useMemo } from 'react';
import { SupplierStatus } from '../../types';
import { Search, Plus, CheckCircle, XCircle, Ban, Clock, FileText, Phone, X, Edit3, Eye, Calendar, ShoppingBag, Package, BarChart3, ChevronDown, Upload, Mail, MapPin, Check } from 'lucide-react';

const SupplierManagement: React.FC = () => {
  const [suppliers, setSuppliers] = useState<any[]>([
    {
      supplier_id: 'SUP_20231024_001',
      supplier_name: '杭州优选电子科技有限公司',
      contact_person: '张三',
      contact_phone: '13812345678',
      contact_email: 'zhangsan@corp.com',
      status: SupplierStatus.APPROVED,
      created_at: '2023-10-24 10:00:00',
      business_license: '91330100MA2XXXXX',
      address: '浙江省杭州市西湖区古翠路1号',
      audit_notes: '资质齐全，准予入驻',
      stats: { on_sale: 45, approved: 52, pending: 8, rejected: 2, total_sales_amount: 128400.00, total_sales_qty: 856 }
    },
    {
      supplier_id: 'SUP_20231025_002',
      supplier_name: '上海时尚服装贸易有限公司',
      contact_person: '李四',
      contact_phone: '13987654321',
      contact_email: 'lisi@style.com',
      status: SupplierStatus.PENDING,
      created_at: '2023-10-25 14:30:00',
      business_license: '91310100MA1XXXXX',
      address: '上海市浦东新区张江高科',
      stats: { on_sale: 120, approved: 135, pending: 15, rejected: 5, total_sales_amount: 45200.00, total_sales_qty: 1240 }
    }
  ]);

  const [showForm, setShowForm] = useState<'view' | 'audit' | 'add' | null>(null);
  const [selectedSupplier, setSelectedSupplier] = useState<any>(null);
  const [formData, setFormData] = useState<any>({
    supplier_name: '',
    contact_person: '',
    contact_phone: '',
    contact_email: '',
    business_license: '',
    address: '',
    audit_notes: ''
  });

  const handleAction = (type: 'view' | 'audit' | 'add', supplier: any = null) => {
    if (type === 'add') {
      setFormData({
        supplier_name: '',
        contact_person: '',
        contact_phone: '',
        contact_email: '',
        business_license: '',
        address: '',
        audit_notes: ''
      });
    } else {
      setSelectedSupplier(supplier);
      setFormData({ ...supplier, audit_notes: supplier.audit_notes || '' });
    }
    setShowForm(type);
  };

  const handleSaveAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.supplier_name || !formData.contact_phone) return alert('请填写必要的主体信息');
    
    const newId = `SUP_${new Date().toISOString().slice(0, 10).replace(/-/g, '')}_${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;
    const newSupplier = {
      ...formData,
      supplier_id: newId,
      status: SupplierStatus.PENDING,
      created_at: new Date().toLocaleString().replace(/\//g, '-'),
      stats: { on_sale: 0, approved: 0, pending: 0, rejected: 0, total_sales_amount: 0, total_sales_qty: 0 }
    };
    setSuppliers([newSupplier, ...suppliers]);
    setShowForm(null);
  };

  const handleAudit = (status: SupplierStatus.APPROVED | SupplierStatus.REJECTED) => {
    setSuppliers(suppliers.map(s => 
      s.supplier_id === selectedSupplier.supplier_id 
      ? { ...s, status, audit_notes: formData.audit_notes, audit_time: new Date().toLocaleString() } 
      : s
    ));
    setShowForm(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
           <h1 className="text-2xl font-bold text-gray-800">供应商综合管理</h1>
           <p className="text-xs text-gray-400 mt-1 font-medium italic">管理入驻审核、商品资产分布及全周期业绩表现</p>
        </div>
        <button onClick={() => handleAction('add')} className="bg-blue-600 text-white px-5 py-2.5 rounded-2xl flex items-center hover:bg-blue-700 transition shadow-lg shadow-blue-100 font-bold text-sm">
          <Plus size={18} className="mr-2" /> 发起入驻申请
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-5 font-black text-gray-400 uppercase text-[10px] tracking-widest">供应商主体</th>
                <th className="px-6 py-5 font-black text-gray-400 uppercase text-[10px] tracking-widest text-center">商品统计 (在售/待审)</th>
                <th className="px-6 py-5 font-black text-gray-400 uppercase text-[10px] tracking-widest text-right">周期销额 (GTV)</th>
                <th className="px-6 py-5 font-black text-gray-400 uppercase text-[10px] tracking-widest text-center">状态</th>
                <th className="px-6 py-5 font-black text-gray-400 uppercase text-[10px] tracking-widest text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {suppliers.map((s) => (
                <tr key={s.supplier_id} className="hover:bg-gray-50/50 transition group">
                  <td className="px-6 py-5">
                    <div className="font-black text-gray-900 group-hover:text-blue-600 transition-colors">{s.supplier_name}</div>
                    <div className="text-gray-400 text-[9px] mt-1 font-black uppercase tracking-widest">{s.supplier_id} | {s.contact_person}</div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex justify-center items-center space-x-3">
                      <div className="text-center px-2 py-1 bg-green-50 rounded-lg border border-green-100">
                        <span className="block text-[10px] font-black text-green-600">{s.stats.on_sale}</span>
                        <span className="text-[8px] text-green-400 uppercase font-bold tracking-tighter">On Sale</span>
                      </div>
                      <div className="text-center px-2 py-1 bg-blue-50 rounded-lg border border-blue-100">
                        <span className="block text-[10px] font-black text-blue-600">{s.stats.pending}</span>
                        <span className="text-[8px] text-blue-400 uppercase font-bold tracking-tighter">Wait</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-right font-black text-gray-900">
                    <div className="text-sm font-mono">￥{s.stats.total_sales_amount.toLocaleString()}</div>
                    <div className="text-[9px] text-gray-400 font-bold uppercase italic">Qty: {s.stats.total_sales_qty}</div>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border flex items-center w-fit mx-auto ${
                      s.status === SupplierStatus.APPROVED ? 'bg-green-50 text-green-600 border-green-100' :
                      s.status === SupplierStatus.REJECTED ? 'bg-red-50 text-red-600 border-red-100' :
                      'bg-yellow-50 text-yellow-600 border-yellow-100 animate-pulse'
                    }`}>
                      {s.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex justify-end space-x-2">
                      {s.status === SupplierStatus.PENDING ? (
                        <button onClick={() => handleAction('audit', s)} className="bg-blue-600 text-white px-4 py-1.5 rounded-xl text-[10px] font-black uppercase shadow-sm hover:bg-blue-700 transition">立即审核</button>
                      ) : (
                        <button onClick={() => handleAction('view', s)} className="p-2 text-gray-300 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all border border-transparent hover:border-blue-100">
                          <BarChart3 size={18} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 新增入驻申请弹窗 */}
      {showForm === 'add' && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <form onSubmit={handleSaveAdd} className="bg-white rounded-[40px] w-full max-w-2xl overflow-hidden shadow-2xl animate-in zoom-in duration-300 flex flex-col max-h-[90vh]">
            <div className="p-6 border-b flex justify-between items-center bg-gray-50">
              <h3 className="text-xl font-black italic text-gray-800 uppercase tracking-tight flex items-center">
                <Plus size={24} className="mr-2 text-blue-600" /> 初始化入驻申请
              </h3>
              <button type="button" onClick={() => setShowForm(null)} className="text-gray-400 hover:text-gray-600 p-2"><X size={24} /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-10 space-y-8">
              <section className="space-y-4">
                <h4 className="text-[10px] font-black text-blue-600 uppercase tracking-widest border-l-4 border-blue-600 pl-2">1. 经营主体资质</h4>
                <div className="grid grid-cols-2 gap-6">
                  <div className="col-span-2">
                    <label className="text-[10px] font-bold text-gray-400 block mb-1 uppercase tracking-widest">公司全称</label>
                    <input required type="text" value={formData.supplier_name} onChange={e => setFormData({...formData, supplier_name: e.target.value})} className="w-full border-2 border-gray-100 rounded-2xl p-4 text-sm font-bold focus:border-blue-200 outline-none" placeholder="需与营业执照一致" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 block mb-1 uppercase tracking-widest">统一社会信用代码</label>
                    <input required type="text" value={formData.business_license} onChange={e => setFormData({...formData, business_license: e.target.value})} className="w-full border-2 border-gray-100 rounded-2xl p-4 text-sm font-bold focus:border-blue-200 outline-none font-mono uppercase" placeholder="18位信用代码" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 block mb-1 uppercase tracking-widest">所在地</label>
                    <input type="text" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="w-full border-2 border-gray-100 rounded-2xl p-4 text-sm font-bold focus:border-blue-200 outline-none" placeholder="省/市/详细地址" />
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <h4 className="text-[10px] font-black text-orange-600 uppercase tracking-widest border-l-4 border-orange-600 pl-2">2. 联系人与通讯</h4>
                <div className="grid grid-cols-2 gap-6">
                   <div>
                    <label className="text-[10px] font-bold text-gray-400 block mb-1 uppercase tracking-widest">业务负责人</label>
                    <input required type="text" value={formData.contact_person} onChange={e => setFormData({...formData, contact_person: e.target.value})} className="w-full border-2 border-gray-100 rounded-2xl p-4 text-sm font-bold focus:border-blue-200 outline-none" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 block mb-1 uppercase tracking-widest">手机号码</label>
                    <input required type="tel" value={formData.contact_phone} onChange={e => setFormData({...formData, contact_phone: e.target.value})} className="w-full border-2 border-gray-100 rounded-2xl p-4 text-sm font-bold focus:border-blue-200 outline-none font-mono" />
                  </div>
                  <div className="col-span-2">
                    <label className="text-[10px] font-bold text-gray-400 block mb-1 uppercase tracking-widest">企业联系邮箱</label>
                    <input required type="email" value={formData.contact_email} onChange={e => setFormData({...formData, contact_email: e.target.value})} className="w-full border-2 border-gray-100 rounded-2xl p-4 text-sm font-bold focus:border-blue-200 outline-none" />
                  </div>
                </div>
              </section>
            </div>
            <div className="p-8 border-t bg-gray-50 flex space-x-4">
              <button type="button" onClick={() => setShowForm(null)} className="flex-1 py-4 bg-white border-2 rounded-2xl font-black text-xs text-gray-400 uppercase tracking-widest hover:bg-gray-100 transition">取消</button>
              <button type="submit" className="flex-2 py-4 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-blue-100 hover:bg-blue-700 transition">提交申请并建档</button>
            </div>
          </form>
        </div>
      )}

      {/* 资质审核弹窗 */}
      {showForm === 'audit' && selectedSupplier && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-[40px] w-full max-w-2xl overflow-hidden shadow-2xl animate-in zoom-in duration-300 flex flex-col">
            <div className="p-6 border-b flex justify-between items-center bg-gray-50">
              <h3 className="text-xl font-black italic text-gray-800 uppercase tracking-tight flex items-center">
                <CheckCircle size={24} className="mr-2 text-blue-600" /> 供应商入驻合规性审核
              </h3>
              <button onClick={() => setShowForm(null)} className="text-gray-400 hover:text-gray-600 p-2"><X size={24} /></button>
            </div>
            <div className="p-10 space-y-8">
               <div className="bg-blue-50/50 p-6 rounded-[32px] border border-blue-50 grid grid-cols-2 gap-y-4">
                  <div className="flex flex-col">
                     <span className="text-[10px] font-black text-gray-400 uppercase mb-1">主体名称</span>
                     <span className="text-sm font-bold text-gray-800">{selectedSupplier.supplier_name}</span>
                  </div>
                  <div className="flex flex-col">
                     <span className="text-[10px] font-black text-gray-400 uppercase mb-1">信用代码</span>
                     <span className="text-sm font-bold text-gray-800 font-mono uppercase">{selectedSupplier.business_license}</span>
                  </div>
                  <div className="flex flex-col">
                     <span className="text-[10px] font-black text-gray-400 uppercase mb-1">负责人</span>
                     <span className="text-sm font-bold text-gray-800">{selectedSupplier.contact_person}</span>
                  </div>
                  <div className="flex flex-col">
                     <span className="text-[10px] font-black text-gray-400 uppercase mb-1">联系电话</span>
                     <span className="text-sm font-bold text-gray-800 font-mono">{selectedSupplier.contact_phone}</span>
                  </div>
               </div>
               
               <div>
                  <label className="text-[10px] font-black text-gray-400 block mb-2 uppercase tracking-widest italic">内部审核评语 / 归档备注</label>
                  <textarea 
                    value={formData.audit_notes} 
                    onChange={e => setFormData({...formData, audit_notes: e.target.value})} 
                    className="w-full border-2 border-gray-100 rounded-3xl p-5 h-32 text-sm font-medium outline-none focus:ring-4 focus:ring-blue-50 transition-all" 
                    placeholder="请输入审核意见（不论通过或拒绝），将同步展示给供应商..."
                  ></textarea>
               </div>
            </div>
            <div className="p-8 border-t bg-gray-50 flex space-x-4">
              <button onClick={() => handleAudit(SupplierStatus.REJECTED)} className="flex-1 py-4 bg-white border-2 border-red-100 text-red-500 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-red-50 transition">拒绝入驻</button>
              <button onClick={() => handleAudit(SupplierStatus.APPROVED)} className="flex-2 py-4 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-blue-100 hover:bg-blue-700 transition">批准入驻并通过</button>
            </div>
          </div>
        </div>
      )}

      {/* 分析统计详情弹窗 (保持原有) */}
      {showForm === 'view' && selectedSupplier && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
           <div className="bg-white rounded-[40px] w-full max-w-4xl h-[80vh] flex overflow-hidden shadow-2xl animate-in zoom-in duration-300">
              <div className="w-1/3 bg-gray-50 border-r p-10 flex flex-col">
                  <div className="w-16 h-16 bg-blue-600 rounded-3xl mb-8 flex items-center justify-center text-white shadow-xl shadow-blue-200"><ShoppingBag size={32} /></div>
                  <h3 className="text-xl font-black text-gray-900 leading-tight mb-2">{selectedSupplier.supplier_name}</h3>
                  <div className="text-[10px] text-gray-400 font-black uppercase tracking-widest flex items-center"><MapPin size={10} className="mr-1" /> {selectedSupplier.address}</div>
                  
                  <div className="mt-auto space-y-4">
                     <div className="p-6 bg-white rounded-3xl border border-gray-100 shadow-sm">
                        <span className="text-[10px] font-black text-gray-400 uppercase block mb-1">审核记录</span>
                        <div className="text-xs font-bold text-gray-600 italic">"{selectedSupplier.audit_notes || '暂无评语'}"</div>
                     </div>
                  </div>
              </div>
              <div className="flex-1 flex flex-col">
                  <div className="p-6 border-b flex justify-between items-center bg-white">
                    <h4 className="text-sm font-black uppercase tracking-widest text-gray-400">供应商综合审计报告</h4>
                    <button onClick={() => setShowForm(null)} className="text-gray-400 hover:text-gray-600 p-2"><X size={24} /></button>
                  </div>
                  <div className="flex-1 overflow-y-auto p-10 space-y-12">
                     <section className="space-y-6">
                        <h5 className="text-[10px] font-black text-blue-600 uppercase tracking-widest flex items-center border-b pb-2"><Package size={14} className="mr-2" /> 在售资产分布</h5>
                        <div className="grid grid-cols-3 gap-6">
                           <div className="bg-green-50 p-6 rounded-[32px] border border-green-100">
                              <span className="text-[9px] font-black uppercase text-green-600/60 block mb-1">在线销售</span>
                              <span className="text-3xl font-black text-green-600">{selectedSupplier.stats.on_sale}</span>
                           </div>
                           <div className="bg-blue-50 p-6 rounded-[32px] border border-blue-100">
                              <span className="text-[9px] font-black uppercase text-blue-600/60 block mb-1">待审商品</span>
                              <span className="text-3xl font-black text-blue-600">{selectedSupplier.stats.pending}</span>
                           </div>
                        </div>
                     </section>
                  </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default SupplierManagement;
