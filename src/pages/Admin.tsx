import { useState, useEffect, useMemo } from "react";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Search, Trash2, Edit, Plus, Save, X, LogOut } from "lucide-react";
import { formatCurrency } from "@/utils/format-currency";
import { toast } from "sonner";
import { VIPNumber } from "@/hooks/use-cart";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const [numbers, setNumbers] = useState<VIPNumber[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState<{ price: string; discounted_price: string }>({
    price: "",
    discounted_price: ""
  });
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newNumber, setNewNumber] = useState({
    mobile_number: "",
    price: "",
    discounted_price: ""
  });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  // Check authentication status
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/");
        return;
      }
      setUser(session.user);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate("/");
      } else {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast.success("Logged out successfully");
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Error logging out");
    }
  };

  // Fetch numbers from Supabase
  const fetchNumbers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('vip_number_flags')
        .select('*')
        .order('id', { ascending: true });
      
      if (error) throw error;
      setNumbers(data || []);
    } catch (error) {
      console.error('Error fetching numbers:', error);
      toast.error("Failed to fetch numbers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchNumbers();
    }
  }, [user]);

  const filteredNumbers = useMemo(() => {
    if (!searchValue) return numbers;
    
    return numbers.filter(number =>
      number.mobile_number.replace(/\s/g, "").includes(searchValue.replace(/\s/g, ""))
    );
  }, [numbers, searchValue]);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(filteredNumbers.map(number => number.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectNumber = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedIds([...selectedIds, id]);
    } else {
      setSelectedIds(selectedIds.filter(selectedId => selectedId !== id));
    }
  };

  const handleDeleteSelected = () => {
    if (selectedIds.length === 0) {
      toast.error("Please select numbers to delete");
      return;
    }
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      const { error } = await supabase
        .from('vip_numbers')
        .delete()
        .in('id', selectedIds);
      
      if (error) throw error;
      
      setSelectedIds([]);
      setShowDeleteConfirm(false);
      toast.success(`Deleted ${selectedIds.length} number(s)`);
      fetchNumbers();
    } catch (error) {
      console.error('Error deleting numbers:', error);
      toast.error("Failed to delete numbers");
    }
  };

  const handleEditStart = (number: VIPNumber) => {
    setEditingId(number.id);
    setEditData({
      price: number.price.toString(),
      discounted_price: number.discounted_price.toString()
    });
  };

  const handleEditSave = async () => {
    const price = parseFloat(editData.price);
    const discountedPrice = parseFloat(editData.discounted_price);

    if (isNaN(price) || isNaN(discountedPrice) || price <= 0 || discountedPrice <= 0) {
      toast.error("Please enter valid prices");
      return;
    }

    if (discountedPrice > price) {
      toast.error("Discounted price cannot be higher than original price");
      return;
    }

    try {
      const { error } = await supabase
        .from('vip_numbers')
        .update({ 
          price: price, 
          discounted_price: discountedPrice 
        })
        .eq('id', editingId!);
      
      if (error) throw error;
      
      setEditingId(null);
      toast.success("Prices updated successfully");
      fetchNumbers();
    } catch (error) {
      console.error('Error updating number:', error);
      toast.error("Failed to update prices");
    }
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditData({ price: "", discounted_price: "" });
  };

  const handleAddNumber = async () => {
    const { mobile_number, price, discounted_price } = newNumber;

    if (!mobile_number || mobile_number.length !== 10 || !/^\d{10}$/.test(mobile_number)) {
      toast.error("Please enter a valid 10-digit mobile number");
      return;
    }

    const priceNum = parseFloat(price);
    const discountedPriceNum = parseFloat(discounted_price);

    if (isNaN(priceNum) || isNaN(discountedPriceNum) || priceNum <= 0 || discountedPriceNum <= 0) {
      toast.error("Please enter valid prices");
      return;
    }

    if (discountedPriceNum > priceNum) {
      toast.error("Discounted price cannot be higher than original price");
      return;
    }

    try {
      const { error } = await supabase
        .from('vip_numbers')
        .insert([{
          mobile_number,
          price: priceNum,
          discounted_price: discountedPriceNum
        }]);
      
      if (error) throw error;
      
      setNewNumber({ mobile_number: "", price: "", discounted_price: "" });
      setIsAddDialogOpen(false);
      toast.success("New number added successfully");
      fetchNumbers();
    } catch (error) {
      console.error('Error adding number:', error);
      if (error.code === '23505') {
        toast.error("This mobile number already exists");
      } else {
        toast.error("Failed to add number");
      }
    }
  };

  if (loading) {
    return (
      <Layout>
        <main className="container py-6">
          <div className="flex items-center justify-center h-64">
            <div className="text-lg">Loading admin panel...</div>
          </div>
        </main>
      </Layout>
    );
  }

  if (!user) {
    return null; // Will redirect to home
  }

  return (
    <Layout>
      <main className="container py-6">
        <div className="space-y-6">
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                <p className="text-muted-foreground">Manage VIP phone numbers</p>
              </div>
              <Button
                variant="outline"
                onClick={handleLogout}
                className="flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search by phone number..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-2">
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Number
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Phone Number</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="mobile_number">Mobile Number (10 digits)</Label>
                      <Input
                        id="mobile_number"
                        placeholder="9999988888"
                        value={newNumber.mobile_number}
                        onChange={(e) => setNewNumber({...newNumber, mobile_number: e.target.value})}
                        maxLength={10}
                      />
                    </div>
                    <div>
                      <Label htmlFor="price">Original Price</Label>
                      <Input
                        id="price"
                        type="number"
                        placeholder="5000"
                        value={newNumber.price}
                        onChange={(e) => setNewNumber({...newNumber, price: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="discounted_price">Discounted Price</Label>
                      <Input
                        id="discounted_price"
                        type="number"
                        placeholder="4500"
                        value={newNumber.discounted_price}
                        onChange={(e) => setNewNumber({...newNumber, discounted_price: e.target.value})}
                      />
                    </div>
                    <Button onClick={handleAddNumber} className="w-full">
                      Add Number
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
                <DialogTrigger asChild>
                  <Button
                    variant="destructive"
                    onClick={handleDeleteSelected}
                    disabled={selectedIds.length === 0}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Selected ({selectedIds.length})
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Confirm Deletion</DialogTitle>
                  </DialogHeader>
                  <p>Are you sure you want to delete {selectedIds.length} selected number(s)? This action cannot be undone.</p>
                  <div className="flex gap-2 justify-end">
                    <Button variant="outline" onClick={() => setShowDeleteConfirm(false)}>
                      Cancel
                    </Button>
                    <Button variant="destructive" onClick={confirmDelete}>
                      Delete
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedIds.length === filteredNumbers.length && filteredNumbers.length > 0}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead>ID</TableHead>
                  <TableHead>Phone Number</TableHead>
                  <TableHead>Original Price</TableHead>
                  <TableHead>Discounted Price</TableHead>
                  <TableHead>Discount %</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredNumbers.map((number) => {
                  const isSelected = selectedIds.includes(number.id);
                  const isEditing = editingId === number.id;
                  const discountPercent = Math.round((1 - number.discounted_price / number.price) * 100);
                  
                  return (
                    <TableRow key={number.id} className={isSelected ? "bg-muted/50" : ""}>
                      <TableCell>
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={(checked) => handleSelectNumber(number.id, checked as boolean)}
                        />
                      </TableCell>
                      <TableCell className="font-mono text-sm">{number.id}</TableCell>
                      <TableCell className="font-semibold">+91 {number.mobile_number}</TableCell>
                      <TableCell>
                        {isEditing ? (
                          <Input
                            type="number"
                            value={editData.price}
                            onChange={(e) => setEditData({...editData, price: e.target.value})}
                            className="w-24"
                          />
                        ) : (
                          `₹${formatCurrency(number.price)}`
                        )}
                      </TableCell>
                      <TableCell>
                        {isEditing ? (
                          <Input
                            type="number"
                            value={editData.discounted_price}
                            onChange={(e) => setEditData({...editData, discounted_price: e.target.value})}
                            className="w-24"
                          />
                        ) : (
                          `₹${formatCurrency(number.discounted_price)}`
                        )}
                      </TableCell>
                      <TableCell>
                        {number.discounted_price < number.price ? (
                          <span className="text-green-600 font-semibold">{discountPercent}%</span>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {isEditing ? (
                          <div className="flex gap-1">
                            <Button size="sm" onClick={handleEditSave}>
                              <Save className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="outline" onClick={handleEditCancel}>
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        ) : (
                          <Button size="sm" variant="outline" onClick={() => handleEditStart(number)}>
                            <Edit className="h-3 w-3" />
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          {filteredNumbers.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">
                {searchValue ? "No numbers found matching your search." : "No numbers available."}
              </p>
            </div>
          )}
        </div>
      </main>
    </Layout>
  );
};

export default Admin;
