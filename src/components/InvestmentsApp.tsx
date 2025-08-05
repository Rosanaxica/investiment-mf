"use client";

import { useState } from 'react';
import { TrendingUp, DollarSign, BarChart3, Plus, Trash2, Edit, Power, PowerOff, Target } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../lib/hooks';
import { removeInvestment, updateInvestment, toggleInvestmentStatus } from '../lib/slices/investmentsSlice';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import AddInvestmentModal from './AddInvestmentModal';
import InvestmentFilters from './InvestmentFilters';

export default function InvestmentsApp() {
  const dispatch = useAppDispatch();
  const { investments, loading, error } = useAppSelector(state => state.investments);
  const { searchTerm, selectedType, sortBy, sortOrder } = useAppSelector(state => state.filters);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    type: '',
    amount: 0,
    return: 0
  });

  const filteredInvestments = investments.filter(investment => {
    const matchesSearch = searchTerm === '' || 
      investment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      investment.type.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = selectedType === '' || investment.type === selectedType;
    
    return matchesSearch && matchesType;
  });

  const sortedInvestments = [...filteredInvestments].sort((a, b) => {
    let aValue: any = a[sortBy];
    let bValue: any = b[sortBy];
    
    if (sortBy === 'date') {
      aValue = new Date(a.date).getTime();
      bValue = new Date(b.date).getTime();
    }
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const activeInvestments = investments.filter(inv => inv.status === 'active');
  const totalInvested = activeInvestments.reduce((sum, inv) => sum + inv.amount, 0);
  const totalReturn = activeInvestments.reduce((sum, inv) => sum + (inv.amount * inv.return / 100), 0);
  const totalValue = totalInvested + totalReturn;

  const handleRemoveInvestment = (id: string) => {
    dispatch(removeInvestment(id));
  };

  const handleEditInvestment = (investment: any) => {
    setEditingId(investment.id);
    setEditForm({
      name: investment.name,
      type: investment.type,
      amount: investment.amount,
      return: investment.return
    });
  };

  const handleSaveEdit = (id: string) => {
    const updatedInvestment = {
      ...investments.find(inv => inv.id === id)!,
      ...editForm
    };
    dispatch(updateInvestment(updatedInvestment));
    setEditingId(null);
    setEditForm({ name: '', type: '', amount: 0, return: 0 });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm({ name: '', type: '', amount: 0, return: 0 });
  };

  const handleToggleStatus = (id: string) => {
    dispatch(toggleInvestmentStatus(id));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Carregando investimentos...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-600">Erro: {error}</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end items-center">
  
        <Button className="flex items-center gap-2" onClick={() => setIsModalOpen(true)}>
          <Plus size={20} />
          Novo Investimento
        </Button>
      </div>

      <InvestmentFilters />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-black p-6 rounded-lg border border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500 rounded-lg">
              <DollarSign className="text-white" size={24} />
            </div>
            <div>
              <p className="text-sm text-blue-300 font-medium">Total Investido</p>
              <p className="text-2xl font-bold text-white">
                R$ {totalInvested.toLocaleString('pt-BR')}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-black p-6 rounded-lg border border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-500 rounded-lg">
              <TrendingUp className="text-white" size={24} />
            </div>
            <div>
              <p className="text-sm text-green-300 font-medium">Retorno Total</p>
              <p className="text-2xl font-bold text-white">
                R$ {totalReturn.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-black p-6 rounded-lg border border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-500 rounded-lg">
              <BarChart3 className="text-white" size={24} />
            </div>
            <div>
              <p className="text-sm text-purple-300 font-medium">Rentabilidade</p>
              <p className="text-2xl font-bold text-white">
                {((totalReturn / totalInvested) * 100).toFixed(2)}%
              </p>
            </div>
          </div>
        </div>

        <div className="bg-black p-6 rounded-lg border border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-500 rounded-lg">
              <Target className="text-white" size={24} />
            </div>
            <div>
              <p className="text-sm text-orange-300 font-medium">Investimentos Ativos</p>
              <p className="text-2xl font-bold text-white">
                {activeInvestments.length}
              </p>
            </div>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Investimentos Ativos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sortedInvestments.map((investment) => (
              <div key={investment.id} className="flex justify-between items-start p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex-1">
                  {editingId === investment.id ? (
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={editForm.name}
                        onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                        className="w-full p-2 border rounded"
                        placeholder="Nome do investimento"
                      />
                      <input
                        type="text"
                        value={editForm.type}
                        onChange={(e) => setEditForm({...editForm, type: e.target.value})}
                        className="w-full p-2 border rounded"
                        placeholder="Tipo"
                      />
                      <div className="flex gap-2">
                        <input
                          type="number"
                          value={editForm.amount}
                          onChange={(e) => setEditForm({...editForm, amount: Number(e.target.value)})}
                          className="w-1/2 p-2 border rounded"
                          placeholder="Valor"
                        />
                        <input
                          type="number"
                          value={editForm.return}
                          onChange={(e) => setEditForm({...editForm, return: Number(e.target.value)})}
                          className="w-1/2 p-2 border rounded"
                          placeholder="Retorno %"
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          onClick={() => handleSaveEdit(investment.id)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          Salvar
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={handleCancelEdit}
                        >
                          Cancelar
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-gray-900">{investment.name}</h4>
                        <Badge 
                          variant={investment.status === 'active' ? 'default' : 'secondary'}
                          className={investment.status === 'inactive' ? 'bg-gray-100 text-gray-600' : ''}
                        >
                          {investment.status === 'active' ? 'Ativo' : 'Inativo'}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{investment.type}</p>
                      <p className="text-xs text-gray-500">Investido em {new Date(investment.date).toLocaleDateString('pt-BR')}</p>
                    </>
                  )}
                </div>
                
                {editingId !== investment.id && (
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      R$ {investment.amount.toLocaleString('pt-BR')}
                    </p>
                    <p className={`text-sm ${investment.return >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      +{investment.return}% de retorno
                    </p>
                    <div className="flex gap-2 mt-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleEditInvestment(investment)}
                        className="bg-black text-white hover:bg-gray-800 border-black"
                      >
                        <Edit size={16} />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleToggleStatus(investment.id)}
                        className="bg-black text-white hover:bg-gray-800 border-black"
                      >
                        {investment.status === 'active' ? <PowerOff size={16} /> : <Power size={16} />}
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleRemoveInvestment(investment.id)}
                        className="bg-black text-white hover:bg-gray-800 border-black"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {sortedInvestments.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <BarChart3 className="mx-auto text-gray-400" size={48} />
            <h3 className="mt-4 text-lg font-medium text-gray-900">Nenhum investimento encontrado</h3>
            <p className="mt-2 text-gray-600">Comece investindo hoje mesmo!</p>
            <Button className="mt-4">
              Fazer Primeiro Investimento
            </Button>
          </CardContent>
        </Card>
      )}

      <AddInvestmentModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
} 