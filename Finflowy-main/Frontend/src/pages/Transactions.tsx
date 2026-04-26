import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card'
import { useFinanceStore } from '@/store/useFinanceStore'
import { Trash2, Plus, TrendingUp, TrendingDown } from 'lucide-react'

export default function Transactions() {
  const { transactions, addTransaction, removeTransaction } = useFinanceStore()
  
  const [formData, setFormData] = useState({
    amount: '',
    type: 'expense' as 'income' | 'expense',
    category: '',
    date: new Date().toISOString().split('T')[0],
    description: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.amount || !formData.category || !formData.description) return
    
    addTransaction({
      amount: parseFloat(formData.amount),
      type: formData.type,
      category: formData.category,
      date: formData.date,
      description: formData.description
    })
    
    setFormData({
      amount: '',
      type: 'expense',
      category: '',
      date: new Date().toISOString().split('T')[0],
      description: ''
    })
  }

  return (
    <div className="space-y-8 pb-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
        <p className="text-muted-foreground">Manage your past and present money flow.</p>
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
        {/* Form to add transaction */}
        <Card className="lg:col-span-1 border border-white/10 shadow-lg">
          <CardHeader>
            <CardTitle>Add Transaction</CardTitle>
            <CardDescription>Record a new income or expense</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Type</label>
                <div className="flex rounded-md shadow-sm border border-white/10 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, type: 'income' })}
                    className={`flex-1 py-2 text-sm font-medium transition-colors ${formData.type === 'income' ? 'bg-success/20 text-success' : 'hover:bg-white/5'}`}
                  >
                    Income
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, type: 'expense' })}
                    className={`flex-1 py-2 text-sm font-medium transition-colors border-l border-white/10 ${formData.type === 'expense' ? 'bg-destructive/20 text-destructive' : 'hover:bg-white/5'}`}
                  >
                    Expense
                  </button>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Amount</label>
                <input 
                  type="number" 
                  step="0.01"
                  required
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  className="w-full p-2 rounded-md bg-background border border-white/10 focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="0.00"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <input 
                  type="text" 
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full p-2 rounded-md bg-background border border-white/10 focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="e.g. Groceries"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <input 
                  type="text" 
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full p-2 rounded-md bg-background border border-white/10 focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="e.g. Food"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Date</label>
                <input 
                  type="date" 
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full p-2 rounded-md bg-background border border-white/10 focus:outline-none focus:ring-2 focus:ring-primary"
                  style={{ colorScheme: 'dark' }}
                />
              </div>

              <button 
                type="submit" 
                className="w-full py-2 px-4 bg-primary text-white rounded-md hover:bg-primary/90 flex items-center justify-center space-x-2 font-medium"
              >
                <Plus size={18} />
                <span>Save Transaction</span>
              </button>
            </form>
          </CardContent>
        </Card>

        {/* List of transactions */}
        <Card className="lg:col-span-2 border border-white/10 shadow-lg flex flex-col">
          <CardHeader>
            <CardTitle>History</CardTitle>
            <CardDescription>All your recorded transactions</CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <div className="space-y-3">
              {transactions.length > 0 ? transactions.map((tx) => (
                <div key={tx.id} className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-colors group">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-full ${tx.type === 'income' ? 'bg-success/20 text-success' : 'bg-destructive/20 text-destructive'}`}>
                      {tx.type === 'income' ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
                    </div>
                    <div>
                      <p className="font-semibold">{tx.description}</p>
                      <p className="text-xs text-muted-foreground">{tx.category} • {tx.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className={`font-bold ${tx.type === 'income' ? 'text-success' : 'text-foreground'}`}>
                      {tx.type === 'income' ? '+' : '-'}₹{tx.amount.toLocaleString(undefined, {minimumFractionDigits: 2})}
                    </div>
                    <button 
                      onClick={() => removeTransaction(tx.id)}
                      className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-md opacity-0 group-hover:opacity-100 transition-all"
                      title="Delete Transaction"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              )) : (
                <div className="text-center py-12 text-muted-foreground flex flex-col items-center">
                  <TrendingDown className="mb-4 opacity-50" size={48} />
                  <p>No transactions found.</p>
                  <p className="text-sm">Add one using the form!</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
