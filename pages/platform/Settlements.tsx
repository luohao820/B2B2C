
import React, { useState } from 'react';
// Added TrendingUp to the imports from lucide-react
import { CreditCard, Download, Search, CheckCircle, Clock, AlertCircle, X, FileText, Info, Receipt, ArrowRight, TrendingUp } from 'lucide-react';
import { SettlementStatus } from '../../types';

const SettlementManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [showDetail, setShowDetail] = useState<any>(null);

  const settlements = [
    {
      id: 'SET_202310_001',
      supplier: '数码优选官方店',
      period: '2023-10',
      total_amount: 125000.00,
      refund_amount: 1500.00,
      commission_rate: 0.05,
      commission: 6250.00,
      final_amount: 118750.00,
      status: SettlementStatus.PAID,
      time: '2023-10-25 10:00:00',
      payment_method: '银行转账',
      proof_url: 'https://example.com/proof.pdf'
    },
    {
      id: 'SET_202310_002',
      supplier: '时尚服装贸易',
      period: '2023-10',
      total_amount: 45000.00,
      refund_amount: 200.00,
      commission_rate: 0.08,
      commission: 3600.00,
      final_amount: 41400.00,
      status: SettlementStatus.CONFIRMED,
      time: '-'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">供应商财务中心</h1>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-white border rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 flex items-center shadow-sm">
            <Download size={16} className="mr-2" /> 导出本月明细
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 shadow-lg shadow-blue-100">生成月度结算</button>
        </div>
      </div>

      {/* Settlement Detail Modal */}
      {showDetail && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl animate-in zoom-in duration-200">
            <div className="p-6 border-b flex justify-between items-center bg-gray-50">
              <h3 className="text-lg font-bold">月度结算详情 - {showDetail.period}</h3>
              <button onClick={() => setShowDetail(null)} className="text-gray-400 hover:text-gray-600 transition-colors"><X size={20} /></button>
            </div>
            
            <div className="p-8 space-y-8">
              <div className="flex justify-between items-end border-b pb-6">
                <div>
                  <div className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1">供应商名称</div>
                  <div className="text-xl font-bold text-gray-900">{showDetail.supplier}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1">结算单状态</div>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                    showDetail.status === SettlementStatus.PAID ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {showDetail.status === SettlementStatus.PAID ? '已完成支付' : '待确认打款'}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center">
                    <Receipt size={14} className="mr-2" /> 结算账单摘要
                  </h4>
                  <div className="space-y-3 bg-gray-50 p-6 rounded-3xl">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">交易总额 (+)</span>
                      <span className="font-bold text-gray-900">￥{showDetail.total_amount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">售后退款 (-)</span>
                      <span className="font-bold text-red-500">-￥{showDetail.refund_amount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">平台佣金 ({showDetail.commission_rate*100}%)</span>
                      <span className="font-bold text-orange-600">-￥{showDetail.commission.toLocaleString()}</span>
                    </div>
                    <div className="pt-3 border-t flex justify-between">
                      <span className="text-sm font-bold text-gray-700">实际应付</span>
                      <span className="text-xl font-black text-blue-600">￥{showDetail.final_amount.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center">
                    <CreditCard size={14} className="mr-2" /> 支付凭证
                  </h4>
                  {showDetail.status === SettlementStatus.PAID ? (
                    <div className="space-y-4">
                      <div className="p-4 bg-green-50 rounded-2xl border border-green-100 flex items-center">
                        <FileText size={24} className="text-green-600 mr-3" />
                        <div>
                          <div className="text-xs font-bold text-green-700">结算汇款证明.pdf</div>
                          <div className="text-[10px] text-green-500 uppercase font-bold">{showDetail.time}</div>
                        </div>
                        <button className="ml-auto text-green-700 hover:underline text-[10px] font-bold">查看预览</button>
                      </div>
                      <div className="text-xs text-gray-400">支付方式: {showDetail.payment_method}</div>
                    </div>
                  ) : (
                    <div className="h-full">
                      <div className="border-2 border-dashed border-gray-200 rounded-3xl h-32 flex flex-col items-center justify-center text-gray-400 hover:border-blue-300 hover:text-blue-500 transition-all cursor-pointer">
                        <Download size={24} className="mb-2" />
                        <span className="text-xs font-bold uppercase">上传付款回执</span>
                      </div>
                      <p className="mt-2 text-[10px] text-gray-400 text-center">支持 JPG, PNG, PDF 格式，最大 10MB</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="p-6 border-t bg-gray-50 flex justify-end space-x-3">
              <button onClick={() => setShowDetail(null)} className="px-6 py-2.5 border bg-white rounded-xl font-bold text-gray-600 hover:bg-gray-100">取消</button>
              {showDetail.status !== SettlementStatus.PAID && (
                <button className="px-10 py-2.5 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition">
                  确认已付款
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border shadow-sm relative overflow-hidden">
          <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">本月待结算总额</div>
          <div className="text-2xl font-black text-gray-900">￥1,420,500.00</div>
          <div className="absolute right-[-10px] top-[-10px] opacity-5">
            <CreditCard size={100} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border shadow-sm relative overflow-hidden">
          <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">平台累计佣金</div>
          <div className="text-2xl font-black text-blue-600">￥85,230.00</div>
          <div className="absolute right-[-10px] top-[-10px] opacity-5">
            <TrendingUp size={100} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border shadow-sm relative overflow-hidden">
          <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">异常退款总计</div>
          <div className="text-2xl font-black text-red-600">￥24,850.00</div>
          <div className="absolute right-[-10px] top-[-10px] opacity-5">
            <AlertCircle size={100} />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border overflow-hidden">
        <div className="p-6 border-b flex justify-between items-center bg-gray-50/20">
          <div className="flex space-x-3">
            {['all', 'pending', 'paid'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 text-sm font-bold rounded-2xl transition-all ${
                  activeTab === tab ? 'bg-blue-600 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'
                }`}
              >
                {tab === 'all' ? '全部明细' : tab === 'pending' ? '待结算' : '已发放'}
              </button>
            ))}
          </div>
          <div className="relative w-80">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="搜索结算单号、供应商名称" className="w-full pl-12 pr-4 py-3 border rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-5 font-bold text-gray-700 tracking-widest uppercase text-[10px]">账期/单号</th>
                <th className="px-6 py-5 font-bold text-gray-700 tracking-widest uppercase text-[10px]">供应商主体</th>
                <th className="px-6 py-5 font-bold text-gray-700 tracking-widest uppercase text-[10px] text-right">交易额 (+)</th>
                <th className="px-6 py-5 font-bold text-gray-700 tracking-widest uppercase text-[10px] text-right">应付金额</th>
                <th className="px-6 py-5 font-bold text-gray-700 tracking-widest uppercase text-[10px]">当前状态</th>
                <th className="px-6 py-5 font-bold text-right text-[10px]">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {settlements.map((s) => (
                <tr key={s.id} className="hover:bg-gray-50 transition group">
                  <td className="px-6 py-5">
                    <div className="font-black text-gray-900 group-hover:text-blue-600 transition-colors">{s.period}</div>
                    <div className="text-[10px] text-gray-400 mt-1 font-mono uppercase tracking-tighter">{s.id}</div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="text-sm font-bold text-gray-700">{s.supplier}</div>
                  </td>
                  <td className="px-6 py-5 text-right font-mono font-bold text-gray-900">￥{s.total_amount.toLocaleString()}</td>
                  <td className="px-6 py-5 text-right font-mono font-black text-blue-600 text-base">￥{s.final_amount.toLocaleString()}</td>
                  <td className="px-6 py-5">
                    {s.status === SettlementStatus.PAID ? (
                      <span className="px-2.5 py-1 bg-green-50 text-green-700 rounded-lg text-[10px] font-bold uppercase tracking-widest flex items-center w-fit border border-green-100">
                        <CheckCircle size={10} className="mr-1" /> 已发放
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 bg-yellow-50 text-yellow-700 rounded-lg text-[10px] font-bold uppercase tracking-widest flex items-center w-fit border border-yellow-100">
                        <Clock size={10} className="mr-1" /> 待打款
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex justify-end space-x-2">
                      <button onClick={() => setShowDetail(s)} className="px-4 py-1.5 bg-blue-50 text-blue-600 rounded-xl text-xs font-bold hover:bg-blue-100 transition shadow-sm border border-blue-100">
                        管理明细
                      </button>
                      <button className="p-2 text-gray-400 hover:text-blue-600"><Download size={18} /></button>
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

export default SettlementManagement;
