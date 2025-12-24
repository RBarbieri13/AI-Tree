import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useApp } from '@/lib/store';
import { Tool } from '@/lib/data';

const toolSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  url: z.string().url('Must be a valid URL'),
  type: z.string().min(1, 'Type is required'),
  summary: z.string().optional(),
  tags: z.string().optional(), // We'll parse comma separated tags
  categoryId: z.string().min(1, 'Category is required'),
});

interface ToolModalProps {
  isOpen: boolean;
  onClose: () => void;
  toolToEdit?: Tool;
}

export function ToolModal({ isOpen, onClose, toolToEdit }: ToolModalProps) {
  const { state, dispatch } = useApp();
  
  const defaultValues = {
    name: toolToEdit?.name || '',
    url: toolToEdit?.url || '',
    type: toolToEdit?.type || '',
    summary: toolToEdit?.summary || '',
    tags: toolToEdit?.tags.join(', ') || '',
    categoryId: toolToEdit?.categoryId || state.categories[0]?.id || '',
  };

  const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm({
    resolver: zodResolver(toolSchema),
    defaultValues,
  });

  // Reset form when opening/closing or changing edit mode
  React.useEffect(() => {
    if (isOpen) {
      reset({
        name: toolToEdit?.name || '',
        url: toolToEdit?.url || '',
        type: toolToEdit?.type || '',
        summary: toolToEdit?.summary || '',
        tags: toolToEdit?.tags.join(', ') || '',
        categoryId: toolToEdit?.categoryId || state.categories[0]?.id || '',
      });
    }
  }, [isOpen, toolToEdit, state.categories, reset]);

  const onSubmit = (data: any) => {
    const tagsArray = data.tags.split(',').map((t: string) => t.trim()).filter((t: string) => t.length > 0);
    
    if (toolToEdit) {
      dispatch({
        type: 'UPDATE_TOOL',
        payload: {
          id: toolToEdit.id,
          name: data.name,
          url: data.url,
          type: data.type,
          summary: data.summary,
          tags: tagsArray,
          categoryId: data.categoryId,
        },
      });
    } else {
      dispatch({
        type: 'ADD_TOOL',
        payload: {
          name: data.name,
          url: data.url,
          type: data.type,
          summary: data.summary,
          tags: tagsArray,
          categoryId: data.categoryId,
        },
      });
    }
    onClose();
  };

  const selectedCategory = watch('categoryId');

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{toolToEdit ? 'Edit Tool' : 'Add New Tool'}</DialogTitle>
          <DialogDescription>
            {toolToEdit ? 'Make changes to your tool here.' : 'Add a new AI tool to your collection.'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" {...register('name')} placeholder="e.g. ChatGPT" data-testid="input-tool-name" />
            {errors.name && <p className="text-red-500 text-xs">{errors.name.message as string}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="url">URL</Label>
            <Input id="url" {...register('url')} placeholder="https://..." data-testid="input-tool-url" />
            {errors.url && <p className="text-red-500 text-xs">{errors.url.message as string}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Input id="type" {...register('type')} placeholder="e.g. Chatbot" data-testid="input-tool-type" />
              {errors.type && <p className="text-red-500 text-xs">{errors.type.message as string}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select 
                value={selectedCategory} 
                onValueChange={(val) => setValue('categoryId', val)}
              >
                <SelectTrigger id="category" data-testid="select-category">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {state.categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.categoryId && <p className="text-red-500 text-xs">{errors.categoryId.message as string}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">Tags (comma separated)</Label>
            <Input id="tags" {...register('tags')} placeholder="LLM, Productivity, Coding" data-testid="input-tool-tags" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="summary">Summary</Label>
            <Textarea id="summary" {...register('summary')} placeholder="Brief description..." className="resize-none h-20" data-testid="input-tool-summary" />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} data-testid="button-cancel">Cancel</Button>
            <Button type="submit" data-testid="button-save-tool">Save Tool</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
