
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { parcelTypes } from '@/constants/parcelType';
import type { IErrorResponse } from '@/interfaces/global.interface';


import { cn } from '@/lib/utils';
import { useAddParcelMutation } from '@/redux/features/parcel/parcel.api';

import { zodResolver } from '@hookform/resolvers/zod';
import { format, formatISO } from 'date-fns';
import { CalendarIcon } from 'lucide-react';


import {  useForm } from 'react-hook-form';
import { toast } from 'sonner';

import z from 'zod';

const formSchema = z.object({
  receiver: z.email().min(1, 'receiver email is required'),
  type: z.string().min(1, 'type is required'),
  weight: z.string().min(1, 'weight is required'),
  deliveryDate: z.date({ message: 'Delivery date  is required' }),
  deliveryAddress: z.string().min(1, 'Delivery address is required'),
  notes: z.string().optional(),
});



export default function AddParcel() {

  const [addParcel] = useAddParcelMutation()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      receiver: '',
      type: '',
      weight: '',
      deliveryAddress: '',
      deliveryDate: undefined,
      notes: '',
    },
  });



  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    const toastId = toast.loading('Creating parcel....');

  

    const parcelData = {
      ...data,
      weight: Number(data.weight),
      deliveryDate: formatISO(data.deliveryDate),
     
    };




    try {
    const res = await addParcel(parcelData).unwrap();

    if (res.success) {
      toast.success('parcel created', { id: toastId });
      console.log(res);
      form.reset();
    } else {
      toast.error('Something went wrong', { id: toastId });
    }
    } catch (err: unknown) {
      console.error(err);
      toast.error((err as IErrorResponse).message || 'Something went wrong', {
        id: toastId,
      });
    }
    };

    return (
      <div className="w-full max-w-4xl mx-auto px-5 mt-16">
        <Card>
          <CardHeader>
            <CardTitle>Add Parcel</CardTitle>
            <CardDescription>send a parcel to your destination</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                id="add-tour-form"
                className="space-y-5"
                onSubmit={form.handleSubmit(handleSubmit)}
              >
                <div className="flex gap-5">
                  <div className='flex-1'>
                    <FormField
                      control={form.control}
                      name="receiver"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Receiver email</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex-1">
                    <FormField
                      control={form.control}
                      name="weight"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>weight</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="flex gap-5">
                  <FormField
                    control={form.control}
                    name="deliveryAddress"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Delivery Address</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem className="flex-1 ">
                        <FormLabel>Type</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          // disabled={divisionLoading}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {parcelTypes?.map(
                              (item: { label: string; value: string }) => (
                                <SelectItem key={item.value} value={item.value}>
                                  {item.label}
                                </SelectItem>
                              )
                            )}
                          </SelectContent>
                        </Select>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="deliveryDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col flex-1">
                      <FormLabel>Delivery Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={'outline'}
                              className={cn(
                                'w-full pl-3 text-left font-normal',
                                !field.value && 'text-muted-foreground'
                              )}
                            >
                              {field.value ? (
                                format(field.value, 'PPP')
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={new Date(field.value)}
                            onSelect={field.onChange}
                            disabled={date =>
                              date <
                              new Date(
                                new Date().setDate(new Date().getDate() - 1)
                              )
                            }
                            captionLayout="dropdown"
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Notes</FormLabel>
                      <FormControl>
                        <Textarea {...field} className="h-[120px]" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button type="submit" form="add-tour-form">
              create a parcel
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }
