import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import {  Ban, CheckCircle, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { useAllUserQuery, useBlockUserMutation, useDeleteuserMutation } from '@/redux/features/user/user.api';
import { toast } from 'sonner';

export default function AllUser() {
  const { data } = useAllUserQuery(undefined)
  const [deleteUser] =  useDeleteuserMutation()
  const [blockUser] = useBlockUserMutation();
  


  const handleDeleteUser = async (id: string) => {
    try {
      const res = await deleteUser(id).unwrap();
      if (res.data.success) {
        toast.success(res.message);
      }
    } catch (error: any) {
      toast.error(error.data.message);
    }
  };
  const handleBlockUser = async (id: string, status: string) => {
    
    const payload = {
      id, status
    }
  
    try {
      const res = await blockUser(payload).unwrap();
      if (res.data.success) {
        toast.success(res.message);
      }
    } catch (error: any) {
      toast.error(error.data.message);
    }
  };

   
 
  return (
    <div className="container mx-auto p-8 rounded-lg shadow-lg bg-gray-50 font-sans">
      <div className="bg-white rounded-lg p-6">
        <div className="mb-6">
          <h1 className="font-bold text-3xl text-gray-800">All Users</h1>
        </div>
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Change Status</TableHead>
                <TableHead>Delete</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.data?.map((user: any) => (
                <TableRow key={user._id}>
                  <TableCell className="font-mono text-xs">
                    {user._id.slice(0, 10)}...
                  </TableCell>
                  <TableCell className="font-medium text-gray-900">
                    {user.name}
                  </TableCell>
                  <TableCell className="text-gray-700">{user.email}</TableCell>
                  <TableCell className="text-gray-700">{user.role}</TableCell>
                  <TableCell className="space-y-1">
                    {/* <span
                      className={`flex items-center space-x-2 ${
                        user.isVerified ? 'text-green-500' : 'text-gray-500'
                      }`}
                    >
                      {user.isVerified ? (
                        <CheckCircle size={16} />
                      ) : (
                        <XCircle size={16} />
                      )}
                      <span>{user.isVerified ? 'Verified' : 'Unverified'}</span>
                    </span> */}
                    <span
                      className={`flex items-center space-x-2 ${
                        user.isBlock ? 'text-red-500' : 'text-green-500'
                      }`}
                    >
                      {user.isBlock ? (
                        <Ban size={16} />
                      ) : (
                        <CheckCircle size={16} />
                      )}
                      <span>{user.isBlock ? 'Blocked' : 'Active'}</span>
                    </span>
                  </TableCell>

                  <TableCell className="text-right space-x-2 whitespace-nowrap">
                    <Select
                      onValueChange={value =>
                        handleBlockUser(user._id as string, value)
                      }
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={"true"}>Block</SelectItem>
                        <SelectItem value={"false"}>Unblock</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="text-right space-x-2 whitespace-nowrap">
                    <Button
                      variant={'outline'}
                      onClick={() => handleDeleteUser(user?._id as string)}
                    >
                      {' '}
                      <Trash2 color="red" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
