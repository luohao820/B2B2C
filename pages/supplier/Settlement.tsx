
import React, { useState } from 'react';
import { BarChart3, TrendingUp, Download, PieChart, Calendar, FileText, CheckCircle, Clock, AlertCircle, TrendingDown, Info, Receipt, CreditCard, X, FileSpreadsheet } from 'lucide-react';
import { SettlementStatus } from '../../types';

const SupplierSettlement: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<any>(null);

  const detailedData = [
    { 
      id: 'SET_202310_001', 
      settlement_period: '2023-10', 
      order_count: 85, 
      total_sales: 52400.00, 
      refund_amount: 450.00, 
      commission_rate: 0.05, 
      commission_amount: 2620.00, 
      settlement_amount: 49330.00, 
      paid_amount: 0.00,
      unpaid_amount: 49330.00,
      settlement_status: SettlementStatus.CALCULATED,
      export_status: 'not_exported',
      export_time: '-',
      created_at: '2023-11-01 01:00:00'
    },
    { 
      id: 'SET_202309_002', 
      settlement_period: '2023-09', 
      order_count: 120, 
      total_sales: 84500.00, 
      refund_amount: 1200.00, 
      commission_rate: 0.05, 
      commission_amount: 4225.00, 
      settlement_amount: 79075.00, 
      paid_amount: 79075.00,
      unpaid_amount: 0.00,
      settlement_status: SettlementStatus.PAID,
      export_status: 'exported',
      export_time: '2023-10-05 10:00:00',
      paid_time: '2023-10-05 14:20:00'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">对账结算中心</h1>
        <div className="flex space-x-3">
          <button className="px-4 py-2.5 bg-white border rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 flex items-center shadow-sm">
            <FileSpreadsheet size={18} className="mr-2 text-green-600" /> 导出全部结算单
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl border shadow-sm relative overflow-hidden group">
          <div className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">待结算总额 (UNPAID)</div>
          <div className="text-2xl font-black text-red-600">￥49,330.00</div>
          <div className="text-[10px] text-gray-400 mt-2 flex items-center"><Clock size={12} className="mr-1" /> 预计11-10日确认打款</div>
        </div>
        <div className="bg-white p-6 rounded-3xl border shadow-sm relative overflow-hidden group">
          <div className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">本月销售 (GTV)</div>
          <div className="text-2xl font-black text-gray-900">￥52,400.00</div>
          <div className="text-[10px] text-green-600 mt-2 font-bold">+12.5% 较上月同期</div>
        </div>
        <div className="bg-white p-6 rounded-3xl border shadow-sm relative overflow-hidden group">
          <div className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">累计已收回款</div>
          <div className="text-2xl font-black text-blue-600">￥428,900.00</div>
          <div className="text-[10px] text-gray-400 mt-2 font-bold">累计合作 14 个月</div>
        </div>
        <div className="bg-white p-6 rounded-3xl border shadow-sm relative overflow-hidden group">
          <div className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">平均佣金率</div>
          <div className="text-2xl font-black text-gray-900">5.0%</div>
          <div className="text-[10px] text-gray-400 mt-2 font-bold uppercase">类目：数码/户外</div>
        </div>
      </div>

      {/* 结算明细弹窗 */}
      {selectedPeriod && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl animate-in zoom-in duration-200">
            <div className="p-6 border-b flex justify-between items-center bg-gray-50">
              <h3 className="text-lg font-bold">对账单详情 - {selectedPeriod.settlement_period}</h3>
              <button onClick={() => setSelectedPeriod(null)} className="text-gray-400 hover:text-gray-600"><X size={24} /></button>
            </div>
            <div className="p-8 space-y-8">
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center"><Receipt size={14} className="mr-2" /> 收入/支出拆解</h4>
                  <div className="bg-gray-50 p-6 rounded-3xl space-y-3">
                    <div className="flex justify-between text-sm"><span>销售额 (+)</span><span className="font-bold">￥{selectedPeriod.total_sales.toFixed(2)}</span></div>
                    <div className="flex justify-between text-sm text-red-500"><span>退款扣除 (-)</span><span className="font-bold">-￥{selectedPeriod.refund_amount.toFixed(2)}</span></div>
                    <div className="flex justify-between text-sm text-orange-600"><span>平台佣金 ({selectedPeriod.commission_rate*100}%)</span><span className="font-bold">-￥{selectedPeriod.commission_amount.toFixed(2)}</span></div>
                    <div className="pt-3 border-t font-black text-blue-600 flex justify-between text-lg"><span>应结算净额:</span><span>￥{selectedPeriod.settlement_amount.toFixed(2)}</span></div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center"><CreditCard size={14} className="mr-2" /> 打款进度明细</h4>
                  <div className="bg-blue-50/30 p-6 rounded-3xl space-y-4 border border-blue-50">
                    <div className="flex justify-between text-sm"><span>结算状态:</span><span className="font-bold text-blue-600 uppercase tracking-tighter">{selectedPeriod.settlement_status}</span></div>
                    <div className="flex justify-between text-sm"><span>已付金额:</span><span className="font-bold text-green-600">￥{selectedPeriod.paid_amount.toFixed(2)}</span></div>
                    <div className="flex justify-between text-sm"><span>未付余额:</span><span className="font-bold text-red-600">￥{selectedPeriod.unpaid_amount.toFixed(2)}</span></div>
                    <p className="text-[10px] text-gray-400 italic">导出状态: {selectedPeriod.export_status === 'exported' ? `已导出 (${selectedPeriod.export_time})` : '未导出'}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6 border-t bg-gray-50 flex justify-end">
               <button className="px-8 py-3 bg-blue-600 text-white rounded-2xl font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition flex items-center"><Download size={18} className="mr-2" /> 下载明细流水 (XLSX)</button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-3xl shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-5 font-black text-gray-400 uppercase text-[10px]">账期/结算ID</th>
                <th className="px-6 py-5 font-black text-gray-400 uppercase text-[10px] text-center">订单数</th>
                <th className="px-6 py-5 font-black text-gray-400 uppercase text-[10px] text-right">销售总额</th>
                <th className="px-6 py-5 font-black text-gray-400 uppercase text-[10px] text-right">应结金额</th>
                <th className="px-6 py-5 font-black text-gray-400 uppercase text-[10px]">状态/导出</th>
                <th className="px-6 py-5 font-black text-gray-400 uppercase text-[10px] text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {detailedData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition group">
                  <td className="px-6 py-5">
                    <div className="font-black text-gray-900">{item.settlement_period}</div>
                    <div className="text-[10px] text-gray-400 font-mono">{item.id}</div>
                  </td>
                  <td className="px-6 py-5 text-center font-bold text-gray-600">{item.order_count} 笔</td>
                  <td className="px-6 py-5 text-right font-mono font-bold">￥{item.total_sales.toLocaleString()}</td>
                  <td className="px-6 py-5 text-right font-mono font-black text-blue-600 italic">￥{item.settlement_amount.toLocaleString()}</td>
                  <td className="px-6 py-5">
                    <div className="flex flex-col space-y-1.5">
                      <span className={`px-2 py-0.5 rounded-lg text-[9px] font-black uppercase w-fit ${item.settlement_status === SettlementStatus.PAID ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'}`}>
                        {item.settlement_status}
                      </span>
                      <span className={`text-[8px] font-bold ${item.export_status === 'exported' ? 'text-blue-500' : 'text-gray-300'}`}>
                        {item.export_status === 'exported' ? '已导出账单' : '未导出'}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button onClick={() => setSelectedPeriod(item)} className="px-4 py-1.5 bg-blue-50 text-blue-600 rounded-xl text-xs font-bold hover:bg-blue-100">查看明细</button>
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

export default SupplierSettlement;
