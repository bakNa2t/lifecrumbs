import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useToast } from "@/hooks/use-toast";
import { useUserContext } from "@/context/AuthContext";

import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Loader from "@/components/shared/Loader";

import { SignupValidationSchema } from "@/lib/validation";
import {
  useCreateAccountMutation,
  useSignInAccountMutation,
} from "@/lib/react-query/queriesAndMutations";
import useMobileScreen from "@/hooks/useMobileScreen";

const SignupForm = () => {
  const { toast } = useToast();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();
  const navigate = useNavigate();
  const { wdth, hgt } = useMobileScreen();

  const { mutateAsync: createUserAccount, isPending: isCreatingAccount } =
    useCreateAccountMutation();
  const { mutateAsync: signInAccount, isPending: isSigningInUser } =
    useSignInAccountMutation();

  const form = useForm<z.infer<typeof SignupValidationSchema>>({
    resolver: zodResolver(SignupValidationSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof SignupValidationSchema>) {
    const newUser = await createUserAccount(values);

    if (!newUser) {
      return toast({
        title: "Sign up failed, please try again",
      });
    }

    const session = await signInAccount({
      email: values.email,
      password: values.password,
    });

    if (!session) {
      return toast({
        title: "Sign in failed, please try again",
      });
    }

    const isLoggedIn = await checkAuthUser();

    if (isLoggedIn) {
      form.reset();

      navigate("/");
    } else {
      return toast({
        title: "Sign up failed, please try again",
      });
    }
  }

  return (
    <Form {...form}>
      <div className="w-80 sm:w-420 flex-center flex-col">
        <div className="flex items-center justify-center gap-3">
          <img
            src="/assets/images/logo-lifecrumbs.png"
            alt="Logo"
            className="w-12 h-12 sm:w-14 sm:h-14 shadow-shd-logo rounded-full"
          />
          <span className="text-3xl font-semibold">Lifecrumbs</span>
        </div>

        <h2 className="h3-bold md:h2-bold pt-3 sm:pt-5">
          Create a new account
        </h2>
        <p className="small-medium text-light-3 md:base-regular text-center">
          Get started to join, please enter your details
        </p>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-3 w-full mt-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage className="shad-form_message italic" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage className="shad-form_message italic" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" className="shad-input" {...field} />
                </FormControl>
                <FormMessage className="shad-form_message italic" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>
                <FormMessage className="shad-form_message italic" />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="shad-button_primary hover:shadow-shd-btn mt-4"
          >
            {isCreatingAccount || isSigningInUser || isUserLoading ? (
              <div className="flex-center gap-2">
                <Loader wdth={wdth} hgt={hgt} />
                Loading...
              </div>
            ) : (
              "Sign up"
            )}
          </Button>

          <p className="small-regular text-dusk-2 dark:text-light-2 text-center mt-2">
            Already have an account?
            <Link
              to="/sign-in"
              className="text-primary-500 small-semibold ml-1"
            >
              Log in
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
};

export default SignupForm;
