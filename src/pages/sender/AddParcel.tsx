import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { parcelTypes } from "@/constants/parcelType";
import type { IErrorResponse } from "@/interfaces/global.interface";
import { cn } from "@/lib/utils";
import { useAddParcelMutation } from "@/redux/features/parcel/parcel.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { format, formatISO } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const bangladeshDivisions = [
  { label: "Dhaka", value: "Dhaka" },
  { label: "Chattogram", value: "Chattogram" },
  { label: "Rajshahi", value: "Rajshahi" },
  { label: "Khulna", value: "Khulna" },
  { label: "Barishal", value: "Barishal" },
  { label: "Sylhet", value: "Sylhet" },
  { label: "Rangpur", value: "Rangpur" },
  { label: "Mymensingh", value: "Mymensingh" },
];

const formSchema = z.object({
  receiver: z
    .string()
    .email("Please enter a valid email")
    .min(1, "Receiver email is required"),
  type: z.string().min(1, "Type is required"),
  weight: z.string().min(1, "Weight is required"),
  deliveryDate: z.date({ message: "Delivery date is required" }),
  deliveryAddress: z.string().min(1, "Delivery address is required"),
 deliveryLocation: z.string().min(1, "Delivery Location is required"),
  notes: z.string().optional(),

  
});

interface CreateParcelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CreateParcel({
  open,
  onOpenChange,
}: CreateParcelProps) {
  const [addParcel] = useAddParcelMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      receiver: "",
      type: "",
      weight: "",
      deliveryLocation: "",
      deliveryAddress: "",
      deliveryDate: undefined,
      notes: "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    const toastId = toast.loading("Creating parcel....");

    const parcelData = {
      ...data,
      weight: Number(data.weight),
      deliveryDate: formatISO(data.deliveryDate),
    };

    try {
      const res = await addParcel(parcelData).unwrap();

      if (res.success) {
        toast.success("Parcel created successfully", { id: toastId });
        form.reset();
        onOpenChange(false);
      } else {
        toast.error("Something went wrong", { id: toastId });
      }
    } catch (err: unknown) {
      console.error(err);
      toast.error((err as IErrorResponse).message || "Something went wrong", {
        id: toastId,
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Parcel</DialogTitle>
          <DialogDescription>
            Send a parcel to your destination
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            id="create-parcel-form"
            className="space-y-5 mt-4"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <div className="flex gap-5">
              <div className="flex-1">
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
                name="deliveryLocation"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Delivery Location (Division)</FormLabel>

                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select division" />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        {bangladeshDivisions.map((division) => (
                          <SelectItem
                            key={division.value}
                            value={division.value}
                          >
                            {division.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />

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
            </div>
          <div className="flex gap-5">
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
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
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
                        disabled={(date) =>
                          date <
                          new Date(new Date().setDate(new Date().getDate() - 1))
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

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button form="create-parcel-form" type="submit">
              Create Parcel
            </Button>
          </div>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
