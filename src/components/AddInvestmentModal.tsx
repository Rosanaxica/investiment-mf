'use client';

import { useState } from 'react';
import { useAppDispatch } from '../lib/hooks';
import { addInvestment } from '../lib/slices/investmentsSlice';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface AddInvestmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddInvestmentModal({ isOpen, onClose }: AddInvestmentModalProps) {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    amount: 0,
    return: 0
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newInvestment = {
      id: Date.now().toString(),
      ...formData,
      date: new Date().toISOString().split('T')[0],
      status: 'active' as const
    };

    dispatch(addInvestment(newInvestment));
    setFormData({ name: '', type: '', amount: 0, return: 0 });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Adicionar Novo Investimento</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nome do Investimento
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full p-2 border rounded-md"
                placeholder="Ex: Tesouro Direto"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tipo
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value})}
                className="w-full p-2 border rounded-md"
                required
              >
                <option value="">Selecione o tipo</option>
                <option value="Renda Fixa">Renda Fixa</option>
                <option value="Renda Variável">Renda Variável</option>
                <option value="Fundos">Fundos</option>
                <option value="Criptomoedas">Criptomoedas</option>
                <option value="Outros">Outros</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Valor (R$)
                </label>
                <input
                  type="number"
                  value={formData.amount}
                  onChange={(e) => setFormData({...formData, amount: Number(e.target.value)})}
                  className="w-full p-2 border rounded-md"
                  placeholder="0,00"
                  min="0"
                  step="0.01"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Retorno (%)
                </label>
                <input
                  type="number"
                  value={formData.return}
                  onChange={(e) => setFormData({...formData, return: Number(e.target.value)})}
                  className="w-full p-2 border rounded-md"
                  placeholder="0,00"
                  step="0.1"
                  required
                />
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <Button type="submit" className="flex-1">
                Adicionar Investimento
              </Button>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancelar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 