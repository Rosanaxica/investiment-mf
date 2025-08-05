'use client';

import { Search, Filter, SortAsc, SortDesc } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../lib/hooks';
import { setSearchTerm, setSelectedType, setSortBy, setSortOrder, clearFilters } from '../lib/slices/filtersSlice';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

export default function InvestmentFilters() {
  const dispatch = useAppDispatch();
  const { searchTerm, selectedType, sortBy, sortOrder } = useAppSelector(state => state.filters);

  const investmentTypes = [
    'Renda Fixa',
    'Renda Variável', 
    'Fundos',
    'Criptomoedas',
    'Outros'
  ];

  const sortOptions = [
    { value: 'name', label: 'Nome' },
    { value: 'amount', label: 'Valor' },
    { value: 'return', label: 'Retorno' },
    { value: 'date', label: 'Data' }
  ];

  return (
    <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center gap-2">
        <Search className="h-4 w-4 text-gray-500" />
        <h3 className="font-medium">Filtros e Busca</h3>
      </div>

      <div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => dispatch(setSearchTerm(e.target.value))}
          placeholder="Buscar investimentos..."
          className="w-full p-2 border rounded-md"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Tipo de Investimento
        </label>
        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            variant={selectedType === '' ? 'default' : 'outline'}
            onClick={() => dispatch(setSelectedType(''))}
          >
            Todos
          </Button>
          {investmentTypes.map((type) => (
            <Button
              key={type}
              size="sm"
              variant={selectedType === type ? 'default' : 'outline'}
              onClick={() => dispatch(setSelectedType(type))}
            >
              {type}
            </Button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ordenar por
          </label>
          <select
            value={sortBy}
            onChange={(e) => dispatch(setSortBy(e.target.value as any))}
            className="p-2 border rounded-md"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ordem
          </label>
          <Button
            size="sm"
            variant="outline"
            onClick={() => dispatch(setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'))}
            className="flex items-center gap-1"
          >
            {sortOrder === 'asc' ? <SortAsc size={16} /> : <SortDesc size={16} />}
            {sortOrder === 'asc' ? 'Crescente' : 'Decrescente'}
          </Button>
        </div>

        <div className="ml-auto">
          <Button
            size="sm"
            variant="outline"
            onClick={() => dispatch(clearFilters())}
            className="flex items-center gap-1"
          >
            <Filter size={16} />
            Limpar Filtros
          </Button>
        </div>
      </div>

      {(searchTerm || selectedType) && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Filtros ativos:</span>
          {searchTerm && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Busca: "{searchTerm}"
            </Badge>
          )}
          {selectedType && (
            <Badge variant="secondary">
              Tipo: {selectedType}
            </Badge>
          )}
        </div>
      )}
    </div>
  );
} 