
import React, { useState } from 'react';
import { 
  UserPlus, Shield, Search, Edit3, Trash2, Key, 
  Ban, CheckCircle, X, Save, Lock, ChevronRight,
  ShieldCheck, LayoutGrid, Info
} from 'lucide-react';
import { AdminMember, AdminMemberStatus, AdminRole, AdminPermission } from '../../types';

interface MemberManagementProps {
  type: 'platform' | 'supplier';
}

const MemberManagement: React.FC<MemberManagementProps> = ({ type }) => {
  const [showForm, setShowForm] = useState<'member' | 'role' | null>(null);
  const [editingMember, setEditingMember] = useState<AdminMember | null>(null);
  const [editingRole, setEditingRole] = useState<AdminRole | null>(null);

  // Mock Data
  const platformPermissions: AdminPermission[] = [
    { id: 'p1', name: '控制台查看', path: '/platform/dashboard' },
    { id: 'p2', name: '供应商管理', path: '/platform/suppliers' },
    { id: 'p3', name: '商品审核', path: '/platform/product-audit' },
    { id: 'p4', name: '订单管理', path: '/platform/orders' },
    { id: 'p5', name: '用户管理', path: '/platform/users' },
  ];

  const supplierPermissions: AdminPermission[] = [
    { id: 's1', name: '商品管理', path: '/supplier/products' },
    { id: 's2', name: '库存管理', path: '/supplier/inventory' },
    { id: 's3', name: '订单处理', path: '/supplier/orders' },
    { id: 's4', name: '财务对账', path: '/supplier/settlements' },
  ];

  const permissions = type === 'platform' ? platformPermissions : supplierPermissions;

  const [roles, setRoles] = useState<AdminRole[]>([
    { id: 'r1', name: type === 'platform' ? '超级管理员' : '店长', permissions: permissions.map(p => p.id) },
    { id: 'r2', name: type === 'platform' ? '财务审核' : '财务专员', permissions: permissions.slice(0, 2).map(p => p.id) },
  ]);

  const [members, setMembers] = useState<AdminMember[]>([
    { 
      id: 'M001', 
      username: 'admin_leo', 
      real_name: '李建国', 
      role_id: 'r1', 
      status: AdminMemberStatus.ACTIVE, 
      email: 'leo@corp.com', 
      phone: '13800000001', 
      created_at: '2023-01-01' 
    },
    { 
      id: 'M002', 
      username: 'finance_alice', 
      real_name: '张美玲', 
      role_id: 'r2', 
      status: AdminMemberStatus.DISABLED, 
      email: 'alice@corp.com', 
      phone: '13800000002', 
      created_at: '2023-05-12' 
    },
  ]);

  const handleOpenMemberForm = (member: AdminMember | null = null) => {
    setEditingMember(member || {
      id: `M${Date.now()}`,
      username: '',
      real_name: '',
      role_id: roles[0]?.id || '',
      status: AdminMemberStatus.ACTIVE,
      email: '',
      phone: '',
      created_at: new Date().toISOString().split('T')[0]
    });
    setShowForm('member');
  };

  const handleSaveMember = () => {
    if (!editingMember) return;
    if (members.find(m => m.id === editingMember.id)) {
      setMembers(members.map(m => m.id === editingMember.id ? editingMember : m));
    } else {
      setMembers([...members, editingMember]);
    }
    setShowForm(null);
  };

  const handleResetPassword = (username: string) => {
    if (window.confirm(`确定要重置成员 ${username} 的密码吗？新密码将通过邮件发送。`)) {
      alert('密码重置指令已发送！');
    }
  };

  const toggleStatus = (id: string) => {
    setMembers(members.map(m => {
      if (m.id === id) {
        return { ...m, status: m.status === AdminMemberStatus.ACTIVE ? AdminMemberStatus.DISABLED : AdminMemberStatus.ACTIVE };
      }
      return m;
    }));
  };

  const deleteMember = (id: string) => {
    if (window.confirm('确定要删除该成员吗？此操作不可撤销。')) {
      setMembers(members.filter(m => m.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
           <h1 className="text-2xl font-bold text-gray-800 tracking-tight">管理后台成员中枢</h1>
           <p className="text-xs text-gray-400 mt-1 font-medium italic">配置内部管理人员账号，实现基于角色的精细化页面权限控制 (RBAC)</p>
        </div>
        <div className="flex space-x-3">
           <button onClick={() => setShowForm('role')} className="px-5 py-2.5 bg-white border border-gray-200 text-gray-600 rounded-2xl text-xs font-black uppercase shadow-sm flex items-center hover:bg-gray-50 transition">
              <Shield size={18} className="mr-2" /> 权限角色定义
           </button>
           <button onClick={() => handleOpenMemberForm()} className="px-6 py-2.5 bg-blue-600 text-white rounded-2xl text-xs font-black uppercase shadow-lg shadow-blue-100 flex items-center hover:bg-blue-700 transition">
              <UserPlus size={18} className="mr-2" /> 添加管理成员
           </button>
        </div>
      </div>

      <div className="bg-white rounded-[40px] shadow-sm border overflow-hidden min-h-[60vh]">
        <div className="p-6 border-b flex justify-between items-center bg-gray-50/20">
           <div className="relative w-80">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
              <input type="text" placeholder="搜索成员账号、姓名..." className="w-full pl-12 pr-4 py-2.5 border rounded-2xl text-xs outline-none bg-white" />
           </div>
        </div>

        <table className="w-full text-left">
           <thead>
              <tr className="bg-gray-50/50 border-b text-[10px] font-black text-gray-400 uppercase tracking-widest">
                 <th className="py-5 px-8">成员标识</th>
                 <th className="py-5 px-6">所属角色</th>
                 <th className="py-5 px-6">联系方式</th>
                 <th className="py-5 px-6">状态</th>
                 <th className="py-5 px-8 text-right">操作</th>
              </tr>
           </thead>
           <tbody className="divide-y">
              {members.map(m => (
                <tr key={m.id} className="hover:bg-gray-50 transition-colors group">
                   <td className="py-5 px-8">
                      <div className="flex items-center">
                         <div className={`w-10 h-10 rounded-xl flex items-center justify-center mr-4 shadow-inner ${m.status === AdminMemberStatus.ACTIVE ? 'bg-blue-50 text-blue-600' : 'bg-gray-100 text-gray-400'}`}>
                            <ShieldCheck size={20} />
                         </div>
                         <div>
                            <div className="text-sm font-black text-gray-900 italic">{m.username}</div>
                            <div className="text-[10px] text-gray-400 font-bold uppercase">{m.real_name}</div>
                         </div>
                      </div>
                   </td>
                   <td className="py-5 px-6">
                      <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-lg text-[10px] font-black border border-indigo-100 uppercase tracking-widest italic">
                         {roles.find(r => r.id === m.role_id)?.name}
                      </span>
                   </td>
                   <td className="py-5 px-6">
                      <div className="text-[10px] font-bold text-gray-500">{m.email}</div>
                      <div className="text-[10px] font-mono text-gray-400 mt-0.5">{m.phone}</div>
                   </td>
                   <td className="py-5 px-6">
                      <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border inline-flex items-center ${m.status === AdminMemberStatus.ACTIVE ? 'bg-green-50 text-green-600 border-green-100' : 'bg-red-50 text-red-600 border-red-100'}`}>
                         {m.status === AdminMemberStatus.ACTIVE ? <CheckCircle size={10} className="mr-1"/> : <Ban size={10} className="mr-1"/>}
                         {m.status}
                      </span>
                   </td>
                   <td className="py-5 px-8 text-right">
                      <div className="flex justify-end space-x-2 opacity-60 group-hover:opacity-100 transition-opacity">
                         <button onClick={() => handleOpenMemberForm(m)} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-white rounded-xl shadow-sm border border-transparent hover:border-blue-100"><Edit3 size={18}/></button>
                         <button onClick={() => handleResetPassword(m.username)} className="p-2 text-gray-400 hover:text-orange-600 hover:bg-white rounded-xl shadow-sm border border-transparent hover:border-orange-100" title="重置密码"><Key size={18}/></button>
                         <button onClick={() => toggleStatus(m.id)} className="p-2 text-gray-400 hover:text-gray-900 hover:bg-white rounded-xl shadow-sm border border-transparent hover:border-gray-300" title={m.status === AdminMemberStatus.ACTIVE ? '禁用' : '启用'}>
                           {m.status === AdminMemberStatus.ACTIVE ? <Ban size={18}/> : <CheckCircle size={18}/>}
                         </button>
                         <button onClick={() => deleteMember(m.id)} className="p-2 text-gray-300 hover:text-red-500 hover:bg-white rounded-xl shadow-sm border border-transparent hover:border-red-100"><Trash2 size={18}/></button>
                      </div>
                   </td>
                </tr>
              ))}
           </tbody>
        </table>
      </div>

      {/* Member Form Modal */}
      {showForm === 'member' && editingMember && (
        <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
           <div className="bg-white rounded-[40px] w-full max-w-xl overflow-hidden shadow-2xl animate-in zoom-in duration-200">
              <div className="p-6 border-b flex justify-between items-center bg-gray-50">
                 <h3 className="text-xl font-black uppercase italic text-gray-800">维护管理成员 (Maintainer)</h3>
                 <button onClick={() => setShowForm(null)} className="text-gray-400 p-2"><X size={24}/></button>
              </div>
              <div className="p-10 space-y-8 max-h-[70vh] overflow-y-auto scrollbar-hide">
                 <div className="grid grid-cols-2 gap-6">
                    <div className="col-span-2">
                       <label className="text-[10px] font-black text-blue-600 uppercase block mb-2 tracking-widest">登录账号 (Login Account)</label>
                       <input 
                         type="text" 
                         value={editingMember.username}
                         onChange={e => setEditingMember({...editingMember, username: e.target.value})}
                         className="w-full border-2 border-gray-100 rounded-2xl p-4 font-bold outline-none focus:border-blue-600 shadow-inner" 
                         placeholder="建议使用工号或英文名" 
                       />
                    </div>
                    <div>
                       <label className="text-[10px] font-black text-gray-400 uppercase block mb-2 tracking-widest">真实姓名</label>
                       <input 
                         type="text" 
                         value={editingMember.real_name}
                         onChange={e => setEditingMember({...editingMember, real_name: e.target.value})}
                         className="w-full border-2 border-gray-100 rounded-2xl p-4 font-bold outline-none focus:border-blue-600 shadow-inner" 
                       />
                    </div>
                    <div>
                       <label className="text-[10px] font-black text-gray-400 uppercase block mb-2 tracking-widest">指派角色 (Role)</label>
                       <select 
                         value={editingMember.role_id}
                         onChange={e => setEditingMember({...editingMember, role_id: e.target.value})}
                         className="w-full border-2 border-gray-100 rounded-2xl p-4 font-bold outline-none focus:border-blue-600 appearance-none bg-white"
                       >
                          {roles.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
                       </select>
                    </div>
                    <div className="col-span-2">
                       <label className="text-[10px] font-black text-gray-400 uppercase block mb-2 tracking-widest">联系邮箱</label>
                       <input 
                         type="email" 
                         value={editingMember.email}
                         onChange={e => setEditingMember({...editingMember, email: e.target.value})}
                         className="w-full border-2 border-gray-100 rounded-2xl p-4 font-bold outline-none focus:border-blue-600 shadow-inner" 
                       />
                    </div>
                 </div>
                 <div className="p-4 bg-orange-50 border border-orange-100 rounded-2xl flex items-start">
                    <Info size={16} className="text-orange-600 mr-3 mt-1 flex-shrink-0" />
                    <p className="text-[11px] text-orange-700 leading-relaxed font-bold uppercase tracking-tight">
                       新增成员默认密码为 12345678。成员首次登录后，需通过“安全中心”强制修改初始密码。
                    </p>
                 </div>
              </div>
              <div className="p-8 border-t bg-gray-50 flex space-x-3">
                 <button onClick={() => setShowForm(null)} className="flex-1 py-4 bg-white border rounded-2xl font-black text-[10px] text-gray-400 uppercase tracking-widest">放弃</button>
                 <button onClick={handleSaveMember} className="flex-2 py-4 bg-blue-600 text-white rounded-2xl font-black text-[10px] uppercase shadow-lg shadow-blue-100 hover:bg-blue-700 transition flex items-center justify-center">
                    <Save size={18} className="mr-2" /> 保存成员档案
                 </button>
              </div>
           </div>
        </div>
      )}

      {/* Role & Permissions Form (Simplified for UI display) */}
      {showForm === 'role' && (
        <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
           <div className="bg-white rounded-[40px] w-full max-w-2xl overflow-hidden shadow-2xl animate-in zoom-in duration-200">
              <div className="p-6 border-b flex justify-between items-center bg-gray-50">
                 <h3 className="text-xl font-black uppercase italic text-gray-800">权限角色建模 (Role Config)</h3>
                 <button onClick={() => setShowForm(null)} className="text-gray-400 p-2"><X size={24}/></button>
              </div>
              <div className="p-10 space-y-10 max-h-[70vh] overflow-y-auto scrollbar-hide">
                 {roles.map(role => (
                   <div key={role.id} className="p-8 bg-gray-50/50 rounded-[32px] border border-gray-100 space-y-6">
                      <div className="flex justify-between items-center">
                         <div className="text-lg font-black text-gray-900 italic uppercase">{role.name}</div>
                         <div className="flex space-x-2">
                            <button className="p-2 bg-white rounded-xl text-gray-400 hover:text-blue-600 border shadow-sm"><Edit3 size={16}/></button>
                            <button className="p-2 bg-white rounded-xl text-gray-300 hover:text-red-500 border shadow-sm"><Trash2 size={16}/></button>
                         </div>
                      </div>
                      <div>
                         <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-4 italic border-b pb-2">已授权页面组件 (Modules)</label>
                         <div className="grid grid-cols-2 gap-3">
                            {permissions.map(p => {
                               const isChecked = role.permissions.includes(p.id);
                               return (
                                 <div key={p.id} className={`flex items-center p-3 rounded-2xl border-2 transition-all ${isChecked ? 'bg-white border-blue-500 text-blue-700 shadow-sm' : 'bg-gray-100/50 border-transparent text-gray-400 opacity-50'}`}>
                                    <div className={`w-4 h-4 rounded border-2 mr-3 flex items-center justify-center ${isChecked ? 'bg-blue-600 border-blue-600' : 'border-gray-300'}`}>
                                       {isChecked && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                                    </div>
                                    <span className="text-[11px] font-black uppercase tracking-tight">{p.name}</span>
                                 </div>
                               );
                            })}
                         </div>
                      </div>
                   </div>
                 ))}
                 <button className="w-full py-5 border-2 border-dashed border-gray-200 rounded-[32px] text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] hover:border-blue-400 hover:text-blue-600 transition-all">+ 初始化新业务角色</button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default MemberManagement;
