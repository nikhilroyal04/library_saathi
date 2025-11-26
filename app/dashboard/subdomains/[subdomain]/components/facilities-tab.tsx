'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Trash2 } from 'lucide-react';

interface Facility {
  name: string;
  description?: string;
  icon?: string;
  color?: string;
}

interface FacilitiesTabProps {
  initialFacilities?: Facility[];
}

export default function FacilitiesTab({ initialFacilities = [] }: FacilitiesTabProps) {
  const [facilities, setFacilities] = useState<Facility[]>(initialFacilities);

  const addFacility = () => {
    setFacilities([...facilities, { name: '', description: '', icon: '', color: 'blue' }]);
  };

  const removeFacility = (index: number) => {
    setFacilities(facilities.filter((_, i) => i !== index));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Facilities</CardTitle>
        <CardDescription>List the facilities available at your library</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-end mb-4">
          <Button
            type="button"
            variant="outline"
            onClick={addFacility}
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Item
          </Button>
        </div>
        <div className="space-y-4">
          {facilities.map((facility, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium text-sm text-gray-700">Facility {index + 1}</h4>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFacility(index)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Facility Name</Label>
                  <Input
                    name={`facilities[${index}][name]`}
                    defaultValue={facility.name}
                    placeholder="Wi-Fi Access"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Icon</Label>
                  <Input
                    name={`facilities[${index}][icon]`}
                    defaultValue={facility.icon}
                    placeholder="Wifi"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Color</Label>
                  <Input
                    name={`facilities[${index}][color]`}
                    defaultValue={facility.color}
                    placeholder="blue, green, purple, orange"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label>Description</Label>
                  <textarea
                    name={`facilities[${index}][description]`}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    defaultValue={facility.description}
                  />
                </div>
              </div>
            </div>
          ))}
          {facilities.length === 0 && (
            <div className="text-center py-8 border-2 border-dashed rounded-lg text-gray-500">
              No facilities added yet. Click "Add Item" to get started.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
