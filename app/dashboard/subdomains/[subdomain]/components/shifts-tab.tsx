'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Trash2 } from 'lucide-react';

interface Shift {
  name: string;
  time?: string;
  icon?: string;
  color?: string;
  description?: string;
}

interface ShiftsTabProps {
  initialShifts?: Shift[];
}

export default function ShiftsTab({ initialShifts = [] }: ShiftsTabProps) {
  const [shifts, setShifts] = useState<Shift[]>(initialShifts);

  const addShift = () => {
    setShifts([...shifts, { name: '', time: '', icon: '', color: 'orange', description: '' }]);
  };

  const removeShift = (index: number) => {
    setShifts(shifts.filter((_, i) => i !== index));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Library Shifts</CardTitle>
        <CardDescription>Define your library operating shifts</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-end mb-4">
          <Button
            type="button"
            variant="outline"
            onClick={addShift}
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Item
          </Button>
        </div>
        <div className="space-y-4">
          {shifts.map((shift, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium text-sm text-gray-700">Shift {index + 1}</h4>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeShift(index)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Shift Name</Label>
                  <Input
                    name={`shifts[${index}][name]`}
                    defaultValue={shift.name}
                    placeholder="Morning Shift"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Time</Label>
                  <Input
                    name={`shifts[${index}][time]`}
                    defaultValue={shift.time}
                    placeholder="8:00 AM - 12:00 PM"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Icon (emoji or name like 'sun', 'moon')</Label>
                  <Input
                    name={`shifts[${index}][icon]`}
                    defaultValue={shift.icon}
                    placeholder="🌅 or sun"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Color</Label>
                  <Input
                    name={`shifts[${index}][color]`}
                    defaultValue={shift.color}
                    placeholder="orange, yellow, purple, indigo"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label>Description</Label>
                  <textarea
                    name={`shifts[${index}][description]`}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    defaultValue={shift.description}
                  />
                </div>
              </div>
            </div>
          ))}
          {shifts.length === 0 && (
            <div className="text-center py-8 border-2 border-dashed rounded-lg text-gray-500">
              No shifts added yet. Click "Add Item" to get started.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
