import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useLoginMutation } from "@/redux/features/auth/auth.api";
import { toast } from "sonner";
import config from "@/config/config";

function LoginForm() {
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [login] = useLoginMutation();

  // 🔹 Demo credentials
  const demoCredentials = {
    sender: {
      email: "01401213782bd@gmail.com",
      password: "@An123456789",
    },
    receiver: {
      email: "bijoyahmed@gmail.com",
      password: "@An123456789",
    },
    admin: {
      email: "mdanowerhossen727@gmail.com",
      password: "@An123456789",
    },
  };

  // 🔹 Auto-fill handler
  const fillCredentials = (
    role: "sender" | "receiver" | "admin"
  ) => {
    form.setValue("email", demoCredentials[role].email);
    form.setValue("password", demoCredentials[role].password);
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await login(data).unwrap();

      if ((res as { success?: boolean }).success) {
        toast.success("Logged in successfully");
        navigate("/");
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Login failed");
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          className="p-6 md:p-8"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-6">
            {/* Header */}
            <div className="flex flex-col items-center text-center">
              <h1 className="text-2xl font-bold">Welcome back</h1>
              <p className="text-muted-foreground">
                Login to your account
              </p>
            </div>

          

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="anower@gmail.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="************"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
              {/* 🔹 Demo Login Buttons */}
            <div className="grid grid-cols-3 gap-3">
              <Button
                type="button"
                variant="secondary"
                onClick={() => fillCredentials("sender")}
              >
                Sender
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => fillCredentials("receiver")}
              >
                Receiver
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => fillCredentials("admin")}
              >
                Admin
              </Button>
            </div>


            {/* Login */}
            <Button variant={'outline'} type="submit" className="w-full">
              Login
            </Button>
            

            {/* Divider */}
            <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:border-t">
              <span className="relative z-10 bg-card px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-3 gap-4">
              <Button
                variant="outline"
                type="button"
                className="cursor-not-allowed"
              >
                Apple
              </Button>

              <Button
                onClick={() =>
                  window.open(`${config.baseUrl}/auth/google`)
                }
                variant="outline"
                type="button"
              >
                Google
              </Button>

              <Button
                variant="outline"
                type="button"
                className="cursor-not-allowed"
              >
                Meta
              </Button>
            </div>

            {/* Register */}
            <div className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link
                to="/signup"
                className="underline underline-offset-4"
              >
                Register
              </Link>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
}

export default LoginForm;
